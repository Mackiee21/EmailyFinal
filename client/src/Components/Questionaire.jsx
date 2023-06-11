import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../scss/questionaire.scss'

function Questionaire() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [feedbacks, setFeedbacks] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    useEffect(() => {
        setLoadingQuestions(true);
        const getData = async () => {
            const res = await axios.get('/getSurveys');
            const data = res.data[0];
            setLoadingQuestions(false);
            //console.log("questions?:  ", data)
            setData(data);
        }
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //console.log(feedbacks);
        const res = await axios.post("/feedback", {feedbacks, survey_id: data._id });
        if(res.status == 200){
            setLoading(false);
            setFeedbacks({});
            setTimeout(() => {
                alert("Your response has been submitted\nBack to homepage")
                navigate('/')
            }, 50)
        }
    }
    
    const handleChange = (e) =>  {
        const {name, value} = e.target;
        setFeedbacks(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    let content;
    if(loadingQuestions){
        content = <div className='h-full w-full d-flex align-items-center justify-content-center'>Please wait...</div>
    }else{
        content = data.survey?.questions?.map((question, index) => {
            //check or add so client can choose whether it is a yes/no question or a textarea
            return(
                <div key={index}>
                    <h2><span>{index+1}.</span> {question}</h2>
                    <div>
                        <textarea required name={`Response#${index+1}`} value={feedbacks[`Response#${index+1}`]}  onChange={handleChange} placeholder='Write your answer here...'></textarea>
                    </div>
                </div>
            );
        });
    }
    
    let button;
    if(loading){
        button = <button className="btn btn-primary d-flex align-items-center" type="button" disabled>
                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Processing...
                </button>
    }else{
        button = <button className='btn btn-primary button'>Submit Response</button>
    }

    return(
        <div className="questionaire-wrapper">
            <h1>Questionaire</h1>
            <div className='header'>
                <p>{data.survey?.header}</p>
                <p>{data.survey?.about}</p>
            </div>
                
            <form onSubmit={handleSubmit}>
                {content}
                <div className='d-flex justify-content-flex-end'>
                    {button}
                </div>
            </form>
        </div>
    );

}

export default Questionaire;
import { useEffect, useCallback, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import  '../css/survey.css';

function ConfirmSurveyPage() {
    const navigate = useNavigate();
    const btnRef = useRef();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    
    const getData = useCallback(async () => {
        const res = await axios.get('/survey-data');
        if(res.data){
            console.log(res.data);
            setData(res.data);
        }else{
            setData(null);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const {header, about, questions} = data;

    const renderedQuestions = questions?.map((question, index) => {
        return <div className="question" key={index}>
            <h4>Question {index+1}</h4>
            <p>{question}</p>
        </div>
    });

    const handleClickNext = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await axios.post('/save', data);
        if(res.status == 200){
            navigate('/');
            setLoading(false);
        }
    }
    let button;
    if(loading){
        button = <button class="btn btn-primary d-flex align-items-center" type="button" disabled>
                    <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Creating...
                </button>
    }else{
        button = <button className='create-submit-btn btn btn-primary' onClick={handleClickNext}>Create and Submit</button>
    }
    return(
        <div className='form-wrapper'>
            <form className="survey-form">
                <h3 className='form-header'>Confirm Survey Form</h3>
                <div className="container">
                    <label htmlFor="surv-header">Survey Header</label>
                    <p>{header}</p>
                </div>
                <div className="container">
                    <label htmlFor="about">About</label>
                    <p>{about}</p>
                </div>
                {renderedQuestions}
                <div className='btn-wrapper btn-wrapper--single'>
                    {button}
                </div>
            </form>
        </div>
    );
}

export default ConfirmSurveyPage;
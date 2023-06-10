import {useState, useEffect} from 'react';
import axios from 'axios';
import '../scss/questionaire.scss'

function Questionaire() {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        console.log("being called?");
        const getData = async () => {
            const res = await axios.get('/getSurveys');
            const data = res.data[0];
            console.log("questions?:  ", data)
            setQuestions(data.survey.questions);
        }
        getData();
    }, []);

    const renderedQuestions = questions?.map((question, index) => {
        //check or add so client can choose whether it is a yes/no question or a textarea
        return(
            <div key={index}>
                <h2><span>{index+1}.</span> {question}</h2>
                <div>
                    <textarea placeholder='Write your answer here...'></textarea>
                </div>
            </div>
        );
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <div className="questionaire-wrapper">
            <h1>Questionaire</h1>
            <div className='header'>
                <p>Marijuana Legalization</p>
                <p>This survey aims to gather and evaluate people's  opinion chuchu</p>
            </div>
                
            <form onSubmit={handleSubmit}>
                {renderedQuestions}
                <button>Submit</button>
            </form>
        </div>
    );

}

export default Questionaire;
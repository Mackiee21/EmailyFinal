import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import '../css/survey.css'
import {useNavigate} from 'react-router-dom';

function ConfirmSurveyPage() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
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
        return <div className='question' key={index}>
            <h4>Question {index+1}</h4>
            <p>{question}</p>
        </div>
    });

    const handleClickNext = async (e) => {
        e.preventDefault();
        await axios.post('/save', data);
        navigate('/');
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
                <div className='btn-wrapper'>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <button onClick={handleClickNext}>Create and Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ConfirmSurveyPage;
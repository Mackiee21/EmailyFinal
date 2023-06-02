import axios from 'axios';
import { useEffect, useCallback, useState, useRef } from 'react';
import '../css/survey.css'
import {useNavigate} from 'react-router-dom';

function ConfirmSurveyPage() {
    const navigate = useNavigate();
    const btnRef = useRef();
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
        btnRef.current.innerText = "Creating...";
        const res = await axios.post('/save', data);
        if(res.statusText === 'OK'){
            navigate('/');
            btnRef.current.innerText = "Create and Submit";
        }
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
                    <button ref={btnRef} className='create-submit-btn' onClick={handleClickNext}>Create and Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ConfirmSurveyPage;
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSurveyDetailsMutation } from '../store';
import '../css/survey.css';
function SurveyPage() {
    const navigate = useNavigate();
    const [questionField, setQuestionField] = useState(1);
    const [headerAbout, setHeaderAbout] = useState({});
    const [questions, setQuestions] = useState([]);
    const [surveyDetails, results] = useSurveyDetailsMutation();

    const handleAddQuestion = (e) => {
        e.preventDefault();
        if(e.target.parentElement.children[0].value.trim()){
            setQuestionField(prev => prev + 1);
            const text = e.target.parentElement.children[0].value;
            setQuestions(prev => {
                return [...prev, text]
            });
        }else{
            alert("You can only add after you fill out the current textarea")
        }
    }

    const handleClickNext = (e) => {
        if(questionField === 1){
            e.preventDefault();
            alert("Please fill out the form and provide at least one question. Thank you")
        }else{
            setTimeout(() => {
                const data = {
                    header: headerAbout.header,
                    about: headerAbout.about,
                    questions
                }
                surveyDetails(data)
                window.location.href = "/survey/confirm";
            }, 200);
        }  
    }


    const handleChange = (e) => {
        const { value, name } = e.target;
        setHeaderAbout(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const renderedQuestionFields = Array.from({length: questionField}).map((_, index) => {
        return(
            <div  key={index} className='question-container'>
                <textarea></textarea>
                <button onClick={handleAddQuestion}>Save</button>
            </div>
        ); 
    })
    return(
        <div className='form-wrapper'>
            <form className="survey-form">
                <h3 className='form-header'>Create Survey Form</h3>
                <div className="container">
                    <label htmlFor="surv-header">Survey Header</label>
                    <input name="header" onChange={handleChange} type="text" id="surv-header" placeholder="" required  />
                </div>
                <div className="container">
                    <label htmlFor="about">About</label>
                    <input name="about" onChange={handleChange} type="text" id="about" placeholder="" required />
                </div>
                {renderedQuestionFields}
                <div className='btn-wrapper'>
                    <button onClick={() => navigate('/')}>Back</button>
                    <button onClick={handleClickNext} >Next</button>
                </div>
            </form>
        </div>
    );
}

export default SurveyPage;
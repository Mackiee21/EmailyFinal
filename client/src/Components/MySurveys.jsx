import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MySurveys.css';

function MySurveys() {
    const [fetching, setFetching] = useState("getting");
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        const res = await axios.get('/getSurveys');
        console.log("result: ", res);
        if(res.status == 200){
            setFetching("okaynabes");
            setData(res.data);
            console.log("data",res.data)
        }else{
            setFetching("error");
            console.log("error: ")

        }
    };
    let content;
    if(fetching === 'getting'){
        content = <div className='d-flex justify-content-center align-items-center m-0' style={{"min-height": "88vh"}}>
                    <div className="d-flex justify-content-center align-items-center mt-0">
                        <div className="spinner-border text-primary mr-2" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <span>Fetching data...</span>
                    </div>
                </div>
                
    }else if("okaynabes"){
        content = data?.map((survey, index) => {
                return( 
                    <div className='survey-wrapper' key={index}>
                        <h1 className='header'>{survey.survey.header}</h1>
                        <p className='about'>{survey.survey.about}</p>
                    </div>
                );
            })
    }else{
        content = <h1>ERROR FETCHING DATA</h1>
    }
    return(
        <div>{content}</div>
    );

}

export default MySurveys;
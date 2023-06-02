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
    let className;
    let content;
    if(fetching === 'getting'){
        content = <div class="d-flex justify-content-center align-items-center">
                        <div class="spinner-border text-success mr-2" role="status">
                            <span class="sr-only">Loading...</span>
                    </div>
                    <span>Fetching data...</span>
                </div>
    }else if("okaynabes"){
        className = 'survey-wrapper';
        content = data?.map((survey, index) => {
                return( 
                    <div key={index}>
                        <h1 className='header'>{survey.survey.header}</h1>
                        <p className='about'>{survey.survey.about}</p>
                    </div>
                );
            })
    }else{
        content = <h1>ERROR FETCHING DATA</h1>
    }
    return(
        <div className={className}>{content}</div>
    );

}

export default MySurveys;
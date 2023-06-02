import { useEffect, useState } from 'react';
import axios from 'axios';

function MySurveys() {
    const [fetching, setFetching] = useState("fetching");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        const res = await axios.get('/getSurveys');
        if(res.statusText === 'OK'){
            setFetching("success");
            setData(res.data);
            console.log(res.data)
        }else{
            setFetching("error");
        }
    };
    let content;
    if(fetching === 'fetching'){
        content = <h3>FETCHING DATA...</h3>
    }else if('success'){
        content = data.map((survey, index) => {
                return( 
                    <div key={index}>
                        <h1>{survey.survey.header}</h1>
                        <p>{survey.survey.about}</p>
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
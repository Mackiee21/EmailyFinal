import { useEffect, useState } from 'react';
import axios from 'axios';

function MySurveys() {
    const [fetching, setFetching] = useState("getting");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        const res = await axios.get('/getSurveys');
        console.log("result: ", res);
        if(res.statusText === 'OK'){
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
        content = <h3>FETCHING DATA...</h3>
    }else if("okaynabes"){
        content = data?.map((survey, index) => {
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
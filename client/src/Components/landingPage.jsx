import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function LandingPage() {
    const [name, setName] = useState(null);
    const [sign, setSign] = useState("LOADING");
    const getData = async () => {
        try{
            const res = await axios.get("/data");
            setName(res.data.name);
        }catch(err){
            console.log('error: ', err)
            setSign('ERROR FETCHING DATA');
        }
       setSign("LANDING PAGE");
    }
    useEffect(() => {
        getData();
    }, []);
    
    return(
        <div>
             <h1 id='meow'>{sign}</h1>
             {name && <h2 className='user' style={{"textAlign": "center", "display": "block"}}>Hi! {name}</h2>}
        </div>
    );
}

export default LandingPage;
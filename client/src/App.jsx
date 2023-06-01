import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Header from './Components/Header';
import SurveyPage from './Components/SurveyPage';
import LandingPage from './Components/landingPage';
import ConfirmSurveyPage from './Components/ConfirmSurvePage';

function App() {
    return(
        <>
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/survey/new' element={<SurveyPage />} />
                <Route path='/survey/confirm' element={<ConfirmSurveyPage />} />
                <Route path="*" element={<h1>Page Not Found!</h1>} />
            </Routes>
        </>
    );
}
export default App;
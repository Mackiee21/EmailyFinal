import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Header from './Components/Header';

function App() {
    return(
        <Routes>
            <Route path="/" element={<Header />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<h2>Page not Found</h2>} />
        </Routes>
    );
}
export default App;
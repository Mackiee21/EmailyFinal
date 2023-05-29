import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import Header from './Components/Header';

function App() {
    return(
       <BrowserRouter>
            <Route path="/" element={<Header />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<h2>Page not Found</h2>} />
        </BrowserRouter>
    );
}
export default App;
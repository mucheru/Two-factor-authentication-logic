import logo from './logo.svg';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PhoneVerify from "./components/PhoneVerify";
import {  Route, Routes } from "react-router-dom";

import './App.css';

function App() {
    return (
        <div>
             <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='phone/verify' element={<PhoneVerify />} />
            </Routes>
        </div>
    );
}
export default App;

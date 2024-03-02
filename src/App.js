import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Weather from './Pages/Weather/Weather';
import Login from './Pages/Login/Login';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import NoPage from './Pages/NoPage/NoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/weather-forecasting-system">
       <Routes>
        <Route index element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/home" element={<Weather/>}/>
        <Route path="*" element={<NoPage/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

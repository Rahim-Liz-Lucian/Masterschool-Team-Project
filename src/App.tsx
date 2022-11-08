import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from "./components/Homepage"
import NotFound from "./components/NotFound"
import Login from "./components/Login"
import RestrictedPage from "./components/RestrictedPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/restrictedpage" element={<RestrictedPage/>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

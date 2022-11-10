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
import SignUp from "./components/SignUp"
import RestrictedPage from "./components/RestrictedPage"
import { UserProvider } from './Context/UserContext';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/restrictedpage" element={<RestrictedPage/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

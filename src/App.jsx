import React from 'react';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UploadProduct from "./components/UploadProduct";
import { UserProvider } from './Context/UserContext';
import { ProductProvider } from './Context/ProductContext';
import Navigation from "./components/Navigation";
import { useEffect } from 'react';

console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
function App() {


    return (
        <ProductProvider>
            <UserProvider>
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/upload" element={<UploadProduct />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </ProductProvider>
    );
}

export default App;

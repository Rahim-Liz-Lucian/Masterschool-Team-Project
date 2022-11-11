import { Link } from "react-router-dom";
import {useState, useContext} from "react"
import { UserContext } from "../Context/UserContext";

const Navigation = () => {
    const {isLoggedIn} = useContext(UserContext)
    return ( 
        <>
            <div>
                <Link to="/">Homepage</Link>
                <br/>
                <Link to="/login">Login</Link>
                <br/>
                {isLoggedIn && <Link to="/upload">Upload Product</Link>}
            </div>
        </>
     );
}
 
export default Navigation;
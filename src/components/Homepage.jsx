import Navigation from "./Navigation"
import {UserContext} from "../Context/UserContext"
import { useState, useContext } from "react"

const Homepage = () => {
    const {userName, userEmail, userCity, isLoggedIn, accessToken, refreshToken, dbRefId} = useContext(UserContext)
    return ( 
        <>
            <Navigation/>
            <h1>Homepage</h1>
            {isLoggedIn && 
                <div>
                    <h1>{userName}</h1>
                    <h1>{userEmail}</h1>
                    <h1>{userCity}</h1>
                    <h1>{accessToken}</h1>
                    <h1>{refreshToken}</h1>
                    <h1>{dbRefId}</h1>
                </div>
            }
        </>
     );
}
 
export default Homepage;
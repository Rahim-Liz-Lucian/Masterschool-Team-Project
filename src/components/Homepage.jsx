import Navigation from "./Navigation"
import {UserContext} from "../Context/UserContext"
import { useState, useContext } from "react"
import { signOut } from "firebase/auth";
import {auth} from "../firebase"

const Homepage = () => {
    const {userName, userEmail, userCity, isLoggedIn, accessToken, refreshToken, dbRefId, setUserName, setUserEmail, setIsLoggedIn, setUserCity, setDbRefId, setAccessToken, setRefreshToken} = useContext(UserContext)
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
                    <button onClick={() => {
                        signOut(auth).then(() => {
                            console.log("signed out")
                            setUserName("")
                            setUserEmail("")
                            setIsLoggedIn("")
                            setUserCity("")
                            setDbRefId(0)
                            setAccessToken("")
                            setRefreshToken("")
                          }).catch((error) => {
                            console.log(error)
                          });
                    }}>Log out</button>
                </div>
                }
        </>
     );
}
 
export default Homepage;
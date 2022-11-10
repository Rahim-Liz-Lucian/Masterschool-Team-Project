import Navigation from "./Navigation"
import {UserContext} from "../Context/UserContext"
import {useContext} from "react"
import { signOut } from "firebase/auth";
import {auth} from "../firebase"

const Homepage = () => {
    const {userName, userEmail, userCity, isLoggedIn, dbRefId, setUserName, setUserEmail, setIsLoggedIn, setUserCity, setDbRefId, setAccessToken, setRefreshToken} = useContext(UserContext)

    return ( 
        <>
            <Navigation/>
            <h1>Homepage</h1>
            {isLoggedIn && 
                <div>
                    <h5>{userName}</h5>
                    <h5>{userEmail}</h5>
                    <h5>{userCity}</h5>
                    <h5>{dbRefId}</h5>
                    <button onClick={() => {
                        signOut(auth).then(() => {
                            console.log("signed out")
                            setUserName("")
                            setUserEmail("")
                            setIsLoggedIn("")
                            setUserCity("")
                            setDbRefId(0)
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
import React, {createContext, useState} from "react"

export const UserContext = React.createContext();

export function UserProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userCity, setUserCity] = useState("")
    const [dbRefId, setDbRefId] = useState(0)
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    
    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, userName, setUserName, userEmail, setUserEmail, userCity, setUserCity, dbRefId, setDbRefId, accessToken, setAccessToken, refreshToken, setRefreshToken}}>
            {children}
        </UserContext.Provider>
    )

}
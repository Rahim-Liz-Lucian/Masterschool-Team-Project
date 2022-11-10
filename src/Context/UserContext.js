import React, {createContext, useState} from "react"

export const UserContext = React.createContext();

export function UserProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("hi")
    const [userEmail, setUserEmail] = useState("")
    const [userCity, setUserCity] = useState("")
    
    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, userName, setUserName, userEmail, setUserEmail, userCity, setUserCity}}>
            {children}
        </UserContext.Provider>
    )

}


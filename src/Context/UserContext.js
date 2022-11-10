import React, {createContext, useState, useEffect} from "react"
import {onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase"
import { doc, getDoc } from "firebase/firestore";
import {db} from "../firebase"

export const UserContext = React.createContext();

export function UserProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userCity, setUserCity] = useState("")
    const [dbRefId, setDbRefId] = useState(0)

    const handleGetUserDataFromDb = async (uuid) => {
        const docRef = doc(db, "users", uuid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data()
            setUserName(data.name)
            setUserEmail(data.email)
            setUserCity(data.city)
            setIsLoggedIn(true)
            setDbRefId(uuid)
        }

    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              handleGetUserDataFromDb(uid)
              // ...
            }
          });
    },[])
    
    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, userName, setUserName, userEmail, setUserEmail, userCity, setUserCity, dbRefId, setDbRefId, handleGetUserDataFromDb}}>
            {children}
        </UserContext.Provider>
    )

}
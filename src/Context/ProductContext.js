import React, {createContext, useState, useEffect} from "react"
import {onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase"
import { doc, getDoc } from "firebase/firestore";
import {db} from "../firebase"
import { collection, getDocs } from "firebase/firestore"; 

export const ProductContext = React.createContext();

export function ProductProvider({children}) {
    const [products, setProducts] = useState([])

    const handleGetProductsFromDb = async() => {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            setProducts([...products, data])
});
    }

    useEffect(() => {
        handleGetProductsFromDb()
    },[])
    
    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )

}
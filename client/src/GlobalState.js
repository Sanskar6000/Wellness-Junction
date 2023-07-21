import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState('')


    useEffect(() => {
        const checkLogin = async () => {
          const accessToken = localStorage.getItem('tokenStore');
          console.log(accessToken);
          if (accessToken) {
            // Axios makes a GET request to “get” data from a server API
            // In second Parameter, we are setting the Authorization Header (HTTP Request Header)
            // As Authorization header is set up, after making a get request to verify route...
            // ...It will check if there is token available in Authorization header and send response as...
            // ...True or false which will be in ***response.data***
            console.log(`HELLO`);
            const verified = await axios.get('http://localhost:5000/user/verify', {
              headers: { Authorization: accessToken },
            });
            console.log(verified.data);
            setToken(accessToken);
            if (verified === false) return localStorage.clear();
          } else {
            setToken('');
          }
        };
        checkLogin();
      }, []);


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
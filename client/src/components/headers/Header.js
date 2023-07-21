import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'

import './Header.css'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    const logoutUser = async () =>{
        localStorage.clear();
        
        setIsLogged(false)

        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }



    return (
        <header>
        
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin Panel' : 'Wellness Junction'}</Link>
                </h1>
            </div>

            <ul className={isAdmin ? 'admin-ul' : 'user-ul'}>
                <li><Link to="/">{isAdmin ? 'Products' : 'Home'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login</Link></li>
                }

            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
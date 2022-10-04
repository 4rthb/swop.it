import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'
import { signout } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
    const [clicked, setClicked] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const menuHandler = () => {
        setClicked(clicked => !clicked)
    }

    const logoutHandler = () => {
        dispatch(signout());
    }
    
    return(
        <nav className="NavbarItems">
            <div className="menu-icon" onClick={menuHandler}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                <li key='1'>
                    <Link to='/' className='nav-links'>
                    Produtos
                    </Link>
                </li>
                {userInfo ? (
                    <>
                        <li key='2'>
                            <Link to='/product/register' className='nav-links'>
                            Registrar Produto
                            </Link>
                        </li>
                        <li key='3'>
                            <Link to='/profile' className='nav-links'>
                            Perfil
                            </Link>
                        </li>
                        <li key='4'>
                            <Link to='/offers' className='nav-links'>
                            Minhas trocas
                            </Link>
                        </li>
                        <li key='5'>
                            <Link to='/edit' className='nav-links'>
                            Editar Perfil
                            </Link>
                        </li>
                        <li key='6'>
                            <Link to='/' className='nav-links-mobile' onClick={logoutHandler}>
                            Logout
                            </Link>
                        </li>
                    </>
                 ) : (
                    <li key='2'>
                        <Link to='/login' className='nav-links-mobile'>
                        Login
                        </Link>
                    </li>
                )}
            </ul>
            <Link className='navbar-logo-link' to='/'>
                <h1 className="navbar-logo">Swop <i className='it'>.it</i></h1>
            </Link>
            <form className='searchbar-form' action="/" method="get">
                <input type='text' id='header-search' className='searchbar' placeholder="Pesquise..." name='Search'/>
                <input className='search-hidden' type='submit' value='Search' />
            </form>
        </nav>
    )

}
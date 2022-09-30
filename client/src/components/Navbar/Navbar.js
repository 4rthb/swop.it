import React, { Component } from 'react'
import { MenuItems } from "./MenuItems"
import { Link } from 'react-router-dom'

import './Navbar.css'

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <div className="menu-icon" onClick={ this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>
                                {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <Link className='navbar-logo-link' to='/'>
                    <h1 className="navbar-logo">Swop <i className='it'>.it</i></h1>
                </Link>
                <input type='text' className='searchbar' placeholder="Pesquise..."/>
            </nav>
        )
    }

}

export default Navbar
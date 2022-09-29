import React, { Component } from 'react'
import banner from './banner.jpg'

import './Landing.css'

class Landing extends Component {
    render() {
        return(
            <div className="banner">
                <div className="text-container">

                </div>
                <div className="banner-image-container">
                    <img src={banner} alt="hero banner" className="banner-image" />
                    <div className="fade"></div>
                    <div className="fade"></div>
                    <div className="fade"></div>
                    <div className="fade"></div>
                </div>

            </div>
        )
    }

}

export default Landing
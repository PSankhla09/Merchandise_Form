import React from 'react'
import './Header.css'
import TopImage from './Background Box.png'
import onTop from './DVM-Logo.svg'
const Header = () => {
  return (
    <div className="logo">
        <div className="img">
            <img src={TopImage} alt="TopImage" />
        </div>
        <div className="ontop">
            <img src={onTop} alt="onTop" />
        </div>
        
    </div>
  )
}

export default Header;
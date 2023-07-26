import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
  return (
    <>
     <div className="error-page">
        
        <h1>404</h1>
        <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
        <p>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGE OR ITS TEMPORARILY UNAVAILABLE</p>
        <NavLink to='/' className="error-btn">BACK TO HOMEPAGE</NavLink>
        
     </div> 
    </>
  )
}

export default Errorpage

import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () =>{
    return <nav style={{backgroundColor:'red'}} class="navbar navbar-light">
    <Link to='/'><span class="navbar-brand mb-0 h1">Youtube</span></Link>
    <Link to='/'><span class="navbar-brand mb-0 h1">Home</span></Link>
  </nav>
}

export default Navbar
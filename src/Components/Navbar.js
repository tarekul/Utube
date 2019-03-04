import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () =>{
    return <><div className='container'>
    <div className='row'>
    <div className='col-12'>
    <nav style={{backgroundColor:'red'}} class="navbar navbar-light">
    <Link to='/'><span class="navbar-brand mb-0 h1">Youtube</span></Link>
    <Link to='/'><span class="navbar-brand mb-0 h1">Home</span></Link>
  </nav>
  </div>
  </div>
  </div>
  </>
}

export default Navbar
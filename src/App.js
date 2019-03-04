import React, { Component } from 'react';
import {Route, HashRouter} from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar'
import Home from './Containers/Home'
import Video from './Containers/Video'

class App extends Component {
  render() {
    return (
        <>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/video/:id' component={Video} />
        </>
      
    );
  }
}

export default App;

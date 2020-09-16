import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
// import axios from 'axios'
import Join from './Join'
import Login from './Login'
import Footer from './Footer'
import Home from './Home'
import Myprofile from './Myprofile'



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  
export default function App() {


    return (
        <Router>
        
            <Switch>
                <Route exact path="/" >

                    <Login />

                </Route>


                <Route exact path="/join">

                    <Join/>

                </Route>


                <Route exact path="/home">
                   <Navbar/>
                   <Home/>
                </Route>
                <Route exact path="/profile">
                    // <Navbar />
                    <Myprofile />
                </Route>
            </Switch>

            {/*<Footer/>*/}

        </Router>                    
    )
}

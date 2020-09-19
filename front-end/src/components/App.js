import React from 'react'
import Navbar from './Navbar'
// import axios from 'axios'
import Join from './Join'
import Login from './Login'
// import Footer from './Footer'
import Home from './Home'
import Myprofile from './Myprofile'
import CreatePost from './CreatePost'
import Chat from './Chat'

import {
    BrowserRouter as Router,
    Switch,
    Route
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
                    <Navbar />
                    <Myprofile />
                </Route>

                <Route exact path="/createpost">
                    <Navbar />
                    <div className="mt-4">
                        <CreatePost />
                    </div>
                    
                </Route>

                <Route exact path="/chat">
                    <Navbar />
                    <div className="mt-4">
                        <Chat />
                    </div>
                    
                </Route>
            </Switch>

            {/*<Footer/>*/}

        </Router>                    
    )
}

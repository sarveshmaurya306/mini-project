import React from "react";
import Navbar from "./Navbar";
// import axios from 'axios'
import Join from "./Join";
import Login from "./Login";
// import Footer from './Footer'
import Home from "./Home";
import Myprofile from "./Myprofile";
import CreatePost from "./CreatePost";
import Chat from "./Chat";
import Checking from './Checking.jsx'
import OtherProfile from './OthersProfile.jsx'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {IconButton} from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>

                <Route exact path="/join">
                    <Join />
                </Route>

                <Route exact path="/home">
                    <Navbar />
                    <Home />
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
                <Route exact path="/check">
                    <Checking/>
                </Route>
                <Route exact path="/other/profile">
                      <div className="mt-4">
                       <Link to="/home"style={{position:'fixed'}}>
                            <IconButton color="secondary">
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <center><h2>Searched Result</h2></center>
                       
                        <OtherProfile/>
                      </div>
                </Route>
            </Switch>

            {/*<Footer/>*/}
        </Router>
    );
}

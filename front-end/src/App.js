import React from "react";
import Navbar from "./components/Navbar";
// import axios from 'axios'
import Join from "./components/Join";
import Login from "./components/Login";
// import Footer from './Footer'
import Home from "./components/Home";
import Myprofile from "./components/Myprofile";
import CreatePost from "./components/CreatePost";
import Chat from "./components/Chat.jsx";
import OtherProfile from "./components/OthersProfile.jsx";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
            <Chat /></div>
        </Route>

        <Route exact path="/other/profile">
          <div className="mt-4">
            {/* <Link to="/home" style={{ position: "fixed" }} > */}
              <IconButton color="secondary" onClick={()=>window.history.back() }>
                <ArrowBackIcon />
              </IconButton>
            {/* </Link> */}
            <center>
              <h2>Searched Result</h2>
            </center>

            <OtherProfile />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

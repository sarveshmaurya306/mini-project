import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Join from './Join'
import Home from './Home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  
export default function App() {
    const [user ,setUser]= useState();

    useEffect(()=>{
        axios.get('http://localhost:4000/show').then(d=>{console.log(d);setUser(d)})
    },[])

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                    {/* <p style={{marginBottom:0,height:'100vh'}}>Copyright to KIET Talks</p> */}

                </Route>
                <Route exact path="/join">
                    <Navbar/>
                    <Join/>
                    <br/>
                    <br/><br/><br/>
                    <h1>Total User...</h1><br/><br/>
                    {
                        !user?'':user.data.map((item,index)=><div key={index}>
                            <p>id: = {item._id}</p>
                            <p>name: = {item.name}</p><br/>
                            <p>email: = {item.email}</p><br/>
                            <p>password: = {item.password}</p><hr/><br/><br/>
                            </div>)
                    }
                </Route>
            </Switch>
        </Router>
    )
}

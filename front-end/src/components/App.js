import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Login from './Login'

export default function App() {
    const [user ,setUser]= useState();

    useEffect(()=>{
        axios.get('http://localhost:4000/show').then(d=>{console.log(d);setUser(d)})
    },[])

    return (
        <>
            <Navbar/>
            <Login/>
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
        </>
    )
}

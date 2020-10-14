import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import SendIcon from "@material-ui/icons/Send";
import { IconButton, Button } from "@material-ui/core";
import Loading from "./Loading";

const socket = io.connect("http://localhost:4000");



function App() {

  const [message, setMessage]=useState('')
  const [sendit,setsendit]=useState(false)
  
  const [chat,setChat]=useState([])
  // const chat=[];
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    socket.emit('new_user',{ name:sessionStorage.getItem('name'), email:sessionStorage.getItem('email'), room:sessionStorage.getItem('currentRoom')})
    
  },[])

  useEffect(()=>{
   
   socket.once('admin_message', ({name, message})=>{
      // console.log(name, message)
      setChat([...chat, {name, message}])
      // chat.push({name, message})
      console.log(chat)
      // chat.push({name, message})
    })

    socket.once('server_user_message',({name, message})=>{
      // console.log(name, message)
      setChat([...chat, {name, message}])
      // chat.push({name, message})
      console.log(chat)
      // chat=([ ...chat,{name, message}])
    })

  },[sendit]) 

  const userMessage=(e)=>{
    setMessage(e.target.value)
  }

  const sendMessage=(e)=>{
    e.preventDefault();
     
    socket.emit('user_message',message)
    setMessage('')

    setsendit(e=>!e)
  }

  const changeUserRoom=()=>{
    socket.emit('change_user_room','official')
  }
  const displayChat=()=>{
    return chat.map((chat,index)=>{
      return <p key={index}>{chat.name}: {chat.message}</p>
    })
  }

  return (
  <>{
    loading?<Loading/>: <div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={userMessage}/>
        <button >Send</button>
      </form>
      {displayChat()}
    </div>
    
  }</>
  )
}

export default App;

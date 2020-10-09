import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import io from 'socket.io-client';
import {Button, Icon} from '@material-ui/core'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../Loading.jsx";
import MeMsg from './MeMsg.jsx'
import ServerMsg from './ServerMsg.jsx'

toast.configure();


const currencies = [
  {
    value: 'Official',
    label: 'Official',
  },
  {
    value: 'Unoffcial',
    label: 'Unoffcial',
  },
  {
    value: 'Both',
    label: 'Both',
  },
];
/*
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));*/
 var toShow=[];

const socket=io('localhost:4000');

export default function Chat() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [message, setMessage]=useState() //msg by server
  const [userMessage, setUserMessage]=useState(); //msg by user
  const [groupName, setGroupName]=useState('Official');
  const [temp, setTemp]=useState('');
   // const classes = useStyles();
  const [currency, setCurrency] = React.useState('Official');

 const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  useEffect(() => {
    const url= `http:127.0.0.1:4000`
    axios({
      method: "get",
      url: `/chat`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
         setLoading(false);
         console.log(res)
         window.sessionStorage.setItem('username',res.data);
         socket.emit('join',{username:sessionStorage.getItem('username'),room:"Official"})
  
      })
      .catch((e) =>console.log(e));
  },[]);

// console.log(toShow)


useEffect(()=>{
  socket.on('welcome',(message)=>{
    setMessage(message)
  })
   socket.emit('join',{username:sessionStorage.getItem('username'),room:"Official"})
    socket.on('message',(message)=>{
    setMessage(message)
  })

},[loading])
const [reply,setReply]=useState('')

useEffect(()=>{
   socket.on('message',(message)=>{
    setMessage(message)
   })
   socket.on('reply',message=>{
    setReply(message)
   })
   toast.info(message, {
     position: "bottom-left",
     autoClose: 2000,
   })
   // socket.emit('sendmessage',userMessage);
   // toShow.push(message)
},[message])

useEffect(()=>{
  toast.info(reply, {
     position: "bottom-left",
     autoClose: 2000,
   })
},[reply])

useEffect(()=>{
    // socket.emit('sendmessage',userMessage);
    // socket.on('usermessage',{name, data}=>{})
},[userMessage])
// console.log(toShow)
const joinGroup=(name)=>{
  setGroupName(name)
  socket.emit('join',{username:sessionStorage.getItem('username'),room:name});
}


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>

          <div className="row" style={{height:'80vh'}}>
            
            <div className="col-3 bg-dark text-light " style={{border:'1px solid whitesmoke',borderRadius:5}} >
              <center><strong><h2 className="mt-2">#{groupName}</h2></strong></center>
              <div className="d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
                <ul style={{ listStyle:'none'}}>
                  <li style={{cursor:'pointer', }} onClick={()=>joinGroup('Official')}>#Official</li>
                  <li style={{cursor:'pointer', }} onClick={()=>joinGroup('Unofficial')}>#Unoffcial</li>
                  <li style={{cursor:'pointer', }} onClick={()=>joinGroup('Both')}>#Both</li>
                </ul>
              </div>
            </div>

            <div className="col-9" style={{backgroundColor:'whitesmoke',border:'1px solid black',borderRadius:5}} >
                {/*
                  toShow.map((msg)=>{
                    <div>
                      <ServerMsg msg={msg} />
                      <br/>
                    </div>
                  })
                */}
                <ServerMsg msg={toShow} />
            </div>
          </div>
          <div className="row mr-5 mb-3" style={{ alignItems:'baseline',float:'right' }} >
            <form style={{ zIndex:10}} onSubmit={(e)=>{ 
                e.preventDefault()
                // console.log(userMessage)
                socket.emit('sendmessage',userMessage);
                // setUserMessage('');

              }} >
              <input 
              className="mt-2 p-2 "
              placeholder="type a message..."
              value={temp}
              style={{
                backgroundColor: "transparent",
                border: "2px solid black",
                borderRadius: "8px",
                fontWeight: "bolder",
                
              }}
              onChange={e=>setTemp(e.target.value)}
              />
              <Button 
              type="submit"
              onClick={()=>{
                setUserMessage(temp);
              }}
              variant="contained"
              color="primary"
              >send</Button>    
            </form>
          </div>
          
        </div>
      )}
    </>
  );
}

/*
                     <input 
                     className="mt-2 p-2 "
                     placeholder="type a message..."
                     style={{
                          backgroundColor: "transparent",
                          border: "2px solid black",
                          borderRadius: "8px",
                          fontWeight: "bolder",
                        }}
                     onChange={e=>setUserMessage(e.target.value)}
                     />
                     <Button 
                     variant="contained"
                     color="primary"
                     onClick={()=>{ 
                       socket.emit('usermessage', userMessage);
                       console.log(userMessage)
                     }} >send</Button>
*/
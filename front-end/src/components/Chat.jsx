import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Loading from "./Loading";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const socket = io.connect("http://localhost:4000");

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function Chat() {
  const history = useHistory();
  const classes = useStyles();
  const [group, setGroup] = React.useState('both');
  const handleChange = (event) => {
    setGroup(event.target.value);
    changeUserRoom(event.target.value)
  };


  //messanging
  const [message, setMessage]=useState('')
  const [sendit,setsendit]=useState(false)
  
  const [chat,setChat]=useState([])
  // const chat=[];
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    socket.emit('connection');
    // console.log('first render')
    socket.emit('new_user',{ name:sessionStorage.getItem('name'), email:sessionStorage.getItem('email'), room:sessionStorage.getItem('currentRoom')})

    return(()=>{
      socket.emit('disconnect')
    })
  },[])

  useEffect(()=>{
    axios({
			method: "get",
			url: `/checkuserauth`,
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
			},
		})
			.then((res) => {
				setLoading(false);
			})
			.catch((e) => history.push("/"));
  },[])


  // useEffect(()=>{
   
  // //  socket.once('admin_message', ({name, message})=>{
  // //     console.log(name, message)
  // //     setChat([...chat, {name, message}])
  // //     // chat.push({name, message})
  // //     console.log(chat)
  // //     // chat.push({name, message})
  // //   })
  // },[sendit]) 

  socket.once('admin_message', ({name, message})=>{
    console.log(name, message)
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

  
  const userMessage=(e)=>{
    setMessage(e.target.value)
  }

  const sendMessage=(e)=>{
    e.preventDefault();
     
    socket.emit('user_message',message)
    setMessage('')

    setsendit(e=>!e)
  }

  const changeUserRoom=(room)=>{
    socket.emit('change_user_room',room)
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
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">Groups</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={group}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="both">
            <em>both</em>
          </MenuItem>
          <MenuItem value='official'>official</MenuItem>
          <MenuItem value='unofficial'>unofficial</MenuItem>
          {/* <MenuItem value='both'>both</MenuItem> */}
        </Select>
      </FormControl>
      {displayChat()}
    </div>
    
  }</>
  )
}


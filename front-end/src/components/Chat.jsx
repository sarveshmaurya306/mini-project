import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Loading from "./Loading";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";
import {TextField, Button} from '@material-ui/core'
const socket = io.connect("http://localhost:4000");

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    message:{
      
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  messageReceiver:{
    marginLeft: '20px',
    marginBottom:' 10px',
    padding:' 10px',
    backgroundColor:' #A8DDFD',
    width:' 200px',
    // height: '50px',
    textAlign:' left',
    font: '400 .9em ,sans-serif',
    border: '1px solid #97C6E3',
    borderRadius:' 10px',
    position: 'relative',
    '&::after':{
      content:`''`,
      color:'red',
      position:' absolute',
      width:' 0',
      height:' 0',
      borderTop: '15px solid #A8DDFD',
      borderLeft:' 15px solid transparent',
      borderRight: '15px solid transparent',
      top:' 0',
      left: '-15px',
    },
    '&::before':{
      content: `''`,
      position: "absolute",
      width: 0,
      height: 0,
      borderTop: "17px solid #97C6E3",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      left: "-17px",
    }
  },
  messageSender:{
    position:` relative`,
    marginBottom:` 10px`,
    marginLeft: `calc(100% - 240px)`,
    padding:` 10px`,
    backgroundColor:` #f8e896`,
    width:` 200px`,
    // height:` 50px`,
    textAlign: `left`,
    font:` 400 .9em 'Open Sans', sans-serif`,
    border:` 1px solid #dfd087`,
    borderRadius:` 10px`,
    '&::after':{
      content: `''`,
      position: `absolute`,
      width: `0`,
      height:` 0`,
      borderBottom:` 15px solid #f8e896`,
      borderLeft:` 15px solid transparent`,
      borderRight:` 15px solid transparent`,
      bottom:` 0`,
      right: `-15px`,
    },
    '&::before':{
      content: `''`,
      position: `absolute`,
      width: `0`,
      height:` 0`,
      borderBottom:` 17px solid #f8e896`,
      borderLeft:` 16px solid transparent`,
      borderRight:` 16px solid transparent`,
      bottom:` -1px`,
      right: `-17px`,
    }
  }
}));

export default function Chat() {
  const history = useHistory();
  const classes = useStyles();
  const [group, setGroup] = React.useState("both");
  const handleChange = (event) => {
    setGroup(event.target.value);
    changeUserRoom(event.target.value);
  };

  //messanging
  const [message, setMessage] = useState("");
  const [sendit, setsendit] = useState(false);

  const [chat, setChat] = useState([]);
  // const chat=[];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.emit("connection");
    // console.log('first render')
    socket.emit("new_user", {
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      room: sessionStorage.getItem("currentRoom"),
    });

    return () => {
      socket.emit("disconnect");
    };
  }, []);

  useEffect(() => {
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
  }, []);

  // useEffect(()=>{

  // //  socket.once('admin_message', ({name, message})=>{
  // //     console.log(name, message)
  // //     setChat([...chat, {name, message}])
  // //     // chat.push({name, message})
  // //     console.log(chat)
  // //     // chat.push({name, message})
  // //   })
  // },[sendit])

  socket.once("admin_message", ({ name, message, time }) => {
    console.log(name, message);
    setChat([...chat, { name, message }]);
    // chat.push({name, message})
    console.log(chat);
    // chat.push({name, message})
  });
  socket.once("server_user_message", ({ name, message, time }) => {
    // console.log(name, message)
    setChat([...chat, { name, message, time }]);
    // chat.push({name, message})
    // console.log(chat);
    // chat=([ ...chat,{name, message}])
  });

  const userMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("user_message", message);
    setMessage("");

    setsendit((e) => !e);
  };

  const changeUserRoom = (room) => {
    socket.emit("change_user_room", room);
  };
  const displayChat = () => {
    return chat.map((chat, index) => {
      return (
        <div style={ chat.name===sessionStorage.getItem('name')? {display:'flex',justifyContent:'flex-end' }: { display:'flex' }} key={index}>
          <p
            className={chat.name===sessionStorage.getItem('name')?classes.messageSender:classes.messageReceiver}
          >
            <span style={{ color: "blue", fontWeight: "bold" }}>
              {chat.name} : 
            </span>
            <br />

            {chat.message}
            <br/>
          <small style={{ color: "grey" }}>
              <span className="px-1" style={{
                fontFamily: "monospace",
              }}> {moment(chat.time).fromNow()}</span>
            </small>
          </p>
          
        </div>
      );
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="container-fluid">
            <div className="row">
              {/* <div className="col-3 col-md-2"  style={{
                  top: 40,
                  position: "fixed",
                  left: 0,
                  width:'max-content'
                }}>
                
              </div> */}
              <div className="col-9 col-md-10">{displayChat()}</div>
              <div
                className="col-3 col-md-2"
                style={{
                  height:'50vh',
                  bottom: 20,
                  position: "fixed",
                  right: 20,
                }}
              >
                <FormControl className={classes.margin}>
                  <InputLabel id="demo-customized-select-label">
                    Groups
                  </InputLabel>
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
                    <MenuItem value="official">official</MenuItem>
                    <MenuItem value="unofficial">unofficial</MenuItem>
                    {/* <MenuItem value='both'>both</MenuItem> */}
                  </Select>
                </FormControl>
                <div
                  style={{
                    height: '86vh',
                    bottom: '20px',
                    position:' fixed',
                    right:' 20px',
                    display:' flex',
                    flexDirection:'column-reverse',
                    alignContent: 'space-between',
                  }}
                >
                  <form onSubmit={sendMessage}>
                    <div className="d-flex" style={{}}>
                      <TextField label="Message" variant="outlined"  value={message} onChange={userMessage}  />
                      {/* <Button variant="outlined" color="primary">Send</Button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
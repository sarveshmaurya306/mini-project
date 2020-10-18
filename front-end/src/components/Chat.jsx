import React, { useState, useEffect, useRef } from "react";
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
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import Footer from "./Footer.jsx";

import { toast } from "react-toastify";
toast.configure();

const socket = io.connect("http://localhost:4000");

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
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
  messageReceiver: {
    marginLeft: "20px",
    marginBottom: " 10px",
    padding: " 10px",
    backgroundColor: " #A8DDFD",
    // width: " 200px",
    // height: '50px',
    textAlign: " left",
    font: "400 .9em ,sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: " 10px",
    position: "relative",
    "&::after": {
      content: `''`,
      color: "red",
      position: " absolute",
      width: " 0",
      height: " 0",
      borderTop: "15px solid #A8DDFD",
      borderLeft: " 15px solid transparent",
      borderRight: "15px solid transparent",
      top: " 0",
      left: "-15px",
    },
    "&::before": {
      content: `''`,
      position: "absolute",
      width: 0,
      height: 0,
      borderTop: "17px solid #97C6E3",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      left: "-17px",
    },
  },
  messageSender: {
    marginLeft: `calc(100% - 240px)`,
    marginBottom: " 10px",
    padding: " 10px",
    backgroundColor: ` #f8e896`,
    // width: " 200px",
    // height: '50px',
    textAlign: " left",
    font: "400 .9em ,sans-serif",
    border: "1px solid #d5d80b",
    borderRadius: " 10px",
    position: "relative",
    "&::after": {
      content: `''`,
      position: `absolute`,
      width: `0`,
      height: ` 0`,
      borderBottom: ` 15px solid #f8e896`,
      borderLeft: ` 15px solid transparent`,
      borderRight: ` 15px solid transparent`,
      bottom: ` 0`,
      right: `-15px`,
    },
    "&::before": {
      content: `''`,
      position: `absolute`,
      width: `0`,
      height: ` 0`,
      borderBottom: ` 17px solid #d5d80b`,
      borderLeft: ` 16px solid transparent`,
      borderRight: ` 16px solid transparent`,
      bottom: ` -1px`,
      right: `-17px`,
    },
  },
}));

// window.sessionStorage.getItem('chat','[]')

function Chat() {

  console.log('in chat agian render')
  const history = useHistory();
  const classes = useStyles();
  const [group, setGroup] = React.useState(sessionStorage.getItem('currentRoom'));

  const handleChange = (event) => {
    sessionStorage.setItem('currentRoom', event.target.value);
    setGroup(event.target.value);
    // window.location.reload()
    // changeUserRoom(event.target.value);
  };

  //messanging
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(JSON.parse(sessionStorage.getItem('chat')));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.emit("connection");
    console.log('first render')
    socket.emit("new_user", {
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      room: sessionStorage.getItem("currentRoom"),
    });

    setChat(JSON.parse(sessionStorage.getItem('chat')))

    return () => {
      socket.emit("disconnect");
      // sessionStorage.setItem('chat','[]');
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
        // sessionStorage.setItem('chat','[]');
      })
      .catch((e) => history.push("/"));
  }, []);


  useEffect(() => {
    socket.once("admin_message", ({ name, message, time }) => {
      console.log(name);
      setChat([...chat, { name, message, time }]);
      // sessionStorage.setItem('chat', JSON.stringify(chat))
    });
    socket.once("server_user_message", ({ name, message, time }) => {
      console.log(name);
      setChat([...chat, { name, message, time }]);
    });
  },[chat]);
  
  sessionStorage.setItem('chat', JSON.stringify(chat))
  const userMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    !message ? 
    toast.warn(`Please enter something.`, {
      position: "bottom-left",
      autoClose: 3000,
    }) :
    socket.emit("user_message", message);
    setMessage("");
  };
 
  useEffect(()=>{
    
    const changeUserRoom = (room) => {
      console.log('change user room called.')
      setChat([]);
      sessionStorage.setItem('currentRoom', room);
      socket.emit("change_user_room", room);
    };
    changeUserRoom(group);
    
  }, [group])

  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  const displayChat = () => {
    return (
      <div className="autoscroll-container">
        <div className="scroll-list">
          {chat.map((chat, index) => {
            let current_name = sessionStorage.getItem("name");
            return (
              <div
                style={
                  chat.name === current_name
                    ? {
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "20px",
                        
                      }
                    : { display: "flex", marginBottom: "20px", }
                }
                key={index}
              >
                <p
                  style={{
                    maxWidth:'50%'
                  }}
                  className={
                    chat.name === current_name
                      ? classes.messageSender
                      : classes.messageReceiver
                  }
                >
                  <Link to="/tobeimplemented">
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      {current_name === chat.name ? "You" : chat.name} :
                    </span>
                  </Link>
                  <br />

                  {chat.message}
                  <br />
                  <small style={{ color: "grey" }}>
                    <span
                      className="px-1"
                      style={{
                        fontFamily: "monospace",
                      }}
                    >
                      {moment(chat.time).fromNow()}
                    </span>
                  </small>
                  {/* <br/> */}
                </p>
              </div>
            );
          })}
          <div ref={bottomRef} className="list-bottom"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h3 style={{ color: "skyblue", fontWeight: "bolder" }}>
            <center>Chatting</center>
          </h3>
          <div className=" container-fluid
          " style={{marginBottom:'90px'}}>
            {/* <div className="row"> */}
              
              <div
                className=""
              >
                {displayChat()}
              </div>
              <div
                // className="col-3 col-md-2"
                style={{
                  float: "right",
                  // height: "50vh",
                  height:'10%',
                  bottom: 20,
                  position: "fixed",
                  right: 20,
                }}
              >
                {/* <br/><hr/> */}
                {/* <hr/> */}
                <div
                  style={{
                    // marginTop:'10px',
                    // display:'flex',
                    // alignItems:'center',
                    // width:'100vh',
                    // position:'relative',
                    // left:'60',
                   

                  //  height: "86vh",
                    bottom: "20px",
                    position: " fixed",
                    right: " 20px",
                    display: " flex",
                    // flexDirection: "column-reverse",
                    // alignContent: "space-between", 
                    alignItems:'center',
                    marginTop:'20px',
                  }}
                >
                  <form onSubmit={sendMessage} style={{marginTop:'20px'}}>
                    <div className="d-flex" style={{
                    
                    }}>
                      <TextField
                        label="Message"
                        variant="outlined"
                        value={message}
                        onChange={userMessage}
                      />
                      {/* <Button variant="outlined" color="primary">Send</Button> */}
                    </div>
                  </form>
                  <center>
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
                        <MenuItem value="both">both</MenuItem>
                        <MenuItem value="official">official</MenuItem>
                        <MenuItem value="unofficial">unofficial</MenuItem>
                      </Select>
                    </FormControl>
                  </center>
                </div>
              {/* </div> */}
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
}

export default Chat;

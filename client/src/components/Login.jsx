import React, { useState, useEffect } from "react";
import backgroundImg from "../images/back.png";
import logo from "../images/Logo.png";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./Styles";
import LoginBackImage from '../images/login2.jpg'
import axios from "axios";
import { useHistory } from "react-router-dom";
import Typed from 'react-typed'
import AOS from "aos";
import "aos/dist/aos.css";
import { server } from './utils/backurl.js'
import Footer from "./Footer.jsx";
import { UserData } from '../App.js'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
toast.configure();

export default function Login() {
  const { mainUserData, setMainUserData } = useContext(UserData);
  const classes = useStyles();

  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  // const [varified, SetVarified]= useState(false);
  const history = useHistory();

  const sendLoginForm = (e) => {
    e.preventDefault();
    // console.log(loginDetails);

    const checkUserDetails = (loginDetails) => {
      if (loginDetails.email && loginDetails.password.length >= 7) {
        return true;
      } else {
        toast.error("Please provide currect details.", {
          position: "bottom-left",
          autoClose: 4000,
        });
        return false;
      }
    };
    const isCurrect = checkUserDetails(loginDetails);

    if (isCurrect) {
      axios
        .post(`${server}/login`, { ...loginDetails })
        .then((res) => {

          const toStore = {
            name: res.data.name,
            email: res.data.email,
            token: res.data.token,
            currentRoom: "both",
            sortBy: 'date',
            userId: ''
          }
          
          // sessionStorage.setItem( "name", res.data.name)
          // sessionStorage.setItem( "email", res.data.email)
          // sessionStorage.setItem( "token", res.data.token)
          // sessionStorage.setItem( "currentRoom", "both")
          // sessionStorage.setItem( "sortBy", 'date')
          // sessionStorage.setItem(" userId", '')

          setMainUserData({
            name: toStore.name,
            email: toStore.email,
            token: toStore.token,
            currentRoom: "both",
            sortBy: 'date',
            userId: ''
          })

          history.push("/home");
        })
        .catch((err) =>{
          console.log(err)
          toast.error("Please provide currect details.", {
            position: "bottom-left",
            autoClose: 4000,
          })
        });
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      // once:true,
      refresh: true,
      dataOffset: 200,
    });
    AOS.refresh();
  }, []);

  return (
    <div >
      <div
        style={{
          // position: "absolute",
          // backgroundImage:'',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${LoginBackImage}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // height:'',
          height: "auto",
          width: '100vw',
          overflow: 'hidden',

          // paddingBottom:'40%',
          // overflowX:'hidden'
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 22,
          }}
        >
          <img
            src={logo}
            style={{
              width: 117,
              height: "auto",
            }}
          />
          {/* <Link to="/join">
            <Button
              variant="outlined"
              color="primary"
              className={classes.main_button}
            >
              Join Us
            </Button>
          </Link> */}
          <Link to="/why?">
            <h3 style={{ color: 'white' }}>
              Why?
          </h3>
          </Link>
        </div>
        <hr /><br /> <br />
        <div className="container" style={{ height: '100vh' }}>
          <div className="row mb-md-5" style={{ marginTop: "7%" }}>
            <div
              // data-aos="fade-right"
              className={` col-sm-12 col-md-6 d-none mt-5 mb-3 d-md-block ${classes.home_text} text-light `}

            >
              Place where Kietins will talk to each other and get the solution
              of their problems. <br />
              <span style={{ color: "gold" }}>Build For :</span>
              <Typed
                strings={['Official', 'Teacher', 'Student']}
                loop
                backSpeed={80}
                typeSpeed={60}
                style={{ color: 'red' }}
                backDelay={3000}
                cursorChar="s"

              />
            </div>
            <div className="col-sm-12 col-md-6" >  {/* data-aos="fade-left"  */}
              <form
                className={`${classes.form} `}
                onSubmit={sendLoginForm}
                style={{
                  // backdropFilter: "blur(5px) "
                  border: '4px dotted white'
                }}
              >
                <div className="p-5">
                  <div
                    className={`${classes.form_header}`}
                    style={{ display: "flex", justifyContent: "center", color: 'white' }}
                  >
                    LOGIN
                  </div>
                  <input
                    autoComplete="off"
                    value={loginDetails.email}
                    type="email"
                    placeholder="Username"
                    className="mt-2 mb-4 p-2"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid white",
                      borderRadius: "8px",
                      fontWeight: "bolder",
                      color: 'white'
                    }}
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                  <br />


                  <input
                    autoComplete="off"
                    value={loginDetails.password}
                    type="password"
                    placeholder="Password"
                    className="mb-2 p-2"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid white",
                      borderRadius: "8px",
                      fontWeight: "bolder",
                      color: 'white'
                    }}
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        password: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <strong style={{ color: "red" }} className="p-2">
                    {message}
                  </strong>
                  <br />
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    className={classes.main_button}

                  >
                    Login
                  </Button><br />
                  <div style={{ paddingTop: '8px', color: 'white' }}>
                    Not a member? <Link to="/join">
                      <span style={{ color: 'blue' }}> <strong>Sign Up Now</strong> </span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <br />
        <br />
        <br /> <br /> <br />
        <br />
        <br /> <br /> <br /> <br /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
//setting aos
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";
import LoginBackImage from '../images/login2.jpg'
import backgroundImg from "../images/back.png";
import logo from "../images/Logo.png";

import Footer from "./Footer.jsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  main_button: {
    // background: '#00d3ff8c',
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    // color: '#000000',
    background: "#346bac",
    color: "white",
    textShadow:' 3px 4px 5px black',
    // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    // border:'0px 0px 0px transparent',
    borderRadius: "8px",
    "&:hover": {
      background: "transparent",
      color: "white",
    },
  },
  form_header: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: " bold",
    fontSize: " 30px",
    lineHeight: "169.1%",
    display: "flex",
    alignItems: " center",
    textAlign: "right",
    letterSpacing: "0.02em",
    textDecorationLine: "underline",
    color: "#000000",
  },
  papershadow: {
    boxShadow:
      "  0px 2px 4px -1px rgba(0,0,0,0.2),  0px 4px 5px 0px rgba(0,0,0,0.14),  0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
}));

function Join() {
  const classes = useStyles();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    name: "",
    currentStatus: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      //once:true,
      refresh: true,
      dataOffset: 200,
    });
    AOS.refresh();
  }, []);

  const sendJoinForm = (e) => {
    e.preventDefault();

    console.log(userDetails);
    const url = `http://127.0.0.1`;

    const isCurrect = (data) => {
      if (
        (data.currentStatus.toLowerCase() === "principle" ||
          data.currentStatus.toLowerCase() === "student" ||
          data.currentStatus.toLowerCase() === "teacher") &&
        data.email &&
        data.password.length >= 7 &&
        data.name
      ) {
        return true;
      } else {
        toast.error("Password must be greater than 7.", {
          position: "bottom-left",
          autoClose: 4000,
        });
        return false;
      }
    };

    const isDataCurect = isCurrect(userDetails);

    if (isDataCurect) {
      axios
        .post(`/join`, userDetails)
        .then((res) => {
          window.sessionStorage.setItem("token", res.data);
          window.sessionStorage.setItem("name", res.data.name);
          window.sessionStorage.setItem("email", res.data.email);
          window.sessionStorage.setItem("currentRoom", "both");
          toast.success('Registered...', {
            position: "bottom-left",
            autoClose: 4000,
          })
          setLoading(false);
          history.push('/')
        })
        .catch((e) => {
          // console.log(e);
          toast.error("Either you miss some fields or the user is already registerd.", {
            position: "bottom-left",
            autoClose: 4000,
          });
          setLoading(false);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${LoginBackImage}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // height:'',
          height: "100vh",
          width:'100vw',
          overflow:'hidden'
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
        {/*  <Link to="/">
          <Button
            variant="outlined"
            color="primary"
            className={classes.main_button}
          >
            Login
          </Button>
        </Link> */}
      </div>
      <hr />

      <div className="container " style={{ height: "100vh", marginTop: "2%", }}>
        <form onSubmit={sendJoinForm}>
          <div
            style={{
              width: "100%",
              height: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              // data-aos="zoom-in"
              elevation={4}
              style={{
                padding: "5% 15%",
                background: "transparent",
                border: "4px dotted white",
                boxSizing: "border-box",
                borderRadius: "16px",
                textAlign: "center",
                color:'white'
              }}
              className={classes.papershadow}
            >
              <h1
                className={classes.form_header}
                style={{ display: "flex", justifyContent: "center",color:'white' }}
              >
                JOIN
              </h1>

              <div className={classes.margin}>
                <input
                  type="text"
                  value={userDetails.name}
                  placeholder="Full name"
                  className="mt-2 mb-4 p-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid  white",
                    borderRadius: "8px",
                    fontWeight: "bolder",
                    color:'white'
                  }}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, name: e.target.value });
                  }}
                />
                <br />

                <input
                  type="text"
                  value={userDetails.currentStatus}
                  placeholder="Position in collage"
                  className="mt-2 p-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid  white",
                    borderRadius: "8px",
                    fontWeight: "bolder",
                    color:'white'
                  }}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      currentStatus: e.target.value,
                    });
                  }}
                />
                <p >
                  {" "}
                  <small style={{fontWeight:'bold'}}className="text-danger ">
                    only "student" "teacher" "principle" are accepted.
                  </small>
                </p>

                <input
                  value={userDetails.email}
                  type="email"
                  placeholder="Email"
                  className="mb-4 p-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid  white",
                    borderRadius: "8px",
                    fontWeight: "bolder",
                    color:'white'
                  }}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, email: e.target.value });
                  }}
                />
                <br />
                <input
                  value={userDetails.password}
                  type="password"
                  placeholder="Password"
                  className="mb-4 p-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid white",
                    borderRadius: "8px",
                    fontWeight: "bolder",
                    color:'white'
                  }}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    });
                  }}
                />
                <div
                  className="d-flex mt-2"
                  style={{
                    display: "flex",
                    flexWrap: " wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    className={classes.main_button}
                    onClick={(e) => {
                      setLoading(true);
                      loading
                        ? (e.target.innerHTML = "adding...")
                        : (e.target.innerHTML = "add me");
                    }}
                  >
                    Add me
                  </Button>
                </div>
                <div style={{ paddingTop: '10px',color:'white' }}>
                  Already a member?
                  <Link to="/" className=" ">{/*   ml-md-3 ml-0 */}
                    <strong> Sign In Here</strong> 
                  </Link>
                </div>
              </div>
            </Paper>
          </div>
        </form>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Join;

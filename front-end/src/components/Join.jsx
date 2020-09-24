import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
//
// import { AccountCircle, MailOutline, Https, } from '@material-ui/icons';
import axios from "axios";
//setting aos
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
// import {Button, Typography} from '@material-ui/core'
// import useStyles from './Styles'
import { useHistory } from "react-router-dom";

import backgroundImg from "../images/back.png";
import logo from "../images/Logo.png";

import Footer from "./Footer.jsx";

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
    background: "black",
    color: "white",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    // border:'0px 0px 0px transparent',
    borderRadius: "8px",
    "&:hover": {
      background: "transparent",
      color: "black",
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
    currentStatus:'',
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
    // console.log(userDetails)
    const url = `http://127.0.0.1`;
    axios
      .post(`/join`, userDetails)
      .then((res) => {
        window.sessionStorage.setItem("token", res.data);
        setLoading(false);
        history.push("/home");
      })
      .catch((e) => {
        // console.log(e);
        setLoading(false);
        alert("user cannot be added please try again.");
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        background: `url(${backgroundImg}) `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // height:'',
        width: "100vw",
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
        <Link to="/">
          <Button
            variant="outlined"
            color="primary"
            className={classes.main_button}
          >
            Login
          </Button>
        </Link>
      </div>
      <hr />

      <div className="container " style={{ height: "100vh", marginTop: "4%" }}>
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
              data-aos="zoom-in"
              elevation={4}
              style={{
                padding: "5% 15%",
                background: "transparent",
                border: "3px solid #000000",
                boxSizing: "border-box",
                borderRadius: "16px",
                textAlign: "center",
              }}
              className={classes.papershadow}
            >
              <h1
                className={classes.form_header}
                style={{ display: "flex", justifyContent: "center" }}
              >
                Join Us
              </h1>

              <div className={classes.margin}>
                <input
                  type="text"
                  value={userDetails.name}
                  placeholder="Full name"
                  className="mt-2 mb-4 p-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid black",
                    borderRadius: "8px",
                    fontWeight: "bolder",
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
                    border: "2px solid black",
                    borderRadius: "8px",
                    fontWeight: "bolder",
                  }}
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, currentStatus: e.target.value });
                  }}
                />
                <p>  <small className="text-danger">only "student" "teacher" "principle" are accepted.</small></p>


                <input
                  value={userDetails.email}
                  type="email"
                  placeholder="Email"
                  className="mb-4 p-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid black",
                    borderRadius: "8px",
                    fontWeight: "bolder",
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
                    border: "2px solid black",
                    borderRadius: "8px",
                    fontWeight: "bolder",
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
                      loading? (e.target.innerHTML = "adding..."): (e.target.innerHTML = "add me");
                    }}
                  >
                    Add me
                  </Button>
                  <Link to="/" className="ml-md-3 ml-0">
                    <strong>*Already have an account.</strong>
                  </Link>
                </div>
              </div>
            </Paper>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Join;

// <Grid container spacing={1} alignItems="flex-end" >
//   <Grid item>
//     <AccountCircle />
//   </Grid>
//   <Grid item>
//     <TextField autoComplete="off" onChange={e => setUserDetails({ ...userDetails, name: e.target.value })} id="input-with-icon-grid" autoCorrect='off' autoComplete='off' type="text" label="Name" />
//   </Grid>
// </Grid>
// <Grid container spacing={1} alignItems="flex-end">
//   <Grid item>
//     <MailOutline />
//   </Grid>
//   <Grid item>
//     <TextField autoComplete="off" onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} id="input-with-icon-grid" type="email" label="Email" />
//   </Grid>
// </Grid>
// <Grid container spacing={1} alignItems="flex-end">
//   <Grid item>
//     <Https />
//   </Grid>
//   <Grid item>
//     <TextField autoComplete="off" onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} id="input-with-icon-grid" type="password" label="Password" />
//   </Grid>
// </Grid>

// <br/>

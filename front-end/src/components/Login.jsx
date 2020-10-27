import React, { useState, useEffect } from "react";
import backgroundImg from "../images/back.png";
import logo from "../images/Logo.png";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./Styles";

import axios from "axios";
import { useHistory } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "./Footer.jsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Login() {
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
        .post(`/login`, { ...loginDetails })
        .then((res) => {
          setMessage(res.data.message);
          window.sessionStorage.setItem("token", res.data.token);
          window.sessionStorage.setItem("name", res.data.name);
          window.sessionStorage.setItem("email", res.data.email);
          window.sessionStorage.setItem("currentRoom", "both");
          window.sessionStorage.setItem('sortBy','date');

          history.push("/home");
        })
        .catch((err) =>
          toast.error("Please provide currect details.", {
            position: "bottom-left",
            autoClose: 4000,
          })
        );
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
    <>
      <div
        style={{
          position: "absolute",
          background: `url(${backgroundImg}) `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // height:'',
          width: "100vw",
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
          <Link to="/join">
            <Button
              variant="outlined"
              color="primary"
              className={classes.main_button}
            >
              Join Us
            </Button>
          </Link>
        </div>
        <hr />
        <div className="container">
          <div className="row mb-md-5" style={{ marginTop: "7%" }}>
            <div
              // data-aos="fade-right"
              className={` col-sm-12 col-md-6 d-none mt-5 mb-3 d-md-block ${classes.home_text} `}
            >
              Place where Kietins will talk to each other and get the solution
              of their problems.
            </div>
            <div className="col-sm-12 col-md-6"> {/*  data-aos="fade-left" */}
              <form
                className={`${classes.form} `}
                onSubmit={sendLoginForm}
                style={{ backdropFilter: "blur(10px)" }}
              >
                <div className="p-5">
                  <div
                    className={`${classes.form_header}`}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Login Here
                  </div>
                  <input
                    autoComplete="off"
                    value={loginDetails.email}
                    type="email"
                    placeholder="Username"
                    className="mt-2 mb-4 p-2"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid black",
                      borderRadius: "8px",
                      fontWeight: "bolder",
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
                      border: "2px solid black",
                      borderRadius: "8px",
                      fontWeight: "bolder",
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
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br /> <br /> <br />
        <br />
        <br /> <br /> <br /> <br />
        <Footer />
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
// import PersonIcon from "@material-ui/icons/Person";
import moment from "moment";
import { useHistory } from "react-router-dom";
import fakeDp from '../images/contant-image.png'
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import {Avatar } from '@material-ui/core'
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
import { server } from './utils/backurl.js'


import CryptoJS from 'crypto-js'
import { cryptoPass } from './utils/crypto-js'


import { Paper } from "@material-ui/core";
import Loading from "./Loading.jsx";
import Footer from "./Footer.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function Myprofile() {


  const data = {
    token: CryptoJS.AES.decrypt(sessionStorage.getItem('token'), cryptoPass).toString(CryptoJS.enc.Utf8),
    userId: CryptoJS.AES.decrypt(sessionStorage.getItem('userId'), cryptoPass).toString(CryptoJS.enc.Utf8),
  }

  const history = useHistory();
  const [userData, setUserData] = useState()


  useEffect(() => {
    const userId = data.userId
    const uri = 'http://127.0.0.1:4000'
    axios({
      method: "get",
      url: `${server}/user/other/profile/${userId}`,
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
      .then((data) => {
        // console.log(data.data)
        setUserData(data.data);
      })
      .catch((e) => { history.push('/') });

    return (() => {

      // window.sessionStorage.removeItem("userId");
    })

  }, []);

  const classes = useStyles();
  const [follow, setFollow] = useState(true);

  return (
    <div>
      {!userData ? (
        <Loading />
      ) : (
          <div>
            {/* {console.log(userData)} */}
            <div className="container-md">
              <div>
                <div
                  className="d-flex py-5 justify-content-around flex-wrap "
                  style={{ alignItems: "baseline" }}
                >
                  <div className={`img-fluid ${classes.root}`}>
                    {/* <PersonIcon
                className="rounded-circle bg-secondary p-2"
                style={{ width: 100, height: 100 }}
              />*/}
                    <a href={!userData.user.avatar
                      ? fakeDp
                      : userData.user.avatar}
                      target="_blank">
                      <img
                        className="rounded-circle bg-secondary "
                        alt="profile pic"
                        src={
                          !userData.user.avatar
                            ? fakeDp
                            : userData.user.avatar
                        }
                        style={{
                          objectFit: 'contain',
                          textAlign: 'center',
                        }}
                        width="200"
                        height="200"
                      />
                    </a>
                    <br />
                  </div>

                  <Button
                    variant="outlined"
                    color={!follow ? "primary" : "secondary"}
                    onClick={() => {
                      setFollow((e) => !e);
                    }}
                    disabled
                  >
                    {" "}
                    {follow ? "follow" : "unfollow"}
                  </Button>

                  <div>
                    <h2 className="text-center " style={{ fontWeight: "bold" }}>
                      <small>Name: </small>
                      {/* {console.log(userData)} */}
                      {userData.user.name}
                    </h2>
                    <h3 className="text-center">
                      <small>Current Position:</small>{" "}
                      {userData.user.currentStatus}
                    </h3>
                  </div>
                </div>

                <hr />
                <div className="d-flex flex-nowrap justify-content-around">
                  <div>
                    {" "}
                    <h3>{userData.userData.length} posts</h3>{" "}
                  </div>
                </div>
                <hr />
                <br />
                {userData.userData.map((item) => {
                  // console.log(item.image)
                  /* const buffer = item.image.data; // e.g., <Buffer 89 50 4e ... >
                  const b64 = new Buffer(buffer).toString("base64");
                  const mimeType = "image/jpg"; // e.g., image/png
                  console.log(item); */

                  return (
                    <Paper
                      elevation={2}
                      key={item._id}
                      style={{ pointer: "cursor" }}
                    >
                      <div
                        className="p-3 row d-flex"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col">
                          {" "}
                          <a href={item.image} target="_blank">
                            <img
                              style={{ maxWidth: 300 }}
                              className=" img-fluid rounded bg-secondary"
                              alt="post image"
                              src={
                                item.image
                              }
                            />
                          </a>
                          <br />
                        </div>
                        <div className="col flex-direction-column">
                          <span style={{ fontWeight: "bold" }}>Created on =</span>
                          {moment(parseInt(item.timestamp)).format("dddd, Do MMMM YYYY, h:mm:ss a")} <br />
                          <span style={{ fontWeight: "bold" }}>Title = </span>
                          {item.title} <br />
                          <span style={{ fontWeight: "bold" }}>
                            description =
                        </span>
                          {item.description} <br />
                          <span style={{ fontWeight: "bold" }}> Likes =</span>
                          {item.likes.length} <br />
                          <span style={{ fontWeight: "bold" }}>Comments =</span>
                          {item.comments.length}
                        </div>
                      </div>
                      <hr />
                    </Paper>
                  );
                })}
              </div>
            </div>

            <Footer style={{ marginBottom: 0 }} />
          </div>
        )}
    </div>
  );
}

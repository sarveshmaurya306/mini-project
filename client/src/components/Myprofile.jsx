import React, { useState, useEffect } from "react";
import axios from "axios";
// import PersonIcon from "@material-ui/icons/Person";
import moment from "moment";
import { useHistory } from "react-router-dom";
import fakeDp from '../images/contant-image.png'
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { server } from './utils/backurl.js'
// import {Avatar } from '@material-ui/core'
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from '@material-ui/icons/Save';
import DoneAllIcon from "@material-ui/icons/DoneAll";
// import IconButton from "@material-ui/core/IconButton";
import { CLOUD_NAME } from './utils/cloudKey.js'
import { Paper } from "@material-ui/core";
import Loading from "./Loading.jsx";
import Footer from "./Footer.jsx";


import CryptoJS from 'crypto-js'
import { cryptoPass } from './utils/crypto-js'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

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
    email: CryptoJS.AES.decrypt(sessionStorage.getItem('email'), cryptoPass).toString(CryptoJS.enc.Utf8),
  }


  const history = useHistory();
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${server}/user/getpost`,
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
      .then((data) => {
        setUserData(data.data);
      })
      .catch((e) => history.push("/"));

    /*   axios({
      method:'get',
      url:'/user/getavatar',
      headers:{
        Authorization:'Bearer '+ sessionStorage.getItem('token')
      }
    }).then(res=>{console.log();setProfile(res.data.toString('base64'))}).catch(e=>console.log(e))*/
  }, []);

  const classes = useStyles();

  const [photo, setPhoto] = useState(null);
  const [follow, setFollow] = useState(true);

  const setAvatar = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const deleteAvatar = (e) => {
    const url = `http://127.0.0.1:4000`
    e.preventDefault();
    const deleteit = window.confirm('do you really want to delete this profile picture');

    if (deleteit) {
      axios({
        url: `${server}/user/avatar`,
        method: 'delete',
        headers: {
          Authorization: "Bearer " + data.token,
        },
      }).then(r => {
        // console.log(r)
        toast.success("Profile photo has been deleted please refresh.", {
          position: "bottom-left",
          autoClose: 4000,
        })
      }).catch(e => {
        // console.log(e)
        toast.error("Server error.", {
          position: "bottom-left",
          autoClose: 4000,
        })
      })
    }
  }


  const sendAvatar = (e) => {
    e.preventDefault();
    toast.info("Please wait for a moment", {
      position: "bottom-left",
      autoClose: 4000,
    });
    const url = `http://127.0.0.1:4000`;

    const formData = new FormData();
    // formData.append("photo", photo);
    formData.append("file", photo);
    formData.append("upload_preset", "mini-project");
    formData.append("cloud_name", CLOUD_NAME);

    axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data: formData,
    }).then((cloud) => {
      axios({
        url: `${server}/user/avatar`,
        method: 'post',
        data: {
          imageUrl: cloud.data.url,
        },
        headers: {
          Authorization: "Bearer " + data.token,
        },
      }).then(x => {
        toast.success("Profile photo has been uploaded please refresh.", {
          position: "bottom-left",
          autoClose: 4000,
        })
      }).catch(e => {
        // console.log(e)
        toast.error("Server error.", {
          position: "bottom-left",
          autoClose: 4000,
        })
      })
    })
      .catch((e) => {
        // console.log(e)
        toast.error("Profile photo must be less than 1MB.", {
          position: "bottom-left",
          autoClose: 4000,
        })
      });
  };
  // console.log(userData);

  const deletePost = (id) => {
    const userRxn = window.confirm("Do you want to delete this post?");
    if (userRxn) {
      axios({
        method: "delete",
        url: `${server}/user/${id}/deletepost`,
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
        .then((r) =>
          toast.success("Post deletions successful.", {
            position: "bottom-left",
            autoClose: 4000,
          })
        )
        .catch((e) =>
          toast.warn("Server error please try again.", {
            position: "bottom-left",
            autoClose: 4000,
          })
        );
    }
  };
  return (
    <div>
      {!userData ? (
        <Loading />
      ) : (
          <div>
            <div className="container-md">
              <div>
                <div
                  className="d-flex py-5 justify-content-around flex-wrap "
                  style={{ alignItems: "baseline" }}
                >
                  <div className={`img-fluid ${classes.root}`}>
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

                    <form

                      onSubmit={sendAvatar}
                      method="post"
                      style={{ display: "flex", alignItems: 'center' }}
                    >
                      <input
                        accept="image/*"
                        className={`${classes.input}`}
                        id="icon-button-file"
                        type="file"
                        name="photo"
                        onChange={setAvatar}
                      />
                      <span className="mt-2">
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            title="image should be less than 3mb"
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </span>
                      <Button
                        disabled={!photo ? true : false}
                        variant="contained"
                        color="primary"
                        type="submit"
                        title="Upload selected profile picture"
                      >
                        <SaveIcon />
                      </Button>
                      <Button
                        disabled={!userData.user.avatar ? true : false}
                        variant="contained"
                        color="secondary"
                        onClick={deleteAvatar}
                        className="ml-3"
                        title="Delete this profile picture"
                      >
                        <DeleteIcon />
                      </Button>
                    </form>
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
                      {userData.user.name}
                    </h2>
                    <h3 className="text-center">
                      <small>Position in college:</small>{" "}
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
                  /*  const buffer = item.image.data; // e.g., <Buffer 89 50 4e ... >
                   const b64 = new Buffer(buffer).toString("base64");
                   const mimeType = "image/jpg"; // e.g., image/png */
                  // console.log(item);
                  // var isDelete=false;
                  // console.log(isDelete)
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

                        <IconButton
                          aria-label="delete"
                          onClick={() => deletePost(item._id)}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
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

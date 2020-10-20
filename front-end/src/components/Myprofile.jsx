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
import DoneAllIcon from "@material-ui/icons/DoneAll";
// import IconButton from "@material-ui/core/IconButton";

import { Paper } from "@material-ui/core";
import Loading from "./Loading.jsx";
import Footer from "./Footer.jsx";

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
  const history = useHistory();
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "/user/getpost",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
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

  const sendAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    axios({
      method: "post",
      url: "/user/avatar",
      data: formData,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "content-type": "multipart/form-data",
      },
    })
      .then((r) =>
        toast.success("Profile photo has been uploaded please refresh.", {
          position: "bottom-left",
          autoClose: 4000,
        })
      )
      .catch((e) =>
        toast.error("Profile photo must be less than 3MB.", {
          position: "bottom-left",
          autoClose: 4000,
        })
      );
  };
  // console.log(userData);

  const deletePost = (id) => {
    const userRxn = window.confirm("Do you want to delete this post?");
    if (userRxn) {
      axios({
        method: "delete",
        url: `/user/${id}/deletepost`,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
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
                  {/* <PersonIcon
                className="rounded-circle bg-secondary p-2"
                style={{ width: 100, height: 100 }}
              />*/}
                  <img
                    className="rounded-circle bg-secondary "
                    alt="profile pic"
                    src={
                      !userData.user.avatar
                        ? fakeDp
                        : `http://127.0.0.1:4000/user/${userData.user._id}/getavatar`
                    }
                    width="180"
                    height="180"
                  />
                  <br />

                  <form
                    onSubmit={sendAvatar}
                    method="post"
                    style={{ display: "flex", alignItems: "baseline" }}
                  >
                    <input
                      accept="image/*"
                      className={`${classes.input}`}
                      id="icon-button-file"
                      type="file"
                      name="photo"
                      onChange={setAvatar}
                    />
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
                    <Button
                      disabled={!photo ? true : false}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {" "}
                      upload{" "}
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
                        {moment(parseInt(item.timestamp )).format("dddd, Do MMMM YYYY, h:mm:ss a")} <br />
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

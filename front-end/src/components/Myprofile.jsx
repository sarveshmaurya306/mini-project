import React, { useState, useEffect } from "react";
import axios from "axios";
// import PersonIcon from "@material-ui/icons/Person";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import {Avatar } from '@material-ui/core'
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";

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
      .then((r) => window.location.reload())
      .catch((e) => alert("something went wrong please try again..."));
  };
  // console.log(userData);

  const deletePost=(id)=>{
    axios({
      method:'delete',
      url:`/user/${id}/deletepost`,
      headers:{
        Authorization:"Bearer "+sessionStorage.getItem('token'),
      }
    }).then(r=>window.location.reload()).catch(e=> alert('server error please retry.'))

 }

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
                        ? "https://f.v1.n0.cdn.getcloudapp.com/items/0L2l2K3f3e1H2o1O3p0f/robot.png"
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
                    {userData.user.name}
                  </h2>
                  <h3 className="text-center">{userData.user.currentStatus}</h3>
                </div>
              </div>

              <hr />
              <div className="d-flex flex-nowrap justify-content-around">
                <div> {userData.userData.length} posts </div>
                <div> 120 followers </div>
                <div> 90 following </div>
              </div>
              <hr />
              <br />
              {userData.userData.map((item) => {
                const buffer = item.image.data; // e.g., <Buffer 89 50 4e ... >
                const b64 = new Buffer(buffer).toString("base64");
                const mimeType = "image/jpg"; // e.g., image/png
                console.log(item);

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
                        <img
                          style={{ maxWidth: 300 }}
                          className=" img-fluid rounded bg-secondary"
                          alt="post image"
                          src={
                            !item.image.data
                              ? ""
                              : `data:${mimeType};base64,${b64}`
                          }
                        />
                        <br />
                      </div>
                      <div className="col flex-direction-column">
                        <span style={{ fontWeight: "bold" }}>created on =</span>
                        {item.timestamp} <br />
                        <span style={{ fontWeight: "bold" }}>Title = </span>
                        {item.title} <br />
                        <span style={{ fontWeight: "bold" }}>
                          description =
                        </span>
                        {item.description} <br />
                        <span style={{ fontWeight: "bold" }}> likes =</span>
                        {item.likes.length} <br />
                        <span style={{ fontWeight: "bold" }}>comments =</span>
                        {item.comments.length}
                      </div>

                      <IconButton aria-label="delete" onClick={()=>deletePost(item._id)} >
                        <DeleteIcon />
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
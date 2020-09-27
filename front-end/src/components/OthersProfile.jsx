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
    const userId= window.sessionStorage.getItem('userId');
    window.sessionStorage.removeItem('userId');
    axios({
      method: "get",
      url: `/user/other/profile/${userId}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((data) => {
        setUserData(data.data);
      })
      .catch((e) => history.push("/"));
  }, []);

  const classes = useStyles();
  const [follow, setFollow] = useState(true);


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
                   <small>Name: </small>{userData.user.name}
                  </h2>
                  <h3 className="text-center"><small>Current Position:</small> {userData.user.currentStatus}</h3>
                </div>
              </div>

              <hr />
              <div className="d-flex flex-nowrap justify-content-around">
                <div> <h3>{userData.userData.length} posts</h3> </div>
               
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
                        <span style={{ fontWeight: "bold" }}>Created on =</span>
                        {item.timestamp} <br />
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

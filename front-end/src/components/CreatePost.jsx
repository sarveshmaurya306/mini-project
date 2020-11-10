import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer.jsx";
import { useHistory } from "react-router-dom";
import Loading from "./Loading.jsx";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import CryptoJS from 'crypto-js'
import {cryptoPass} from './utils/crypto-js'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => ({
  cardHover: {
    boxShadow: "0px 3px 5px grey",
    borderRadius: 7,
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "auto",
    transform: "translate(-50%,-50%)",
    padding: "80px",
    transition: "0.4s all",
    "&:hover": {
      boxShadow: "grey 0px 0px 2px",
    },
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function CreatePost() {


  
const data={
  token: CryptoJS.AES.decrypt(sessionStorage.getItem('token'), cryptoPass).toString(CryptoJS.enc.Utf8),
  email: CryptoJS.AES.decrypt(sessionStorage.getItem('email'), cryptoPass).toString(CryptoJS.enc.Utf8),
}

  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [detail, setDetail] = useState({ title: "", description: "" });
  //sending post details
  const [photo, setPhoto] = useState(null);
  const setAvatar = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const sendPost = (e) => {
    e.preventDefault();
    toast.info("Please wait for a moment", {
      position: "bottom-left",
      autoClose: 4000,
    });
    const url = `http://127.0.0.1:4000`;
    const formData = new FormData();
    // const title= detail.title;
    // const description= detail.description;
    formData.append("file", photo);
    formData.append("upload_preset", "mini-project");
    formData.append("cloud_name", "dnwcamylp");

    !detail.title || !detail.description
      ? toast.warn("please provide some value", {
          position: "bottom-left",
          autoClose: 4000,
        })
      : fetch("https://api.cloudinary.com/v1_1/dnwcamylp/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            axios({
              method: "post",
              data: {
                imageUrl: data.url,
                title: detail.title,
                description: detail.description,
              },
              url: `${url}/user/createpost`,
              headers: {
                Authorization: "Bearer " + data.token,
              },
            })
              .then((res) => {
                toast.success("Post created", {
                  position: "bottom-left",
                  autoClose: 4000,
                });
                setDetail({ title: "", description: "", comment: "" });
                setPhoto(null);
              })
              .catch((e) =>
                toast.error("Post photo must be less than 1MB.", {
                  position: "bottom-left",
                  autoClose: 4000,
                })
              );
          })
          .catch((e) => {
            console.log(e)
            toast.warn("Pardon, server is not responding.", {
              position: "bottom-left",
              autoClose: 4000,
            });
          });

    /*!detail.title || !detail.description
			? toast.warn("please provide some value", {
					position: "bottom-left",
					autoClose: 4000,
			  })
			: axios({
					method: "post",
					url: `${url}/user/createpost`,
					data: formData,
					headers: {
						Authorization:
							"Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "multipart/form-data",
					},
			  })
					.then((res) => {
						toast.success("Post created", {
							position: "bottom-left",
							autoClose: 4000,
						});
						setDetail({ title: "", description: "", comment: "" });
						setPhoto(null)
					})
					.catch((e) =>
						toast.error("Post photo must be less than 3MB.", {
							position: "bottom-left",
							autoClose: 4000,
						})
					);
				*/
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `/checkuserauth`,
      headers: {
        Authorization: "Bearer " +data.token,
      },
    })
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => history.push("/"));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              height: "80vh",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <form
              autocomplete="off"
              className={`${classes.cardHover} col text-center`}
              onSubmit={sendPost}
            >
              <textarea
                type="text "
                className="mb-4 p-2"
                value={detail.title}
               /*  style={{
                  backgroundColor: "transparent",
                  border: "2px solid grey",
                  borderRadius: "8px",
                  fontWeight: "bolder",
                  color:'black'
                }} */
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid grey",
                  borderRadius: "8px",
                  fontWeight: "bolder",
                  maxHeight: "10vh",
                }}
                rows="2"
                cols="23"
                name="title"
                placeholder="Title "
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    title: e.target.value,
                  })
                }
              />
              <br />
              <textarea
                type="text "
                className="mb-4 p-2"
                value={detail.description}
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid grey",
                  borderRadius: "8px",
                  fontWeight: "bolder",
                  maxHeight: "35vh",
                }}
                rows="4"
                cols="23"
                name="description"
                placeholder="Description "
                onChange={(e) =>
                  setDetail({
                    ...detail,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <br />

              <input
                accept="image/*"
                className={`${classes.input}`}
                id="icon-button-file"
                type="file"
                name="postphoto"
                onChange={setAvatar}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  title="image should be less than 3mb"
                >
                  <PhotoCamera style={{ float: "left" }} />
                  <span style={{ color: "red" }}> * </span>
                </IconButton>
              </label>
              <br />
              <Button
                style={{ float: "left" }}
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !photo || !detail.title || !detail.description ? true : false
                }
              >
                Post
              </Button>
            </form>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

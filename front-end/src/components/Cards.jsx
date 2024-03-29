import React, { useState, useEffect } from "react";
import moment from "moment";
import Publicity from "./Publicity.jsx";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import { Button, Badge, Icon } from "@material-ui/core";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import AOS from "aos";
import "aos/dist/aos.css";

import CommentIcon from "@material-ui/icons/Comment";
import AddCommentIcon from "@material-ui/icons/AddComment";
import SendIcon from "@material-ui/icons/Send";
import BarChartIcon from '@material-ui/icons/BarChart';


import CryptoJS from 'crypto-js'
import { cryptoPass } from './utils/crypto-js'




import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    // transform: "rotate(0deg)",
    color: "",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    // transform: "rotate(180deg)",
    color: "blue",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHover: {
    boxShadow: "0px 2px 5px grey",
    borderRadius: 7,

    transition: "0.4s all",
    "&:hover": {
      boxShadow: "grey 0px 0px 2px",
    },
  },
}));

function Cards(props) {
  // console.log(props)
  // console.log(props.value.likes)
  // console.log(props.value, props.cuser)

  const data = {
    token: CryptoJS.AES.decrypt(sessionStorage.getItem('token'), cryptoPass).toString(CryptoJS.enc.Utf8),
    email: CryptoJS.AES.decrypt(sessionStorage.getItem('email'), cryptoPass).toString(CryptoJS.enc.Utf8),
  }


  const user = props.cuser;
  var x = false;

  useEffect(() => {
    const likedornot = props.value.likes.find((like) => like.like == user);
    x = likedornot;
    setIsLiked(x);
  }, [props]);

  const length = props.value.likes.length;
  // console.log(props.value.likes.find(like=>like.like==user));

  props.value.likes.find((like) => {
    if (like.like == user) {
      x = true;
      return;
    }
  });

  const [isLiked, setIsLiked] = useState(x);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log(props.value.data.likes)

  const likes = props.value.likes;

  const liked = { color: "red" };
  /* 
    const [showComment, setShowComment] = useState(false);
   */
  const comment = { color: "green" };

  const [userLikedComment, setUserLikedComment] = useState({
    like: x,
    comment: "",
  });

  const [commentValue, setCommentValue] = useState("");
  const [image, setImage] = useState("");

  //
  /*console.log(props.value);
  const deletePost = (e) => {
    const confirm = window.confirm("do you want to delete this?");
    return !confirm
      ? ""
      : axios({
          method: "delete",
          url: `/user/${e.target.key}/post`,
        });
  };*/

  let nochange = false;
  useEffect(() => {
    AOS.init({
      once: true,
    });
    // AOS.refresh();
  }, [props]);

  // console.log(props.value);

  const postLiked = () => {
    const url = `http://127.0.0.1:4000`;
    //if user isliking first time.
    if (!userLikedComment.like || !isLiked) {
      axios({
        method: "post",
        url: `${url}/user/${props.value._id}/inclike`,
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
        .then((r) => {
          // console.log(r);
          setIsLiked(true);
          setUserLikedComment({ ...userLikedComment, like: true });
        })
        .catch((e) => {
          setIsLiked(false);
          setUserLikedComment({ ...userLikedComment, like: false });
          // alert('you have already liked this post.')
        });
    } else {
      //user has already liked and trying to dislike it.

      axios({
        method: "delete",
        url: `${url}/user/${props.value._id}/declike`,
        headers: {
          Authorization: "Bearer " + data.token,
        },
      })
        .then((r) => {
          setIsLiked(false);
          setUserLikedComment({ ...userLikedComment, like: false });
          // console.log(r)
        })
        .catch((e) =>
          toast.warn("you have not like this post.", {
            position: "bottom-left",
            autoClose: 4000,
          })
        );
    }
  };
  // console.log(userLikedComment.comment + "\n " + commentValue);

  const [numberComment, setNumberComment] = useState(0);

  const sendComment = (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:4000`;
    axios({
      method: "post",
      url: `${url}/user/${props.value._id}/addcomment/${commentValue}`,
      data: commentValue,
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
      .then((r) => {
        setCommentValue("");
        setNumberComment((e) => e + 1);
        toast.success('comment has been added please refresh', {
          position: "bottom-left",
          autoClose: 4000,
        })

      })
      .catch((e) => {
        // console.log(e);
        toast.error("failed to post comment.", {
          position: "bottom-left",
          autoClose: 4000,
        });
      });
  };

  const avatarDp = props.value.ownername.split("");
  const avatarChar = avatarDp[0].toUpperCase();
  const time = parseInt(props.value.timestamp);
  // console.log(props.value.image)
  /*  const buffer = props.value.image.data; // e.g., <Buffer 89 50 4e ... >
  const b64 = new Buffer(buffer).toString("base64");
  const mimeType = "image/jpg"; // e.g., image/png */

  const [showChart, setShowChart] = useState(false);
  const showchart = () => {
    setShowChart(e => !e);
  };
  const hidechart = () => {
    setShowChart(false);
  };
  // console.log(props.totalUsers)
  return (
    <div className="my-4 container " data-aos="zoom-in"> {/*   */}
      {!showChart ? (
        ""
      ) : (
          <div
            style={{
              zIndex: " 1",
              /* position: relative; */
              position: "absolute",
              left: " 50%",
              top: "80%",
              transform: "translate(-50%,-50%)",

              background: 'none',
              backdropFilter: "blur(30px)",
              borderRadius: 10,
              boxShadow: " 0px 2px 5px grey",
            }}
            onDoubleClick={hidechart}
          >
            <IconButton
              aria-label="add to favorites"
              title="close"
              onClick={hidechart}
            >
              <CloseIcon />
            </IconButton>
            <Publicity
              totalComments={props.value.comments.length}
              totalLikes={props.value.likes.length}
              totalUsers={props.totalUsers}
            />
          </div>
        )}
      {console.log(props.value)}
      <Card className={`${classes.cardHover} `}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {avatarChar}
            </Avatar>
          }
          title={props.value.ownername}
          subheader={moment(time).format("dddd, Do MMMM YYYY, h:mm:ss a")}
        />

        <a href={props.value.image} target="_blank" rel="noopener noreferrer">
          <CardMedia
            className={classes.media}
            image={props.value.image}
            title="post image"
          />
        </a>

        <CardContent >
          <Typography variant="body2" color="textPrimary" component="p" >
            <h2>{props.value.title}</h2>
            <p> {props.value.description} </p>
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <div >
            <IconButton
              aria-label="add to favorites"
              onClick={postLiked}
              title="like"
            >
              <Badge
                style={{ zIndex: 0 }}
                color="secondary" badgeContent={props.value.likes.length}>
                <FavoriteIcon style={isLiked ? liked : {}} />
              </Badge>
            </IconButton>
          </div>

          {/* <IconButton
            aria-label="share"
            onClick={() => setShowComment((e) => !e)}
            title="comment"
          >
            <AddCommentIcon
              style={showComment || userLikedComment.comment ? comment : {}}
            />
          </IconButton> */}
          <IconButton onClick={showchart} title="publicity-chart">
            <BarChartIcon />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            title="show more"
          >
            <Badge
              style={{ zIndex: 0 }}
              color="secondary"
              badgeContent={props.value.comments.length + numberComment}
            >
              <CommentIcon />
            </Badge>
          </IconButton>
        </CardActions>

        {/* {!commentValue ? (
          ""
        ) : (
            <div className="container mb-4">
              <strong style={{ color: "skyblue" }}>you: </strong>
              {commentValue}
            </div>
          )} */}
        <form className="d-flex " style={{ backgroundColor: "transparent", }} onSubmit={sendComment} >
          <TextField
            id="outlined-textarea"
            placeholder="Comment..."
            style={{ width: "100%", backgroundColor: "transparent", padding: '20px 20px' }}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <Button variant="filled" type="submit" onClick={sendComment} style={{ background: 'white' }}>
            <SendIcon />
          </Button>
        </form>

        {/*
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
 */}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {props.value.comments.map((comment) => {
              return (
                <div className="container row">
                  <Typography
                    paragraph
                    className="row"
                    style={{ float: "left" }}
                  >
                    <strong style={{ color: "skyblue" }}>
                      {comment.commentowner} :
                    </strong>
                    <p> {comment.comment}</p>
                  </Typography>
                </div>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

// export default Cards
export default Cards;

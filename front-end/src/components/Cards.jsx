import React, { useState, useEffect } from "react";

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
import { Button,Badge } from "@material-ui/core";
import axios from "axios";
// import {Paper} from '@material-ui/core'

import AOS from "aos";
import "aos/dist/aos.css";

import CommentIcon from "@material-ui/icons/Comment";
import AddCommentIcon from "@material-ui/icons/AddComment";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    color:'',
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    // transform: "rotate(180deg)",
    color:'blue'
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Cards(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [isLiked, setIsLiked] = useState(false);
  // const likes=props.value.likes

  const liked = { color: "red" };

  const [showComment, setShowComment] = useState(false);

  const comment = { color: "green" };

  const [userLikedComment, setUserLikedComment] = useState({
    like: false,
    comment: "",
  });

  const [commentValue, setCommentValue] = useState("");
  const [image, setImage]=useState('')

  //
  console.log(props.value);
    const deletePost=(e)=>{
                const confirm=window.confirm('do you want to delete this?');
                return !confirm?'':axios({
                  method:'delete',
                  url:`/user/${e.target.key}/post`
                })
              }
  useEffect(() => {
    AOS.init({
      duration: 2500,
      refresh: true,
      dataOffset: 200,
      once: true,
    });
    AOS.refresh();
  }, []);

const postLiked=()=>{
  const url=`http://127.0.0.1:4000`
    axios({
      method:'post',
      url:`${url}/user/${props.value._id}/inclike`,
       headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then(r=>{ 
      setIsLiked((e) => !e);
      setUserLikedComment({ ...userLikedComment, like: !isLiked });
    }).catch(e=>console.log(e)) 
}

  const avatarDp= props.value.ownername.split('');
  const avatarChar=avatarDp[0]
  // console.log(props.value)
    const buffer = props.value.image.data; // e.g., <Buffer 89 50 4e ... >
    const b64 = new Buffer(buffer).toString("base64");
    const mimeType = "image/jpg"; // e.g., image/png

  return (
    <div className="my-4 container" data-aos="zoom-in">
      <Card  >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {avatarChar}
            </Avatar>
          }
          action={
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
          title={props.value.ownername}
          subheader={props.value.timestamp}
        />

        <CardMedia
          className={classes.media}
          image={`data:${mimeType};base64,${b64}`}
          title="post image"
        />
        

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <h2>{props.value.title}</h2>
            <p> {props.value.description} </p>
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={postLiked}
            title="like"
          >
           <Badge color="secondary" badgeContent={!isLiked?props.value.likes.length:props.value.likes.length+1} >
            <FavoriteIcon style={isLiked ? liked : {}} />
           </Badge>
          </IconButton>

          <IconButton
            aria-label="share"
            onClick={() => setShowComment((e) => !e)}
            title="comment"
          >
            <AddCommentIcon
              style={showComment || userLikedComment.comment ? comment : {}}
            />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            
            <CommentIcon />

          </IconButton>
 

        </CardActions>

        {!userLikedComment.comment ? (
          ""
        ) : (
          <div className="container mb-4">
            you: <strong>{userLikedComment.comment}</strong>
          </div>
        )}
        {showComment ? (
          <div className="d-flex " style={{ backgroundColor: "transparent" }}>
            <TextField
              id="outlined-textarea"
              placeholder="Comment..."
              multiline
              variant="filled"
              style={{ width: "100%", backgroundColor: "transparent" }}
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                setUserLikedComment({
                  ...userLikedComment,
                  comment: commentValue,
                });
                setShowComment(false);
              }}
            >
              
              <SendIcon />
            </Button>
          </div>
        ) : (
          ""
        )}
        
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
            <Typography paragraph style={{float:'left',fontWidth:"bolder"}}>Comments:</Typography><br/>
            {
              props.value.comments.map(comment=>{
               return <Typography paragraph>
                 <strong>user says:</strong> { comment.comment}
                </Typography>
              })
            }
            
          </CardContent>
        </Collapse>
      
      </Card>
    </div>
  );
}

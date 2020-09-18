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
import { Button } from "@material-ui/core";
import axios from "axios";

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
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Cards() {
  const props = {
    value: { title: "this is title", description: "this is description" },
  };
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const [isLiked, setIsLiked] = useState(false);

  const liked = { color: "red" };

  const [showComment, setShowComment] = useState(false);

  const comment = { color: "green" };

  const [userLikedComment, setUserLikedComment] = useState({
    like: false,
    comment: "",
  });

  const [commentValue, setCommentValue] = useState("");
  // const [image, setImage]=useState('')

  //
  console.log(props.value);
  /*  const deletePost=(e)=>{
                const confirm=window.confirm('do you want to delete this?');
                return !confirm?'':axios({
                  method:'delete',
                  url:`/user/${e.target.key}/post`
                })
              }*/
  useEffect(() => {
    AOS.init({
      duration: 2500,
      refresh: true,
      dataOffset: 200,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="my-4 container" data-aos="zoom-in">
      <Card style={{}}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              S
            </Avatar>
          }
          action={
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
          title="Sarvesh Kumar"
          subheader="September 14, 2016"
        />

        <CardMedia
          className={classes.media}
          image="https://f.v1.n0.cdn.getcloudapp.com/items/0L2l2K3f3e1H2o1O3p0f/robot.png"
          title="Paella dish"
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
            onClick={() => {
              setIsLiked((e) => !e);
              setUserLikedComment({ ...userLikedComment, like: !isLiked });
            }}
            title="like"
          >
            <FavoriteIcon style={isLiked ? liked : {}} />
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

          <IconButton>
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
              {" "}
              <SendIcon />{" "}
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
 
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      */}
      </Card>
    </div>
  );
}

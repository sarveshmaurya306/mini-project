import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonIcon from "@material-ui/icons/Person";

import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import {Avatar } from '@material-ui/core'
import {Button} from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));



export default function Myprofile() {
  const history = useHistory();

  const [userData, setUserData] = useState("");
  const [profile, setProfile]= useState();
  useEffect(() => {
    const url = `http://127.0.0.1:4000`;
    axios({
      method: "post",
      url: "/user/getpost",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((data) => {  setUserData(data.data)})
      .catch((e) => history.push("/"));

    axios({
      method:'get',
      url:'/user/getavatar',
      headers:{
        Authorization:'Bearer '+ sessionStorage.getItem('token')
      }
    }).then(res=>{console.log();setProfile(res.data.toString('base64'))}).catch(e=>console.log(e))

  }, []);

  const classes = useStyles();


  const [photo, setPhoto] = useState(null);
  const setAvatar=(e)=> {
                    const file=e.target.files[0];
                    setPhoto(file)
                  }  

const sendAvatar=(e)=>{
  e.preventDefault();
  const formData= new FormData();
  formData.append('photo',photo)
     axios({
          method:'post',
          url:'/user/avatar',
          data:formData,
          headers:{
            Authorization:"Bearer "+sessionStorage.getItem('token'),
            'content-type':'multipart/form-data'
          }
        }).then(r=>alert('profile picture updated...')).catch(e=>alert('something went wrong please try again...'))
}
  // console.log(userData.user._id);
  return (
    <div className="container-md">
      {!userData ? (
        ""
      ) : (
        <div>
          <div
            className="d-flex py-5 justify-content-around flex-wrap "
            style={{ alignItems: "baseline" }}
          >
            <div className={`img-fluid ${classes.root}` } >
               {/* <PersonIcon
                className="rounded-circle bg-secondary p-2"
                style={{ width: 100, height: 100 }}
              />*/}
              <img className="rounded-circle bg-secondary " src={!userData.user._id?'':`http://127.0.0.1:4000/user/${userData.user._id}/getavatar`

            } width="180" height="180" /><br/>

               

                  <form 
                  onSubmit={sendAvatar}
                  method="post"       
                  style={{display:'flex', alignItems:'baseline'}}           
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
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />

                  </IconButton>
                </label>
                  <Button disabled={!photo?true:false} variant="outlined" type="submit"> upload </Button>
                </form>

               

            </div>

            <div>
              <h2 className="text-center " style={{ fontWeight:'bold'}}>{userData.user.name}</h2>
              <h3 className="text-center">{userData.user.currentStatus}</h3>
            </div>

          </div>

          <hr />
            <div className="d-flex flex-nowrap justify-content-around">

              <div> {userData.userData.length} posts </div>
              <div> 120 followers </div>
              <div> 90 following </div>

             </div>
          <hr /><br />
          {
              userData.userData.map((item) => {
                console.log(item)
              return (<div>
                <div className='p-2' style={{border:'1px dotted grey'}} >
                  <span style={{ fontWeight:'bold', }} >Title = </span  > {item.title} <br/>
                  <span style={{ fontWeight:'bold', }} >description = </span  > {item.description} <br/>
                  <span style={{ fontWeight:'bold', }} > created on = </span  > {item.timestamp} <br/>
                  
                </div>
                <hr />
                </div>
              );
            })
          }


          


        </div>
      )}
      
    </div>
  );
}

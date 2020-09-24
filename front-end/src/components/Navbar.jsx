import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Menu, MenuItem, InputBase, IconButton, Toolbar, AppBar} from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu';

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import mainLogo from "../images/Logo.png";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CancelIcon from '@material-ui/icons/Cancel';
// import {IconButton} from '@material-ui/icons'

// import { Icon } from '@material-ui/core';
import { Button } from "@material-ui/core";
import axios from "axios";
import { Link} from "react-router-dom";

import ForumIcon from "@material-ui/icons/Forum";

// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navColor: {
    backgroundColor: "#00d5ff86",
    // backgroundColor:'transparent',
    backdropFilter: "blur(8px)",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoResponsive: {
    [theme.breakpoints.down("sm")]: {
      width: 110,
      height: 40,
      marginLeft: -40,
    },
  },
  allBlack: {
    backgroundColor: "black",
    color: "white",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      // backgroundColor: '#000',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  const [searchUser, setSearchUser] = useState("");
  const [result, setResult] = useState()
  // const history = useHistory();

  // const [status, setStatus] = useState(true);

  const search=(search) => {
                const user = searchUser;
                axios
                  .get(`http://localhost:4000/show/${user}`)
                  .then(d => {d.data.length===0? setResult('') : setResult(d) })
                  .catch(e => alert('connection failed'))
              }
  /*  useEffect(()=>{
    
    axios({
      method: 'POST',
      url: "/home",
      headers: {
        Authorization: localStorage.token
      },
    })
    .then(res=>{setStatus(true); }).catch(e=>{setStatus(false);history.push("/")})

  },[])*/

/*  React.useEffect(()=>{
    window.addEventListener('click',()=>{

      setResult();
    })
  },[result])

*/

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    window.localStorage.removeItem("token");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile">
        {" "}
        <MenuItem style={{color:'black', textDecoration:'none'}} onClick={handleMenuClose}>Profile</MenuItem>{" "}
      </Link>
      <Link to="/">
        {" "}
        <MenuItem style={{color:'black', textDecoration:'none'}} onClick={()=>{ handleMenuClose(); window.sessionStorage.removeItem('token')}}>Log Out</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <Router> */}
      <Link to="/home">
        <MenuItem style={{display:'flex', alignItems:'baseline', color:'black', textDecoration:'none' }}>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </Link>
      {/* </Router> */}

      <Link to="/chat">

          <MenuItem style={{display:'flex',color:'black', textDecoration:'none' }}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <ForumIcon />
              </IconButton>
              <p style={{ marginBottom:0}} >chat</p>
         </MenuItem>


      </Link>
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
         <Badge badgeContent={11} color="secondary">
                     
            </Badge> 
          <NotificationsIcon />
        </IconButton>  


        <p>Notifications</p>
      </MenuItem>
      */}
      <Link to="createpost">
        <MenuItem style={{display:'flex', color:'black', textDecoration:'none' }}>
          <IconButton  >
            <PostAddIcon />
          </IconButton>
          <p style={{ marginBottom:0}} >create post</p>
        </MenuItem>
      </Link>

      <MenuItem onClick={handleProfileMenuOpen} style={{display:'flex', color:'black', textDecoration:'none' }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p style={{ marginBottom:0}} >Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className={`${classes.grow} `}>
        <AppBar position="fixed" className={classes.navColor}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Link to="/home">
              <img
                src={mainLogo}
                alt="logo"
                className={classes.logoResponsive}
                height="40px"
                width="auto"
                style={{ marginTop:5 }}
              />
            </Link >

            {/* <Typography className={classes.title} noWrap>
          </Typography> */}
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                onChange={(val) => {
                  setSearchUser(val.target.value);
                }}
                style={{ color: "black", padding: "3px 10px" }}
                inputProps={{ "aria-label": "search" }}
              />
             {/* <CancelIcon  style={{color:'black'}} onClick={()=>{
                setSearchUser('');
                return ;
              }} />*/}

            </div>
            <Button
              variant="outlined"
              color="primary"
              style={{ border: "1px solid black" }}
              onClick={search}
            >
              <SearchIcon style={{ color: "black" }} />
            </Button>
            
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" title="home">
                {/* <Router> */}
                <Link to="/home">
                  <HomeIcon style={{ color: "black", fontSize: 28 }} />
                </Link>
                {/* </Router> */}
              </IconButton>

              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                title="chat"
              >
                <Link to="/chat">
                  {" "}
                  <ForumIcon style={{ color: "black" }} />{" "}
                </Link>
              </IconButton>

              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                title="create post"
              >
                <Link to="/createpost">
                  {" "}
                  <PostAddIcon style={{ color: "black" }} />{" "}
                </Link>
              </IconButton>

              {/*
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <NotificationsIcon style={{color:'black'}}/>
            </IconButton>
            */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                title="profile"
              >
                <AccountCircle style={{ color: "black" }} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon style={{ color: "black" }} />
              </IconButton>
            </div>
          </Toolbar>


        {/* to be noted */}
          {
            !result?"":<div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'48px'}} >  <IconButton color="secondary" onClick={()=>{
              setResult('');
            }}>  <CancelIcon style={{color:'black'}}  />  </IconButton></div>
          }
          {

            !result?'':result.data.map(item => {
              console.log(item)
              return <Link to='/other/profile' key={item._id} className="container-fluid " style={{ margin:"20px 0px", }}>
                  <div className="d-flex justify-content-around flex-wrap " style={{ alignItems: "baseline"}} >
                    <Paper elevation= {2} className="p-3" style={{width:'90vw'}} >  
                      <img className="rounded-circle bg-secondary " alt="profile pic" src={!item.avatar?'https://f.v1.n0.cdn.getcloudapp.com/items/0L2l2K3f3e1H2o1O3p0f/robot.png':`http://127.0.0.1:4000/user/${item._id}/getavatar`} width="50" height="50" />
                      <span className='p-4'> {item.name} is a {item.currentStatus}.  </span>
                    </Paper>
                </div>
              </Link>
            })
          }
        </AppBar>
        {renderMobileMenu}
        {renderMenu}


        <br />
        <br />
        
      </div>
    </div>
  );
}

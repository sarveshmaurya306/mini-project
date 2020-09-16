import React,{useState, useEffect} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';

import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import mainLogo from '../images/Logo.png'
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';

// import { Icon } from '@material-ui/core';
import {Button } from '@material-ui/core'
import axios from 'axios'
import {Link,Router} from 'react-router-dom'


import ForumIcon from '@material-ui/icons/Forum';

import  { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    navColor:{
        backgroundColor:'#00d5ff86',
        // backgroundColor:'transparent',
        backdropFilter:'blur(8px)'
    },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },  
  logoResponsive:{
    [theme.breakpoints.down('sm')]: {
      width: 110,
      height: 40,
      marginLeft: -40,  
    },
  } ,
  allBlack:{
    backgroundColor:'black',
    color:'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      // backgroundColor: '#000',

    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar() {
  const [searchUser,setSearchUser] =useState('');
  const history= useHistory();

  const [status, setStatus]=useState(true)
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
    window.localStorage.removeItem('token');
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile"> <MenuItem onClick={handleMenuClose}>Profile</MenuItem> </Link>
      <Link to="/"> <MenuItem onClick={handleMenuClose}>Log Out</MenuItem></Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <Router> */}
      <Link to="/home">
        <MenuItem>
          <IconButton color="inherit">
              <HomeIcon/>
          </IconButton>
              <p>Home</p>
        </MenuItem>
      </Link>
      {/* </Router> */}

      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
            {/* //! */}
          
            <ForumIcon  />
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
         <Badge badgeContent={11} color="secondary">
                     
            </Badge> 
          <NotificationsIcon />
        </IconButton>  


        <p>Notifications</p>
      </MenuItem>
      */}
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
            {/* //! */}
          
            <PostAddIcon  />
        </IconButton>
        <p>Add post</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      
    <div className={`${classes.grow} `}>
      <AppBar position="fixed" className={classes.navColor}>
        <Toolbar >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <img src={mainLogo} alt="logo" className={classes.logoResponsive} height='40px' width='auto' />

          {/* <Typography className={classes.title} noWrap>
          </Typography> */}
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              onChange={(val)=>{
                  setSearchUser(val.target.value);
                  console.log(searchUser)
              }}
              style={{color:'black',padding:'3px 10px'}}
              inputProps={{ 'aria-label': 'search' }}
              
            />


          </div>
              <Button variant="outlined" color="primary" style={{border:"1px solid white"}} onClick={
                (search)=>{
                const user =searchUser;
                console.log(user)
                axios.get(`http://localhost:4000/show/${user}`).then(d=>setSearchUser(d.data[0]));
              }
              }><SearchIcon style={{color:'black',}}/></Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton color="inherit" title="home">
                {/* <Router> */}
                  <Link to="/home">
                   <HomeIcon style={{color:'black',fontSize:28}}/> 
                  </Link>
                {/* </Router> */}
            </IconButton>
            
            <IconButton aria-label="show 4 new mails" color="inherit" title="chat">
              <Link to="chat" > <ForumIcon  style={{color:'black'}}/> </Link>
            </IconButton>

            <IconButton aria-label="show 4 new mails" color="inherit" title="create post">
              <Link to="/createpost" > <PostAddIcon  style={{color:'black'}}/> </Link>
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
              <AccountCircle style={{color:'black'}}/>
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
              <MoreIcon style={{color:'black'}}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
       <br/><br/>
      {/*<h1>Searched User Details...</h1><br/><br/><br/>
            <div>{ !searchUser?'No user found by this name':<div><h3>name :- </h3>{searchUser.name}<br/><br/>  <h3>email :-</h3>{searchUser.email}<br/><br/> <h3>password :-</h3>{searchUser.password}<br/><br/> </div>}</div>
      <br/><br/><br/>*/}
    </div>

    </div>
  );
}

import React, { useEffect, useState } from "react";

import Pagination from "@material-ui/lab/Pagination";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Loading from "./Loading.jsx";
import HomeImage from '../images/home.jpg'

import CryptoJS from 'crypto-js'
import {cryptoPass} from './utils/crypto-js'

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Home() {
  
  const data={
    token: CryptoJS.AES.decrypt(sessionStorage.getItem('token'), cryptoPass).toString(CryptoJS.enc.Utf8),
    email: CryptoJS.AES.decrypt(sessionStorage.getItem('email'), cryptoPass).toString(CryptoJS.enc.Utf8),
  }

  // const token = sessionStorage.getItem('token')
  // const email= sessionStorage.getItem('email')

  const classes = useStyles();
  const history = useHistory();
  const [posts, setPosts] = useState(false);
  const [user, setUser] = useState("");
  const [tuser, setTuser] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const url = `http://127.0.0.1:4000`;
    axios({
      method: "get",
      url: `${url}/user/getpostbysorting/${value}/5/${sortBy}`,
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
      .then((res) => {
        setUser(res.data.Id);
        setPageCount(Math.ceil(res.data.count / 5));
        setPosts(res.data.posts);
        setTuser(res.data.totalUsers)

      })
      .catch((e) => {
        history.push("/");
      });
  }, []);

  const [value, setValue] = useState(1);

  const nextPage = (e, xvalue) => {
    // console.log(xvalue)

    const url = `http://127.0.0.1:4000`;
    axios({
      method: "get",
      url: `${url}/user/getpostbysorting/${value}/5/${sortBy}`,
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
      .then((res) => {
        window.scrollTo(0, 0);
        setPosts(res.data.posts);
        setValue(xvalue);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [sortBy, setSortBy] = useState(sessionStorage.getItem("sortBy"));

  useEffect(() => {
    // console.log(sortBy)
    const url = `http://127.0.0.1:4000`;
    axios({
      method: "get",
      url: `${url}/user/getpostbysorting/${value}/5/${sortBy}`,
      headers: {
        Authorization: "Bearer " +data.token,
      },
    })
      .then((res) => {
        window.scrollTo(0, 0);
        setPosts(res.data.posts);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [sortBy, value]);

  const handleSorting = (e) => {
    setSortBy(e.target.value);
    sessionStorage.setItem("sortBy", e.target.value);
    // console.log(e.target.value)
  };

  return (
    <div style={{
      
    }}>
      {!posts ? (
        <Loading />
      ) : (
          <div>
            {
              // <select
              //   name="sort"
              //   value={sortBy}
              //   onChange={handleSorting}
              //   id=""
              //   className="mt-5"
              //   style={{position:'fixed'}}
              // >
              //   <option value="date">date</option>
              //   <option value="publicity">publicity</option>
              //   {/* <option value="date&publicity">date&publicity</option> */}
              // </select>
              <div className="container-fluid ">

                <FormControl className={`${classes.margin} mt-5`} style={{
                  position: "fixed", zIndex: 5, fontWeight: "bolder" 
                }}>
                  <InputLabel id="demo-customized-select-label">
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={sortBy}
                    onChange={handleSorting}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="publicity">Reach</MenuItem>
                  </Select>
                </FormControl>
              </div>
            }
            <div className="container">
              <div className=" col-md-8 col-auto">
                {!posts
                  ? ""
                  : posts.map((post) => {
                    // console.log(post)
                    // console.log(post);
                    return (
                      <div className=" d-flex flex-md-nowrap flex-wrap justify-content-between">
                        <div className="text-center w-100">
                          <Cards value={post} cuser={user} totalUsers={tuser} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="col-md-offset-4 col-0"> </div>
            </div>
            {/*
        <div className="d-flex flex-md-nowrap flex-wrap justify-content-between">
          <Cards />
        </div>

        <div className="d-flex flex-md-nowrap flex-wrap justify-content-between">
          <Cards />
        </div>

        <div className="d-flex flex-md-nowrap flex-wrap justify-content-between">
          <Cards />
        </div>
            <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
              <MyApp />
            </SnackbarProvider>*/}
            <div className="d-flex justify-content-center">
              <Pagination
                count={pageCount}
                className="text-center"
                onChange={nextPage}
                variant="outlined"
                color="primary"
              />
            </div>

            <Footer />
          </div>
        )}
    </div>
  );
}

export default Home;
// React.memo

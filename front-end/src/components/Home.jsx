import React, { useEffect, useState } from "react";

// import backgroundImg from "../images/back.png";

import { SnackbarProvider, useSnackbar } from 'notistack';
import Pagination from "@material-ui/lab/Pagination";

import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Button} from '@material-ui/core'
// import {Skeleton} from '@material-ui/lab'
import Loading from "./Loading.jsx";



function Home() {
  // const [status, setStatus] = useState(false);
  // const [userData, setUserData] = useState();
  const history = useHistory();
  // const [loading, setLoading]= useState(true);
  const [posts, setPosts] = useState(false);
  // const [user,setUser]=useState();
  const [user,setUser]=useState('');

  const [pageCount, setPageCount] =useState(1);

  useEffect(() => {
    const url = `http://127.0.0.1:4000`;
    axios({
      method: "get",
      url: `${url}/user/getallpost/1/5`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setUser(res.data.Id);
        setPageCount(Math.ceil(res.data.count/5))
        setPosts(res.data.posts);
        // user=res.data.Id;
      })
      .catch((e) => {history.push("/")});
  }, []);

  const nextPage=(e, value) => {      
      axios({
          method: "get",
          url: `/user/getallpost/${value}/5`,
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
      }).then((res) => {
        window.scrollTo(0, 0);   
        setPosts(res.data.posts);
      })
      .catch((e) => {alert('please try again ')});
  }

  // console.log(user);
  return (
    <>
      {!posts ? (
        <Loading />
      ) : (
        <div>
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
                          <Cards value={post} cuser={user}/>
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
              shape="rounded"
              className="text-center"
              onChange={nextPage}
            />
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;

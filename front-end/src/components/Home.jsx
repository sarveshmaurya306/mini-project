import React, { useEffect, useState } from "react";

// import backgroundImg from "../images/back.png";

import Pagination from "@material-ui/lab/Pagination";

import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useHistory } from "react-router-dom";

// import {Skeleton} from '@material-ui/lab'
import Loading from "./Loading.jsx";

function Home() {
  // const [status, setStatus] = useState(false);
  // const [userData, setUserData] = useState();
  const history = useHistory();
  // const [loading, setLoading]= useState(true);
  const [posts, setPosts] = useState(false);

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
        setPageCount(Math.ceil(res.data.count/5))
        setPosts(res.data.posts);
      })
      .catch((e) => {alert('please try again')});
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

  console.log(posts);
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
                    console.log(post);
                    return (
                      <div className=" d-flex flex-md-nowrap flex-wrap justify-content-between">
                        <div className="text-center w-100">
                          <Cards value={post} />
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
        </div>*/}

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

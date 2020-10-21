import React, { useEffect, useState } from "react";

// import backgroundImg from "../images/back.png";

import Pagination from "@material-ui/lab/Pagination";

import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
// import {Skeleton} from '@material-ui/lab'
import Loading from "./Loading.jsx";

function Home() {
  // const [status, setStatus] = useState(false);
  // const [userData, setUserData] = useState();
  const history = useHistory();
  // const [loading, setLoading]= useState(true);
  const [posts, setPosts] = useState(false);
  // const [user,setUser]=useState();
  const [user, setUser] = useState("");

  const [pageCount, setPageCount] = useState(1);

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
        setPageCount(Math.ceil(res.data.count / 5));
        setPosts(res.data.posts);
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
        Authorization: "Bearer " + sessionStorage.getItem("token"),
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
        Authorization: "Bearer " + sessionStorage.getItem("token"),
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
    <>
      {!posts ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            {
              <select
                name="sort"
                value={sortBy}
                onChange={handleSorting}
                id=""
                className="mt-5"
              >
                <option value="date">date</option>
                <option value="publicity">publicity</option>
                {/* <option value="date&publicity">date&publicity</option> */}
              </select>
            }
            <div className=" col-md-8 col-auto">
              {!posts
                ? ""
                : posts.map((post) => {
                    // console.log(post)
                    // console.log(post);
                    return (
                      <div className=" d-flex flex-md-nowrap flex-wrap justify-content-between">
                        <div className="text-center w-100">
                          <Cards value={post} cuser={user} />
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
    </>
  );
}

export default Home;
// React.memo

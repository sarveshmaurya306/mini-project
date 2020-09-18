import React, { useEffect, useState } from "react";

import backgroundImg from "../images/back.png";

import Pagination from "@material-ui/lab/Pagination";

import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function RecipeReviewCard() {
  const [status, setStatus] = useState(false);
  const [userData, setUserData] = useState();
  const history = useHistory();

  useEffect(() => {
    const url = `http://127.0.0.1`;
    axios({
      method: "POST",
      url: `/home`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => setStatus(true))
      .catch((e) => history.push("/"));
    /*
    axios({
      method:'GET',
      url:"/user/5f60f1b8a808a1158564e1ef/post",

    }).then(buf=>setUserData(buf.data))
    .catch(e=>console.log(e))
*/
  }, []);
  return (
    <>
      <div className="container">
        <div className="d-flex flex-md-nowrap flex-wrap justify-content-between">
          <Cards />
          <Cards />
        </div>

        <div className="d-flex flex-md-nowrap flex-wrap justify-content-between">
          <Cards />
          <Cards />
        </div>

        <div className="d-flex flex-md-nowrap flex-wrap justify-content-between">
          <Cards />
          <Cards />
        </div>

        <div className="d-flex flex-md-nowrap flex-wrap justify-content-between">
          <Cards />
          <Cards />
        </div>
        {/**/}
        <div className="d-flex justify-content-center">
          <Pagination
            count={10}
            shape="rounded"
            className="text-center"
            onChange={(e, value) => {
              console.log(value);
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

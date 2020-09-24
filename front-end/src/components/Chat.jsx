import React, { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Chat() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axios({
      method: "get",
      url: `/checkuserauth`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoading(false);
      })
      .catch((e) => history.push("/"));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>this is chat page</h1>
        </div>
      )}
    </>
  );
}

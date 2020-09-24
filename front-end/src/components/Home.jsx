import React, { useEffect, useState} from "react";

// import backgroundImg from "../images/back.png";

import Pagination from "@material-ui/lab/Pagination";

import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { useHistory } from "react-router-dom";

// import {Skeleton} from '@material-ui/lab'
import Loading from './Loading.jsx'

function Home() {
  // const [status, setStatus] = useState(false);
  // const [userData, setUserData] = useState();
  const history = useHistory();
  // const [loading, setLoading]= useState(true);
  const[posts, setPosts]=useState(false);

  useEffect(() => {
    const url=`http://127.0.0.1:4000`
    axios({
      method: "get",
      url: `${url}/user/getallpost`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) =>{ setPosts(res) })
      .catch((e) => {});

  }, []);
  console.log(posts)
  return (<>

    {!posts?<Loading/> :<div> 
    <div className="container">
     <div className=" col-md-8 col-auto"> 
        {
          !posts.data?"":posts.data.map((post)=>{
             console.log(post)
             return <div className=" d-flex flex-md-nowrap flex-wrap justify-content-between">
           
              <div className="text-center w-100">
                <Cards value={post} />
              </div>
              
            
            </div>
        
          })
        }
        
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
            count={10}
            shape="rounded"
            className="text-center"
            onChange={(e, value) => {
              // console.log(value);
              window.scrollTo(0, 0);
            }}
          />
        </div>
   
       <Footer />

      </div>
    }

    
  </>);
}

export default Home;

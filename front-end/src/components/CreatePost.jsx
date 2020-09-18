import React, {useState} from 'react';
import axios from 'axios'

import CreatePostImg from '../images/createpost.svg'


export default function CreatePost(){

	const [detail, setDetail] = useState({title:'', description:''})
      const sendPost=(e)=>{
      	e.preventDefault();
      	(!detail.title || !detail.description)?alert('please provide some value'):axios({
      		method:'post',
      		url:'/user/createPost',
      		data: detail,
      		headers: {
		      Authorization: "Bearer " + sessionStorage.getItem("token"),
		    },
      	})
      	.then(res=>{alert('Post created'); setDetail({title:'',description:''})})
      	.catch(e=>alert('please try again...'))
      }

	return (<>
		
		<div className="row" >
			{/*<div className="col" style={{background:`url(${CreatePostImg})`,height:'100vh',width:'100vw', backgroundRepeate:'no-repeate', backgroundPostion:'center', backgroundSize:'contain'}}> 
				
			</div>
			*/}
			<form className="col" onSubmit={sendPost}>

				<input type='text ' name='title' placeholder="title " onChange={(e)=>setDetail({...detail,  title:e.target.value})} /><br/>
				<input type='text ' name='description' placeholder="description " onChange={(e)=>setDetail({...detail,  description:e.target.value})} /><br/>
				<input type='submit' value='post' />
			</form>


		</div>
		</>)
}
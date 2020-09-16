import React,{useState, useEffect} from 'react';
import axios from 'axios';
import PersonIcon from '@material-ui/icons/Person';

import  { useHistory } from 'react-router-dom'



export default function Myprofile(){
	const history= useHistory();

	const [userData, setUserData]=useState('');

	useEffect(()=>{
		const url=`http://127.0.0.1:4000`;
		axios({
	      method: 'post',
	      url:'/user/getpost',
	      headers: {
	        Authorization:"Bearer "+sessionStorage.getItem('token')
	      }
    }).then(data=>setUserData(data.data)).catch(e=>history.push('/'))

	},[])

	return (
	<div className="container">
		{
			!userData?'':<div>  


				<div className="d-flex justify-content-around flex-wrap " style={{alignItems:'baseline'}} >
					<div className="img-fluid "  >
						<PersonIcon className="rounded-circle " style={{width:100, height:100}} />
					</div>
					<div>
						<h2 className="text-center ">{userData.user.name}</h2>
					</div>
				</div>
				<hr/ >
				{
					userData.userData.map(item=>{
						return(
						<div>
							<p>{item.title}</p>
							<p>{item.description}</p>
							<p>created on {item.createdAt}</p>
							<hr />
						</div>
						)
					})
				}



			</div>
		}
	</div>)
}
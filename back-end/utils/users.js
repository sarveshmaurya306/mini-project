const users=[];

//adduser , removeuser, getuser, getusersinroom

const addUser=({ id, username, room })=>{
	const ispresent=users.find((user)=>user.id===id)

	if(!ispresent){
		const user= {id, username, room};
		users.push(user)
		return {user}	
	}
	const index=users.findIndex(user=>user.id===id);
	if(index!=-1){
		const user=users.splice(index,1)[0];
		user.room=room;
		return user;
	}
}

const removeUser=(id)=>{
	const index=users.findIndex(user=>user.id===id);
	if(index!==-1){
		return users.splice(index,1)[0] //[{id:' ',name:' ',room:' '}]
	}
}

const getUser=(id)=>{
	const user=users.find(user=>user.id===id); //undefined if not match
	console.log(user)
	return user;
}

const getUserInRoom=(room)=>{
	return users.filter((user)=>user.room===room)
}

const setUserInRoom=(id, username, room)=>{
	const user= users.find((user)=>user.id===id);
	if(!user){
		return addUser({id, username, room});
	}
	user.room=room
	return user;
}
module.exports={
	addUser,
	getUserInRoom,
	removeUser,
	setUserInRoom,
	getUser,
}
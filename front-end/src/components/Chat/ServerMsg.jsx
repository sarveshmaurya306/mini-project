import React from 'react'

export default function ServerMsg(props){

	console.log(props.msg)
	return(<>
			{
				props.msg.map(message=><div><p>{props.msg}</p><br /></div>)
			}
		

		</>)
}
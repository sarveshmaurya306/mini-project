const mongoose =require('mongoose');

const postSchema= mongoose.Schema({
	title:{
		type:String,
		// required:true,
		trim:true,
	},

	description:{
		type:String,
		trim:true,
	},

	image:{
		type:Buffer,
	}, 

	owner:{
		type:mongoose.Schema.Types.ObjectId,
		required:true,
		ref:'User' //for tast user relationship
	}

}, {
	timestamps:true
})



const Post = mongoose.model("Post", postSchema);

module.exports=Post;
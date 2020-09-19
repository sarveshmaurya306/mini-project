const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
	title: {
		type: String,
		// required:true,
		trim: true,
	},

	description: {
		type: String,
		trim: true,
		// required:true,
	},

	image: {
		type: Buffer,
	},

	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User' //for tast user relationship
	},
	timestamp: {
		type:String, 
		default: new Date().toJSON().slice(0,10).replace(/-/g,'/')
	},
	like:{
		type:Number,
		default:0,
	},
	comments:[{
		comment:{
			type:String,
			trim:true,
		}
	}]
})



const Post = mongoose.model("Post", postSchema);

module.exports = Post;
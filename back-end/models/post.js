const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
	title: {
		type: String,
		// required:true,
		trim: true,
	},

	description: {
		type: String,
	},

	image: {
		type: String,
		require:true,
	},
	ownername: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User", //for tast user relationship
	},
	timestamp: {
		type: Number,
	},
	likes: [
		{
			like: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			}
		},
	],
	totalLikes: {
		type : Number,
		default: 0
	},
	comments: [
		{
			comment: {
				type: String,
			},
			commentowner: {
				type: String,
			},
		},
	],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

// default: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),

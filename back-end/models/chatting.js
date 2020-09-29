const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		message: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;

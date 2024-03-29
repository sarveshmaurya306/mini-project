const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AUTH_KEY } = require("../utils/config");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  currentStatus: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      xvalue = value.toLowerCase();
      if (
        !(
          xvalue === "student" ||
          xvalue === "teacher" ||
          xvalue === "principle"
        )
      ) {
        throw new Error("not acceptable user.");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid...");
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        pass = value;
        throw new Error({ error: 'password can not contain "password"' });
      }
    },
  },
  token: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

//user task relationship
userSchema.virtual("userposts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner",
});
/*
userSchema.virtual('userlikes', {
    ref:'Post',
    localField:'_id',
    foreignField:'likes'
})
*/
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, AUTH_KEY, {
    expiresIn: "3 hour",
  });

  user.token = token;

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) throw new Error("unable to login.");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("unable to login.");
  return user;
};

/*userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}*/
const User = mongoose.model("User", userSchema);
// const Post = mongoose.model("Post", postSchema)
module.exports = User;

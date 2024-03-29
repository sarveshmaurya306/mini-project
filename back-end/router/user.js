const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../models/user.js");
const Post = require("../models/post.js");

const upload = multer({
  limits: {
    fileSize: 1000000, //1(mb)*1000*1000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("file should be of type image."));
    }
    cb(undefined, true); //accept the given upload.
  },
});

router.get("/", (req, res) => {
  res.send("in api");
});

router.post("/join", async (req, res) => {
  const { name, email, password, currentStatus } = req.body;
  const hashPassword = await bcrypt.hash(password, 8);
  // console.log(hashPassword);

  const user = new User({
    name,
    email,
    currentStatus,
    password: hashPassword,
  });

  try {
    await user.generateAuthToken();
    await user.save();

    // console.log(user)
    res.status(201).send(user.token);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "please provide correct details..." });
  }
});

//! creating post.

router.post("/user/createpost", auth, async (req, res) => {
  const { title, description, imageUrl } = req.body;
  console.log(req.body);
  // console.log(req)
  try {
    const post = new Post({
      title,
      description,
      owner: req.user._id,
      image: imageUrl,
      ownername: req.user.name,
      timestamp: new Date().getTime(),
    });

    // const comment= req.body.comment.toString();
    // post.comments.push(comment)
    await post.save();
    res.send(post._id);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/user/getpost", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    await user.populate("userposts").execPopulate();
    console.log(user);
    res.send({ userData: user.userposts, user });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.delete("/user/avatar", auth, async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: "",
    });

    if (!user) throw new Error("user not exists");
    user.save();
    res.send(user._id);
  } catch (e) {
    console.log(e);
  }
});

// upload.single("photo");
router.post("/user/avatar", auth, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.imageUrl,
    });

    if (!user) {
      throw new Error("error");
    }
    // console.log(req.file.buffer)
    // await user.avatar(req.file.buffer)
    // const post= user.posts;

    await user.save();
    // console.log(user);
    // console.log(user.avatar)

    res.send(user._id);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/user/:id/getavatar", async (req, res) => {
  try {
    // const user= await User.findById(req.user._id);
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    // console.log(user.avatar);
    res.send(user.avatar);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

//get single user post
router.get("/user/:postId/getpost", async (req, res) => {
  try {
    const id = req.params.postId.replace("64fe0f", "").replace("5erx90", "");
    // console.log(id)
    // const post = await Post.findById(req.params.postId);
    const post = await Post.findById(id);
    if (!post) {
      throw new Error();
    }
    // console.log(post.comment)
    res.set("Content-Type", "image/jpg");
    // console.log(post.image)
    res.send(post.image);
  } catch (e) {
    res.send(500, "failed to get post.");
  }
});

//like single post
router.post("/user/:postId/inclike", auth, async (req, res) => {
  // console.log(typeof req.user._id)
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) throw new Error("post not found");
    const liked = post.likes.map(
      (user) => user.like.toString() == req.user._id.toString()
    );
    const isLiked = liked.includes(true);

    if (isLiked) throw new Error("post is already liked");

    post.likes.push({
      like: req.user._id,
    });
    post.totalLikes = post.totalLikes + 1;

    await post.save();
    // console.log("liked");
    res.send("post liked");
  } catch (e) {
    console.log(e);
    res.status(500).send("failed ");
  }
});

router.delete("/user/:postId/declike", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) throw new Error("post not found");

    await Post.update(
      { _id: req.params.postId },
      { $pull: { likes: { like: req.user._id } } },
      { new: true, multi: true }
    );
    post.totalLikes = post.totalLikes - 1;
    await post.save();

    res.send("done");
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post("/user/:postId/addcomment/:comment", auth, async (req, res) => {
  try {
    const comment = req.params.comment;
    // console.log(comment);
    const post = await Post.findById(req.params.postId);
    if (!post) throw new Error("post not found");

    post.comments = post.comments.concat({
      comment: comment,
      commentowner: req.user.name,
    });

    post.save();
    // console.log(post);
    res.send("post commented");
  } catch (e) {
    console.log(e);
    res.status(404).send("failed");
  }
});
/* 
router.get("/user/getallpost/:page/:limit", auth, async (req, res) => {
    const { page = 1, limit = 5 } = req.params;
    try {
        const posts = await Post.find()
            .limit(limit * 1)
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .exec();
        const count = await Post.countDocuments();
        // console.log(req.user._id)
        // console.log({ posts, count, Id: req.user._id });
        res.send({ posts, count, Id: req.user._id });
    } catch (e) {
        console.log(e);
        res.send();
    }
}); */

router.get(
  "/user/getpostbysorting/:page/:limit/:sortBy",
  auth,
  async (req, res) => {
    // const {sortBy= {timestamp:-1}} = req.params;
    const { page = 1, limit = 5, sortBy = "date" } = req.params;
    // console.log(sortBy);
    var toSort;
    if (sortBy === "date") {
      toSort = { timestamp: -1 };
    } else if (sortBy === "publicity") {
      toSort = { totalLikes: -1, timestamp: -1 };
    } else {
      throw new Error("cannot be done");
    }
    try {
      const posts = await Post.find()
        .limit(limit * 1)
        .sort(toSort)
        .skip((page - 1) * limit)
        .exec();

      const count = await Post.countDocuments();
      // console.log(req.user._id)
      // console.log({ posts, count, Id: req.user._id });
      const totalUsers = await User.countDocuments();
      // console.log(totalUsers)
      res.send({ posts, count, Id: req.user._id, totalUsers });
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
);

router.delete("/user/:postId/deletepost", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);

    const isVerified = post.owner.toString() === req.user._id.toString();
    if (!isVerified) throw new Error("not verified user");

    post = await Post.findByIdAndDelete(req.params.postId);
    // console.log(post)
    res.send("post deleted");
  } catch (e) {
    // statements
    console.log(e);
    res.status(404).send("cannot delete");
  }
});

// router.get('/user/:id/post', async (req,res) =>{
//     try{
//         const user= await User.findById(req.params.id);

//         // console.log(user.posts)

//         // res.set('Content-Type','image/jpg');
//         res.send(user.posts);
//     }catch(e ){
//         res.send(500,e)
//     }
// })
router.get("/user/other/profile/:userId", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);

    await user.populate("userposts").execPopulate();
    // console.log(user.email, user.password, user.token);

    user = {
      name: user.name,
      currentStatus: user.currentStatus,
      userposts: user.userposts,
      _id: user._id,
      avatar: user.avatar,
    };
    // console.log(user)
    // console.log(user, userData)
    // console.log(user, user.userposts )
    res.send({ userData: user.userposts, user });
  } catch (e) {
    // console.log('in other profile ')
    console.log(e);
    res.status(500).send();
  }
});

router.get("/checkuserauth", auth, (req, res) => {
  res.send("authenticated");
});

module.exports = router;

const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");
const multer = require("multer");

const User = require("../models/user.js");
const Post = require("../models/post.js");

const upload = multer({
    limits: {
        fileSize: 3000000, //3(mb)*1000*1000
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

router.post(
    "/user/createpost",
    upload.single("photo"),
    auth,
    async (req, res) => {
        const { title, description } = req.body;
        console.log(req.body);
        try {
            const post = new Post({
                title,
                description,
                owner: req.user._id,
                image: req.file.buffer,
                ownername: req.user.name,
            });

            // const comment= req.body.comment.toString();
            // post.comments.push(comment)
            await post.save();
            res.send(post._id);
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    }
);

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

router.post("/user/avatar", upload.single("photo"), auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            avatar: req.file.buffer,
        });

        if (!user) {
            throw new Error("error");
        }
        // console.log(req.file.buffer)
        // await user.avatar(req.file.buffer)
        // const post= user.posts;

        await user.save();
        console.log(user);
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
        console.log(user.avatar);
        res.send(user.avatar);
    } catch (e) {
        console.log(e);
        res.status(404).send();
    }
});

//get single user post
router.get("/user/:postId/getpost", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error();
        }
        // console.log(post.comment)
        res.send(post);
    } catch (e) {
        res.send(500, "failed to get post.");
    }
});

//like single post
router.post("/user/:postId/inclike", auth, async (req, res) => {
    // console.log(typeof req.user._id)
    try {
        const post = await Post.findById(req.params.postId);
        const liked = post.likes.map(
            (user) => user.like.toString() == req.user._id.toString()
        );
        const isLiked = liked.includes(true);

        if (isLiked) throw new Error("post is already liked");
        if (!post) throw new Error("post not found");

        post.likes.push({
            like: req.user._id,
        });
        await post.save();
        console.log("liked");
        res.send("post liked");
    } catch (e) {
        console.log(e);
        res.status(500).send("failed ");
    }
});

router.post("/user/:postId/addcomment/:comment", auth, async (req, res) => {
    try {
        const comment = req.params.comment;
        console.log(comment);
        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error("post not found");

        post.comments = post.comments.concat({
            comment: comment,
            commentowner: req.user.name,
        });

        post.save();
        console.log(post);
        res.send("post commented");
    } catch (e) {
        console.log(e);
        res.status(404).send("failed");
    }
});

router.get("/user/getallpost", auth, async (req, res) => {
    const post = await Post.find({});

    res.send(post);
});


router.delete('/user/:postId/deletepost', auth, async(req,res)=>{
    try {
       let post = await Post.findById(req.params.postId);
       
       const isVerified= post.owner.toString()===req.user._id.toString();
       console.log(isVerified)
       
        if(!isVerified)
            throw new Error('not verified user');

        post =await Post.findByIdAndDelete(req.params.postId)
        // console.log(post)
        res.send('post deleted')

    } catch(e) {
        // statements
        console.log(e);
        res.status(404).send('cannot delete')
    }
})

/*
router.get('/user/:id/post', async (req,res) =>{
    try{
        const user= await User.findById(req.params.id);    

        // console.log(user.posts)

        // res.set('Content-Type','image/jpg');
        res.send(user.posts);
    }catch(e ){
        res.send(500,e)
    }
})*/

router.get("/checkuserauth", auth, (req, res) => {
    res.send("authenticated");
});

module.exports = router;
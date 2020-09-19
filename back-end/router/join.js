const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.js')
const multer = require('multer');

const User = require('../models/user.js')
const Post = require('../models/post.js')



router.post('/join', async (req, res) => {
    const { name, email, password, currentStatus } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    // console.log(hashPassword);

    const user = new User({
        name,
        email,
        currentStatus,
        password: hashPassword,
    })

    try {
        await user.generateAuthToken();
        await user.save()

        // console.log(user)
        res.status(201).send(user.token);
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: 'please provide correct details...' })
    }
})



//! creating post.

router.post('/home', auth, async (req, res) => {
    // console.log(req.user);
    console.log('logged in');
    res.send({ message: 'authorised' });

})


router.post('/user/createpost', auth, async (req, res) => {
    console.log(req.body)
    const {title, description, comment}=req.body;
    try {
        
        const post = new Post({
            title,
            description,
            owner: req.user._id,
            
        })
        post.comments=post.comments.concat({comment})
        // const comment= req.body.comment.toString();
        // post.comments.push(comment)
        await post.save()
        res.send('post created');

    } catch (e) {
        console.log(e)
        res.status(500).send();
    }

})


router.post('/user/getpost', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        await user.populate('userposts').execPopulate();
        console.log(user)
        res.send({ userData: user.userposts, user });

    } catch (e) {
        console.log(e)
        res.status(500).send();
    }
})


const upload= multer({
    limits:{
        fileSize:3000000, //3(mb)*1000*1000
    },
    fileFilter(req, file, cb) {
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('file should be of type image.'))
        }
        cb(undefined, true) //accept the given upload.
    }
})


router.post('/user/avatar',upload.single('photo'), auth,async (req,res) =>{
    try{
        const user =await User.findByIdAndUpdate(req.user._id, {avatar:req.file.buffer});


        if(!user){
            throw new Error('error');
        }
        // console.log(req.file.buffer)
        // await user.avatar(req.file.buffer)
        // const post= user.posts;

        await user.save();
        console.log(user)
        // console.log(user.avatar)

        res.send(user._id);

    } catch(e ){
        console.log(e)
        res.status(500).send(e);
    }

})

router.get('/user/:id/getavatar',  async(req,res)=>{
    try{
        // const user= await User.findById(req.user._id);
        const user =await User.findById(req.params.id)

        if(!user){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        console.log(user.avatar)
        res.send(user.avatar);
    } catch(e) {
        console.log(e)
        res.status(404).send()
    }
})

//get single user post
router.get('/user/:postId/getpost',  async(req,res)=>{
    try{
        const post= await Post.findById(req.params.postId);
        if(!post ){
            throw new Error();
        }
        console.log(post.comment)
        res.send(post);

    } catch(e) {
        res.send(500, 'failed to get post.');
    }
})

//get single post
router.get('/user/:postId/inclike', async(req,res)=>{
    try{
        const post =await Post.findByIdAndUpdate(req.params.postId, {$inc: {like: 1 } });
        if(!post){
            throw new Error();
        }
        await post.save();
        res.send('done')
    } catch(e) {
        res.status(500).send('faild to get likes')
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


module.exports = router
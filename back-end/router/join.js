const express=require('express');
const router =new express.Router();
const bcrypt= require('bcryptjs')
const auth= require('../middleware/auth.js')
const multer =require('multer');

const User = require('../models/user.js')
const Post =require('../models/post.js')



router.post('/join',async (req,res)=>{
    const {name, email, password}=req.body;
    const hashPassword= await bcrypt.hash(password,8);
    // console.log(hashPassword);

    const user =new User({
        name,
        email,
        password: hashPassword,
    })

    try{
        await user.generateAuthToken();
        await user.save()

        // console.log(user)
        res.status(201).send(user.token);
    } catch(e) {
        console.log(e)
        res.status(400).send({error:'please provide correct details...'})
    }
})



//! creating post.

router.post('/home', auth ,async (req,res)=>{
    // console.log(req.user);
    console.log('logged in');
    res.send({message:'authorised'});
    
})


router.post('/user/createpost', auth, async (req,res)=>{

    try{

        const post = new Post({
            ...req.body,
            owner: req.user._id
        })
        await post.save()
        res.send('post created');

    } catch(e ){
        res.status(500).send();
    }

})


router.post('/user/getpost', auth, async (req, res)=>{
    try{

        const user= await User.findById(req.user._id);

        await user.populate('userposts').execPopulate();

        res.send({userData:user.userposts,user});

    } catch(e) {

        res.status(500).send();
    }
})


/*const upload= multer({
    limits:{
        fileSize:1000000, //1mb
    },
    fileFilter(req, file, cb) {
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('file should be of type image.'))
        }
        cb(undefined, true) //accept the given upload.
    }
})


router.post('/user/:id/post',upload.single('image') ,async (req,res) =>{
    try{
        const user =await User.findById(req.params.id);

        if(!user)
            throw new Error();

        const post= user.posts;

        console.log(req.body);

        post.push({...req.body, ...req.file, image:req.file.buffer})
        await user.save();

        console.log(post)

        res.send(user._id);

    } catch(e ){
        res.status(500).send(e);
    }

})

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
    

module.exports= router
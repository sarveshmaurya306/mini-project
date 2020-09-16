const express =require('express');
const app =express()
require('./db/mongoConnect')

const userModel= require('./models/user')
const bcrypt= require('bcryptjs');
const cors= require('cors');
const loginRouter=require('./router/login.js');
const joinRouter= require('./router/join.js')

const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors());
app.use(loginRouter);
app.use(joinRouter)





app.get('/show', async (req,res)=>{
    try{
        const user = await userModel.find({});
        if(!user)
        return res.send('no user found')

        res.send(user);
    } catch(e) {
        res.send({error:'connection error...'})
    }
})

app.get('/show/:name', async (req,res)=>{
    console.log(req.params.name)
    try{
        const user= await userModel.find({"name":req.params.name})
        if(!user)
        return res.status(404).send();
        res.send(user);
    } catch(e) {
        res.status(500).send()
    }
})

app.listen(port, ()=>console.log(`running on ${port}`))



//post user relationship 
/*
const Post = require('./models/post.js');

const main=async()=>{
    const task= await Post.findById("5f62085afd7dc62915ac4ee0");

    await task.populate('owner').execPopulate();

    console.log(task.owner)
}

main();*/


/*const User =require('./models/user.js');

const main=async()=>{
    const user = await User.findById('5f62077d9737b52868b0fe3d');
    // console.log(user);
    await user.populate('userposts').execPopulate();

    console.log(user.userposts)
}
main();*/
const express =require('express');
const app =express()
require('./db/mongoConnect')
const userModel= require('./models/signup')
const bcrypt= require('bcryptjs');
const cors= require('cors');

const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors());


app.post('/signup',async (req,res)=>{
    const {name, email, password}=req.body;
    const hashPassword= await bcrypt.hash(password,8);
    console.log(hashPassword);
    const userDetail =new userModel({
        name,
        email,
        password: hashPassword,
    })
    try{
        await userDetail.save()
        res.status(201).send(userDetail);
    } catch(e) {
        console.log(e.reason)
        res.status(400).send({error:'please provide correct details...'})
    }
})

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
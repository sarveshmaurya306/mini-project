const express = require("express");
const socketio= require('socket.io');

const http= require('http');

const port = process.env.PORT || 4000;

const app = express();

const server= http.createServer(app);
const io=socketio(server);

const { addUser, removeUser, getUser, getUserInRoom, setUserInRoom} =require('./utils/users.js')
const cors = require("cors");
app.use(cors());

require("./db/mongoConnect");

const userModel = require("./models/user");
const bcrypt = require("bcryptjs");
const loginRouter = require("./router/login.js");
const userRouter = require("./router/user.js");
const auth= require('./middleware/auth.js')

app.use(express.json());

app.use(loginRouter);
app.use(userRouter);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/show", async (req, res) => {
    try {
        const user = await userModel.find({});
        if (!user) return res.send("no user found");

        res.send(user);
    } catch (e) {
        res.send({ error: "connection error..." });
    }
});

app.get("/show/:name", async (req, res) => {
    // console.log(req.params.name);
    try {
        const user = await userModel.find({ name: req.params.name });
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

app.get('/chat', auth, async(req,res)=>{
    
    io.on('connection',(socket)=>{
      socket.on('join',({username,room})=>{
        // console.log({id: socket.id, username, room})
        // const {user} =addUser({ id: socket.id, username, room })
        const user= addUser({id:socket.id, username, room})
        console.log(user)
        socket.join(room);

        socket.emit('welcome',`welcome to the ${room}`)
        socket.broadcast.to(user.room).emit('message',`${username} has joined.`)
        
      })

      socket.on('sendmessage',(data)=>{
        const user=getUser(socket.id);
        // console.log(user)
        socket.to(user.room).emit('reply',`${user.username} says ${data}`)
      })
      socket.on('disconnect',()=>{
        const user=removeUser(socket.id)
        // console.log(user.room, user.username)
        if(user){
          io.to(user.room).emit('messsage',`${user.username} has left`)
          socket.leave(user.room);
        }

      })
    }); 
    // console.log(req.user.name)

    res.send(req.user.name);
})


server.listen(port, ()=>{
    console.log(`running on ${port}`)
})
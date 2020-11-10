const express = require("express");
const socketio = require("socket.io");
const moment = require("moment");
const http = require("http");

const port = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
app.use(cors());

require("./db/mongoConnect");

const userModel = require("./models/user");
const loginRouter = require("./router/login.js");
const userRouter = require("./router/user.js");
const auth = require("./middleware/auth.js");

app.use(express.json());

app.use(loginRouter);
app.use(userRouter);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
/* 
io.on('connection',(socket)=>{
  console.log('user has been connected')
  socket.on('message',({name, message})=>{
      console.log(message)
      io.emit('message',{name, message})
  })
  socket.on('disconnect',()=>{
    console.log('user has been disconnected')
  })
}) */

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
    user= user._id;
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//socket implementation started;
let users = [];

const addUser = ({ id, name, email, room }) => {
  // console.log('in add user')
  const isPresent = users.find((user) => user.email === email);
  if (!isPresent) users.push({ id, room: room.toLowerCase(), email, name });
  // console.log(!isPresent)
  // console.log(users.push({id, name, email, room }))
  // console.log(users)
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  if (user) return user;
};

const updateUser = (id, room) => {
  const user = users.find((user) => user.id === id);
  if (user) user.room = room;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const getUserInRoom = (room) => {
  return users.find((user) => user.room === room);
};

const getAllUserInRoom = (room) => {
  var user = [];
  user = users.filter((user) => user.room === room);
  return user;
};
//basic commands end

//total emits=> admin_message & server_user_message
//total calls/on=> new_user & user_message & change_user_room &( disconnect & connection)

io.on("connection", (socket) => {
  // console.log("user connected");

  socket.on("new_user", ({ name, email, room }) => {
    const promise = new Promise((resolve) => {
      // console.log(socket.id, name, email, room)
      addUser({ id: socket.id, name, email, room: room.toLowerCase() });
      // console.log('in new user')
      resolve();
    });
    promise
      .then((r) => {
        // console.log(count++)
        socket.join(room, () => console.log("conn"));
        socket.on("disconnect", () => {
          socket.disconnect();
          console.log("dis");
        });
        // console.log(room);
        // console.log(getUserInRoom('both'))
        io.to(socket.id).emit("admin_message", {
          name: "admin",
          message: `Welcome "${name}" in "${room}" room`,
          time: new Date().getTime(),
        });
        socket.in(room).emit("admin_message", {
          name: "admin",
          message: `"${name}" has joined say hi.`,
          time: new Date().getTime(),
        });
      })
      .catch((e) => {});
  });
  socket.on("getOnlineUserServer", (room) => {
    console.log("in get online user");
    var onlineUsers;
    const promise = new Promise((resolve) => {
      onlineUsers = getAllUserInRoom(room);
      resolve();
    });
    promise
      .then((e) => {
        socket.emit("getOnlineUserClient", onlineUsers);
        // console.log(onlineUsers)
      })
      .catch((e) => {
        console.log(e);
      });
  });

  socket.on("user_message", (message) => {
    console.log("usermessage");
    var user;
    const promise = new Promise((resolve) => {
      user = getUser(socket.id);
      resolve();
    });
    promise
      .then((r) => {
        // console.log(user.name, message, user.room)
        io.in(user.room).emit("server_user_message", {
          name: user.name,
          message,
          time: new Date().getTime(),
        });
        // users.map(m=>console.log(m))
      })
      .catch((e) => {});
  });

  socket.on("change_user_room", (room) => {
    var user;
    const promise = new Promise((resolve) => {
      user = getUser(socket.id);
      resolve();
    });
    promise
      .then((r) => {
        // console.log(user.room)
        socket.leave(user.room, () => {
          socket.to(user.room).emit("admin_message", {
            name: "admin",
            message: `"${user.name}" has left this room. `,
            time: new Date().getTime(),
          });
          updateUser(socket.id, room);

          socket.join(room, () => {
            socket.to(room).emit("admin_message", {
              name: "admin",
              message: `"${user.name}" has joined say hi.`,
              time: new Date().getTime(),
            });
            io.to(socket.id).emit("admin_message", {
              name: "admin",
              message: `Welcome "${user.name}" in "${room}" room`,
              time: new Date().getTime(),
            }); //sending private message
          });
        });

        // console.log('user is in '+room)

        // io.in(room).emit('admin_message',{name: 'admin', message: `${user.name} has joined this room. `})
      })
      .catch((e) => {});
  });

  socket.on("disconnected", () => {
    console.log("dis");
    var user;
    const promise = new Promise((resolve) => {
      user = getUser(socket.id);
      resolve();
    });
    promise
      .then((r) => {
        io.in(user.room).emit("admin_message", {
          name: "admin",
          message: `"${user.name}" has left this room`,
          time: new Date().getTime(),
        });

        socket.leave(user.room);
        const deleteu = new Promise((resolve, reject) => {
          deleteUser(socket.id);
          resolve();
        });
        socket.off();
        deleteu
          .then((r) => {
            console.log("user disconnected.");
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  });
  socket.on("disconnect", () => {
    console.log("dis");
    var user;
    const promise = new Promise((resolve) => {
      user = getUser(socket.id);
      resolve();
    });
    promise
      .then((r) => {
        io.in(user.room).emit("admin_message", {
          name: "admin",
          message: `"${user.name}" has left this room`,
          time: new Date().getTime(),
        });

        socket.leave(user.room);
        const deleteu = new Promise((res) => {
          deleteUser(socket.id);
        });
        socket.off();
        deleteu
          .then((r) => {
            console.log("user disconnected.");
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  });
});

server.listen(port, () => {
  console.log(`running on ${port}`);
});

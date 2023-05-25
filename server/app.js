const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./users")();
const { constants } = require("buffer");
const mongoose = require("mongoose");
const Message = require("../models/message");

// const db = "mongodb+srv://axios:123123123@cluster0.f1obul7.mongodb.net/?retryWrites=true&w=majority";
const db = "mongodb://axios:123123123@ac-lt3pxkb-shard-00-00.f1obul7.mongodb.net:27017,ac-lt3pxkb-shard-00-01.f1obul7.mongodb.net:27017,ac-lt3pxkb-shard-00-02.f1obul7.mongodb.net:27017/?ssl=true&replicaSet=atlas-gfdolf-shard-0&authSource=admin&retryWrites=true&w=majority";


function currentDate() {
  if (new Date().getMinutes() <= 9) {
    return new Date().getHours() + ":" + "0" + new Date().getMinutes();
  } else {
    return new Date().getHours() + ":" + new Date().getMinutes();
  }
}

const m = (name, text, id, time) => ({ name, text, id, time });

io.on("connection", socket => {

  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("Connected to DB..."))
    .catch(error => {
      console.log("Error" + error);
    });

  socket.on("userJoined", (data, cb) => {

    if (data.user == "" || data.room == "") {
      return cb("Incorrect data");
    }

    socket.join(data.room);

    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room

    });

    cb({ userId: socket.id });
    io.to(data.room).emit("updateUsers", users.getByRoom(data.room));
    socket.emit("newMessage", m("admin", `Welcome ${data.name}`,Date.now()));

    Message.find({ room: data.room }).then(messages => messages.forEach((e, i) => {
        socket.emit("newMessage", m(e.name, e.text, e._id, e.time));
      })
    );

    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `User ${data.name} logged in`,Date.now()));

    const message = new Message({
      name: "admin",
      text: `User ${data.name} logged in`,
      room: data.room,
      time: currentDate()

    });

    message
      .save()
      .then(result => console.log("message saved"))
      .catch(err => {
        console.log(err);
      });

  });

  socket.on("createMessage", (data, cb) => {

    if (!data.text) {
      return cb("Empty text");
    }

    let user = users.get(data.id);

    if (user) {
      const message = new Message({
        name: user.name,
        text: data.text,
        room: user.room,
        time: currentDate()
      });

      message
        .save()
        .then(result => console.log("message saved"))
        .catch(err => {
          console.log(err);
        });

      io.to(user.room).emit(
        "newMessage",
        m(user.name, data.text, Date.now(), currentDate())
      );
    }
    cb();

  });
  
  socket.on("userLeft", (id, cb) => {

    const user = users.remove(id);

    if (user) {
      io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("admin", `User ${user.name} logged out`)
      );

      const message = new Message({
        name: "admin",
        text: `User ${user.name} logged out`,
        room: user.room,
        time: currentDate()
      });

      message
        .save()
        .then(result => console.log("message saved"))
        .catch(err => {
          console.log(err);
        });
    }
    cb();

  });

  socket.on("disconnect", () => {

    const user = users.remove(socket.id);

    if (user) {
      io.to(user.room).emit("updateUsers", users.getByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        m("admin", `User ${user.name} logged out`,Date.now())
      );
    }

  });
});

module.exports = {
  app,
  server
};

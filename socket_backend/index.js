var express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const axios = require('axios');

// This enables CORs and ensures that our frontend,
// running on a different server can connect to our backend
io.set("origins", "*:*");
// whenever we receive a `connection` event
// our async function is then called
io.on("connection", function (socket) {
    // we should see this printed out whenever we have
    // a successful connection
    console.log("Client Successfully Connected");

    // we then send out a new message to the
    // `chat` channel with "Hello World"
    // Our clientside should be able to see
    // this and print it out in the console
    //io.emit("chat", "hello world");

    //call api to get all the external tasks in particular intervals
    var host = 'http://192.168.1.107:3535';
    axios
        .post(host + '/camunda/pollExternalTasks')
        .then(res => {
            var polled_tasks = JSON.parse(JSON.stringify(res.data));
            io.emit("polled_tasks", polled_tasks);
        })
        .catch(err => console.log(err))
});

server.listen(5000, () => {
    console.log("Backend Server is running on http://192.168.1.107:5000");
});
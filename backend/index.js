var http = require('http');
var request = require('request');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
const { Client, logger } = require('camunda-external-task-client-js');

const port = 3535;
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//App entry point
app.get('/', function(req, res) {
  res.send(`app is listening on port ${port}`);
});

//Camunda API's //

//Polling external Tasks
/* app.post('/camunda/pollExternalTasks', function (req, res) {
    // configuration for the Client:
    //  - 'baseUrl': url to the Workflow Engine
    //  - 'logger': utility to automatically log important events
    const config = { baseUrl: "http://192.168.1.104:8080/engine-rest", use: logger };

    // create a Client instance with custom configuration
    const client = new Client(config);

    // susbscribe to the topic: 'creditScoreChecker'
    try {
        client.subscribe("cherry", async function ({ task, taskService }) { //createrpm
            // Put your business logic
            // complete the task
            console.log(task);
            res.send(task)
            //res.send(task)
            // await taskService.complete(task);
             taskService.complete(task);
        });
    } catch (error) {
        console.log(error);
    }
}); */

//Poll Normal Tasks
app.post('/camunda/pollTasks', function(req, res) {
  var host = 'http://192.168.1.104:8080';
  var options = {
    method: 'GET',
    uri: host + '/engine-rest/task',
    headers: {
      'Content-type': 'application/json',
    },
  };
  request(options, function(err, response, body) {
    if (err) console.log(err);
    else res.send(body);
  });
});

//Poll External Tasks
app.post('/camunda/pollExternalTasks', function(req, res) {
  var host = 'http://192.168.1.104:8080';
  var options = {
    method: 'GET',
    uri: host + '/engine-rest/external-task',
    headers: {
      'Content-type': 'application/json',
    },
  };
  request(options, function(err, response, body) {
    if (err) console.log(err);
    else res.send(body);
  });
});

app.listen(port, function(req, res) {
  console.log(`app is listening on port ${port}`);
});

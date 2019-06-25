#!/bin/bash
#kill all node processes
killall -9 /usr/bin/node
#start react app
nohup yarn start >> app.log 2>&1 &
#start the server
cd backend; nohup node index.js >> app.log 2>&1 &
#start the socket server
cd ../socket_server; nohup node index.js >> app.log 2>&1 &

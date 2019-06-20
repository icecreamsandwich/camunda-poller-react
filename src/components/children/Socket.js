import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.1.107:5000/');

function connect(cb) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the
  // callback function with said message
  /* socket.on("chat", message => {
    // console.log the message for posterity
    console.log(message);
    // trigger the callback passed in when
    // our App component calls connect
    cb(message);
  }); */

  // listen for any messages coming through
  // of type 'chat' and then trigger the
  // callback function with said message
  socket.on('polled_tasks', message => {
    // console.log the message for posterity
    //console.log(message);
    // trigger the callback passed in when
    // our App component calls connect
    cb(message);
  });
}

export { connect };

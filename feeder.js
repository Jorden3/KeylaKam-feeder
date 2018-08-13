var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');


var spawn = require('child_process').spawn;
 
var socket = io.connect('http://localhost:8080', {reconnect: true});
//var stream = ss.createStream();
//var filename = 'profile.jpg';

socket.emit('feeder');
startStreaming();

function stopStreaming() {
    if (Object.keys(sockets).length == 0) {
      app.set('watchingFile', false);
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  }

function startStreaming() {
 
    if (app.get('watchingFile')) {
      socket.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
      return;
    }
   
    var args = ["-w", "640", "-h", "480", "-o", "./stream/image_stream.jpg", "-t", "999999999", "-tl", "100"];
    proc = spawn('raspistill', args);
   
    console.log('Watching for changes...');
   
    app.set('watchingFile', true);
   
    fs.watchFile('./stream/image_stream.jpg', function(current, previous) {
      io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    })
   
  }


// var connectToSocket = function (){
//     return socket = io.connect('http://localhost:8080', {reconnect: true})
// } 

// socket.on('connect', ()=>{
//     console.log('Hello');
// });

//socket.emit('feeder'/*, stream, {name: filename}*/);
//fs.createReadStream(filename).pipe(stream);
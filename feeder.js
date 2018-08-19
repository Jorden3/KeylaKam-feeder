var io = require('socket.io-client');
// var ss = require('socket.io-stream');
//var fs = require('fs');
//const raspividStream = require('raspivid-stream');

var spawn = require('child_process').spawn;
 
var socket = io.connect('http://35.190.181.111', {reconnect: true});

var args = ["/home/pi/Desktop/MotorShield-master/feeder.py"];
spawn('python', args);

socket.on('feed', function(){
  spawn('python', args);
})
socket.emit('feeder');
//startStreaming();

function stopStreaming() {
    if (Object.keys(sockets).length == 0) {
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
}

function startStreaming() {
  var count =0;
  console.log('Starting stream');

    var args = ["-w", "640", "-h", "480", "-o", "/home/pi/Desktop/image_stream.png","-n","-t", "999999999", "-tl", "1"];
    proc = spawn('raspistill', args);
   
    console.log('Watching for changes...');
    
    fs.watchFile('/home/pi/Desktop/image_stream.png', function(current, previous) {
      fs.readFile('/home/pi/Desktop/image_stream.png', function(err, buff){
        count++;
        if(count === 100){
          console.log(count + '\n');
        }

        if(!err){
          socket.emit('liveStream', buff);
        }
        else{
          console.error('Error in stream getting changes to photo\n', err);
        }
      });
  });
}

var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');
const raspividStream = require('raspivid-stream');

var spawn = require('child_process').spawn;
 
var socket = io.connect('http://192.168.1.7:8080', {reconnect: true});
var stream = ss.createStream();
//var filename = 'profile.jpg';

socket.emit('feeder');
startStreaming();

function stopStreaming() {
    if (Object.keys(sockets).length == 0) {
      if (proc) proc.kill();
      fs.unwatchFile('./stream/image_stream.jpg');
    }
  }

function startStreaming() {
  var count =0;

  var videoStream = raspividStream();

  console.log('Starting stream');

  



  // videoStream.on('data', (data)=>{
  //   socket.emit('liveStream', data);
  // });

    // var args = ["-w", "640", "-h", "480", "-o", "/home/pi/Desktop/image_stream.jpg","-n","-t", "999999999", "-tl", "10"];
    // proc = spawn('raspistill', args);
   
    // console.log('Watching for changes...');
    
   
    // // ss(socket).emit('liveStream', stream)
    // // fs.createReadStream('/home/pi/Desktop/image_stream.jpg').pipe(stream);
    // fs.watchFile('/home/pi/Desktop/image_stream.jpg', function(current, previous) {
    //   fs.readFile('/home/pi/Desktop/image_stream.jpg', function(err, buff){
    //     count++;
    //     if(count === 100){
    //       console.log(count + '\n');
    //     }

    //     if(!err){
    //       socket.emit('liveStream', buff);
    //     }
    //     else{
    //       console.err('Error in stream getting changes to photo\n', err);
    //     }
    //   });
      
    // })
   
  }

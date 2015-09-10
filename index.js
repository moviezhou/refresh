var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var count = 0;
var nasp, url;


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  url = makeid();
  nasp = io.of('/' + url);

  nasp.on('connection', function(socket){
    nasp.emit('url', url);
    socket.on('disconnect', function() {
      console.log("disconnected");
    });

    socket.on('controller connected', function(msg){
  });

    socket.on('game connected', function(){
  });

    socket.on('control msg', function(msg){
      socket.broadcast.emit('control msg', msg);
  });
});

  res.redirect('/' + url);
});

app.get('/ctrl', function(req, res){
  res.sendFile(__dirname + '/controller.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/game.html');
  res.redirect('/' + url);
});

app.get('/*?ctrl', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/*', function(req, res){
  res.sendFile(__dirname + '/game.html');
});

// generate random url string
function makeid(){
  var randstr = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ )
    randstr += possible.charAt(Math.floor(Math.random() * possible.length));
  return randstr;
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});

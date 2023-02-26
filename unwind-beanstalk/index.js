
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bp = require("body-parser")

// start express server on port
var PORT = process.env.PORT || 8081;//8081
server.listen(PORT, () => {
  console.log("server started on port");
});

//serve frontend
app.use(express.text());
app.use(express.static("public"));
app.use(bp.json({extended: true}))
app.use(bp.urlencoded({extended: true }))

//calculate stuff with the data
var threshold = 160; //threshold for "good" (180 deg is perfect)
function checkPos(data) {
  //calcs
  var leftAngle = data.left;
  var rightAngle = data.right;
  // when x > 150, x < - 150 -> good
  var left = leftAngle > threshold || leftAngle < -threshold ? "good" :
              leftAngle <= threshold && leftAngle > 0 ? "high" : "low";
  var right = rightAngle > threshold || rightAngle < -threshold ? "good" :
              rightAngle <= threshold && rightAngle > 0 ? "high" : "low";
  return {left: left, right: right};
}

//receive data
app.post("/data", (req, res) => {
  const body = req.body;
  console.log("DATA RECEIVED:", body);
  io.emit('update', checkPos(body));
  res.send("hi, received: " + JSON.stringify(body));
});

//io connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("disconnect", () => {
    console.log("user disconnect");
  })
  //emergency update threshold
  socket.on("threshold", (val) => {
    threshold = val;
    console.log(val);
  })
});

/*setInterval(() => {
  var l = Math.random();
  var r = Math.random();
  io.emit('update', { left: l < 0.33 ? "low" : l < 0.67 ? "high" : "good" , right:  r < 0.33 ? "low" : r < 0.67 ? "high" : "good"  })
},7000)*/
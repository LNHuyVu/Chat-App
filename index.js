const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
let countUser = 0;
io.on("connection", (socket) => {
  //Count user on
  countUser += 1;
  io.emit("total-users", countUser);
  //
  console.log("Connected: " + socket.id);
  socket.on("on-chat", (data) => {
    console.log(data);
    io.emit("user-chat", data);
  });
  socket.on("disconnect", () => {
    //Count user on
    countUser -= 1;
    io.emit("total-users", countUser);
    //
  });
});
server.listen(3000, () => {
  console.log("Listen port http://localhost:3000");
});
function numberRandom() {
  let number=Math.random()*10;
  console.log(number);
  
}
// function runNumber() {
//   myVar = setInterval(numberRandom, 1000);
// }
// runNumber();
async function logMovies() {
  const response = await fetch("https://mcs-sg.tiktok.com/v1/list");
  // const movies = await response.json();
  console.log(response);
}
logMovies();

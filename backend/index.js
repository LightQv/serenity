require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");

const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

const server = http.createServer(app);

const io = socketIO(server, {
  cors: { origin: [`${process.env.FRONTEND_URL}`] },
});

io.on("connect", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("newMessage", data);
  });
});

server.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});

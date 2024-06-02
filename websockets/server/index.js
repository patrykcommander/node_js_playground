import { createServer } from "http";
import { Server } from "socket.io";

const httpSever = createServer();
const io = new Server(httpSever, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? "false" : "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});

httpSever.listen(3500, () => {
  console.log("Listening on port 3500");
  console.log(process.env.NODE_ENV);
});

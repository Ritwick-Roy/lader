const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userApi");

app.use(morgan("dev"));

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/user",userRoutes);

app.get("/", (req, res) => {
  res.send("Default route up!");
});

const server = app.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
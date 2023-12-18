const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userApi");
const fileRoutes = require("./routes/fileApi");

app.use(morgan("dev"));

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/user",userRoutes);
app.use("/api/files",fileRoutes);

app.get("/", (req, res) => {
  res.send("Default route up!");
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
const morgan = require("morgan");
const express = require("express");
const app = express();
const courses = require("./router/course");
const home = require("./router/home");
const mongoose = require("mongoose");
const users = require("./router/user");
const auth = require("./router/auth");

app.use(express.json());
app.use(morgan("tiny"));

async function koneksiDb() {
  await mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("koneksi ke mongo"))
    .catch((err) => console.error("error", err.message));
}

koneksiDb();

app.use("/api/courses", courses);
app.use("/", home);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(3000, () => console.log("starting no port 3000"));

const morgan = require("morgan");
const express = require("express");
const app = express();
const courses = require("./router/course");
const home = require("./router/home");

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/courses", courses);
app.use("/", home);

app.listen(3000, () => console.log("starting no port 3000"));

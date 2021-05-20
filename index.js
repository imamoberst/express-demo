const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello Imam Express");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("not Found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateJoi(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("not Found");
    return;
  }

  const { error } = validateJoi(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("not Found");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const validateJoi = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return Joi.validate(course, schema);
};
app.listen(3000, () => console.log("starting no port 3000"));

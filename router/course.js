const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("not Found");
  res.send(course);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;

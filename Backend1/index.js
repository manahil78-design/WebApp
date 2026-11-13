const express = require("express");
const app = express();
app.use(express.json());

const students = [
  {
    name: "Ali",
    age: 18,
    course: "Web Development"
  },
  {
    name: "Sara",
    age: 19,
    course: "Graphic Design"
  },
  {
    name: "Ahmed",
    age: 20,
    course: "JavaScript"
  }
];

app.get("/students", (req, res) => {
  res.status(200).json(students);
});

app.post("/students", (req, res) => {
  const studentData = req.body;
  students.unshift(studentData);

  res.status(201).json({
    message: "Student added successfully",
    students: students
  });
});

app.listen(3000, () => {
  console.log("Student server is running on port 3000");
});

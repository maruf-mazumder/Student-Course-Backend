const mongoose = require("mongoose");
const Course = require("./courseModel");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: String,
    slug: String,
    DOB:String,
    Email:String,
    tutorials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  })
);

module.exports = Student;

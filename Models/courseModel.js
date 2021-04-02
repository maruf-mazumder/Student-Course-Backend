const mongoose = require("mongoose");

// const {studentSchema} = require("./studentModel");

const studentSchema =   new mongoose.Schema({
  name: String
});

const courseSchema =  new mongoose.Schema({
  name: String,
  students: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Student"
    // }
    {
      type:studentSchema,
      ref:'Student'
    }
  ]
});
const Course = mongoose.model(
  "Course",
  courseSchema
);

module.exports.Course = Course;
module.exports.courseSchema = courseSchema;

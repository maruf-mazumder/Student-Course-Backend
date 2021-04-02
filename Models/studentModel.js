const mongoose = require("mongoose");
// const {Course,courseSchema} = require("./courseModel");

const courseSchema =  new mongoose.Schema({
  name: String
});

const studentSchema =   new mongoose.Schema({
  name: String,
 
  DOB:String,
  phone:String,
  Email:String,
  subjects: [
    {
      type:courseSchema,
      refer:'Course'
    }
  ]
});
const Student = mongoose.model(
  "Student",
  studentSchema
);

module.exports.Student = Student;
module.exports.studentSchema = studentSchema;

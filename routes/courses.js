const Course = require('../Models/courseModel');
const Student = require('../Models/studentModel');
const express = require('express');
const router =  express.Router();


router.get('/',async (req,res)=>{
 
    const courses = await Course.find();
    if(!courses) return res.status(404).send('Couldnt find the course with the given id')

    res.json(courses);
});
router.get('/:id',async (req,res)=>{
 
    const course = await Course.findById(req.params.id);
    if(!course) return res.status(404).send('Couldnt find the course with the given id')

    res.json(course);
});
router.delete('/:id',async (req,res)=>{
 
    const course = await Course.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send('Couldnt find the course with the given id')

    res.json(course);
});


router.post('/',async (req,res)=>{
    let students = [];
    students[students.length]=req.body.students
    console.log(students);
 
 let course = new Course({
     name:req.body.name,
     students:students
     
 });
    try{
        course = await course.save();
        res.json(course);
    }
    catch(ex){
        console.log(ex.message);
    }
});


router.put('/:id',async (req,res)=>{
    let course = await Course.findById(req.params.id);
    
    if(req.body.name!=null){
        course.name = req.body.name;
    }
   
    if(req.body.students!==null && course.students.indexOf(req.body.students) <= -1 ){
     let students = course.students;
     students.push(req.body.students)
    console.log(students);
    course.students=students;
    }
    // if(req.params.courseRemove){
    //     const index = student.tutorials.indexOf(req.params.courseRemove);
    //     console.log(index);
    // }
    

    try{
        course = await course.save();
        res.json(course);
    }
    catch(ex){
        console.log(ex.message);
    }
});


router.put('/:id/:studentRemove',async (req,res)=>{
    let course = await Course.findById(req.params.id);
    
   
    if(req.params.studentRemove){
        const index = course.students.indexOf(req.params.studentRemove);
        console.log(index);
        if (index > -1) {
            course.students.splice(index, 1);
          }
        console.log(course.students);
    }
    try{
        course = await course.save();
        res.json(course);
    }
    catch(ex){
        console.log(ex.message);
    }
});


module.exports=router;

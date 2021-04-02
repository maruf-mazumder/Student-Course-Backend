const Course = require('../Models/courseModel');
const Student = require('../Models/studentModel');
const express = require('express');
const router =  express.Router();


router.get('/:id',async (req,res)=>{
 
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).send('Couldnt find the student with the given id')

    res.json(student);
});

router.delete('/:id',async (req,res)=>{
 
    const student = await Student.findByIdAndRemove(req.params.id);
    if(!student) return res.status(404).send('Couldnt find the student with the given id')

    res.json(student);
});

router.get('/',async (req,res)=>{
 
    const students = await Student.find();
    if(!students) return res.status(404).send('Couldnt find the course with the given id')

    res.json(students);
});


router.post('/',async (req,res)=>{
    let tutorials = [];
    tutorials[tutorials.length]=req.body.tutorials
    console.log(tutorials);
 
 let student = new Student({
     name:req.body.name,
     tutorials:tutorials,
     DOB:req.body.DOB,
     Email:req.body.Email
 });
    try{
        student = await student.save();
        res.json(student);
    }
    catch(ex){
        console.log(ex.message);
    }
});



router.put('/:id',async (req,res)=>{
    let student = await Student.findById(req.params.id);
    student.name = req.body.name;
    if(req.body.tutorials!==null  && student.tutorials.indexOf(req.body.tutorials) <= -1 ){
     let tutorials = student.tutorials;
    tutorials.push(req.body.tutorials)
    console.log(tutorials);
    student.tutorials=tutorials;
    }
    // if(req.params.courseRemove){
    //     const index = student.tutorials.indexOf(req.params.courseRemove);
    //     console.log(index);
    // }
    

    try{
        student = await student.save();
        res.send(student);
    }
    catch(ex){
        console.log(ex.message);
    }
});



router.put('/:id/:courseRemove',async (req,res)=>{
    let student = await Student.findById(req.params.id);
    
   
    if(req.params.courseRemove){
        const index = student.tutorials.indexOf(req.params.courseRemove);
        console.log(index);
        if (index > -1) {
            student.tutorials.splice(index, 1);
          }
        console.log(student.tutorials);
    }
    

    try{
        student = await student.save();
        res.json(student);
    }
    catch(ex){
        console.log(ex.message);
    }
});


module.exports=router;

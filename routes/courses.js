const express = require('express');
const Course = require('../models/Course');
const router = express.Router();


//Getting all courses.
router.get("/", async (req, res)=>{
 
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.json(error);
    }

});



//Getting single course.
router.get("/:courseId", async (req, res)=>{
 
    const courseId = await req.params.courseId;

    try {
        const course = await Course.findByID(courseId);
        res.json(course);
    } catch (error) {
        res.json(error);
    }

});



//Creating new course.
router.post("/", async (req, res)=>{
     
    try {
        const course = await Course.create(req.body);
        res.json(course);
    } catch (error) {
        res.json(error);
    }

});


//Deleting a course.
router.delete("/:courseId", async (req, res)=>{
     
    try {
        await Course.deleteOne({_id: req.params.courseId});
        res.status(200).json({
            "message": "Course deleted."
        });
    } catch (error) {
        res.json({
            "error": "error occured."
        });
    }

});



//Updating a course.
router.put("/:courseId", async (req, res)=>{
     
    const courseId = req.params.courseId;
    try {
        await Course.updateOne(
            {
            "_id": courseId
            },
            req.body
        );

        res.status(200).json({
            "message": "Course updated."
        });
    } catch (error) {
        res.json(error);
    }

});



module.exports = router;
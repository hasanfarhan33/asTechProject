import express from 'express'; 

const router = express.Router() 


// IMPORTING CONTROLLERS 
import studentController from '../controller/studentController.js';

// GET ALL STUDENTS 
router.get("/", studentController.getAllStudents); 

// GET ONE STUDENT 
router.get("/:id", studentController.getOneStudent); 

// POST STUDENT 
router.post("/", studentController.addAStudent); 

// UPDATE STUDENT 
router.put("/:id", studentController.updateStudentInfo); 

// DELETE STUDENT
router.delete("/:id", studentController.deleteStudent); 

export default router; 
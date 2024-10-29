import express from 'express'

// Importing the controller 
import examResultsController from '../controller/examResultsController.js'; 

const router = express.Router(); 



// GET ALL EXAMS RESULTS 
router.get("/", examResultsController.getExamResults); 

// GET STUDENT EXAM RESULTS 
router.get("/:sId", examResultsController.getStudentResults); 

// ADD EXAM RESULT 
router.post("/", examResultsController.addExamResult); 

// UPDATE AN EXAM RESULT 
router.put("/", examResultsController.updateExamResult); 

router.delete("/id", examResultsController.deleteExamResult); 

export default router; 
import db from '../server/config/db.js'

// GET ALL EXAM RESULTS 
const getExamResults = (req, res) => {
    db.query("SELECT * from examresults", (err, results) => {
        // Server error 
        if (err) return res.status(500).json({error: err.message}); 
        res.status(200).json(results); 
    })
}

// GET EXAM RESULT FOR A CERTAIN STUDENT
const getStudentResults = (req, res) => {
    const sId = req.params.sId; 

    db.query("SELECT * from examresults WHERE studentId = ?", [sId], (err, results) => {
        if (err) return res.status(500).json({error: err.message}); 
        
        // No results found  
        if (results.length === 0) return res.status(404).json({error: `Student ${sId} hasn't done any exams yet}`}); 

        res.status(200).json(results); 
    })
}

// ADD AN EXAM RESULT
const addExamResult = (req, res) => {
    const {examName, examDate, examTime, examHours, examResult, studentId} = req.body

    // Check if the student exists in the student table 
    db.query("SELECT * from students WHERE studentId = ?", [studentId], (err, results) => {
        if (err) return res.status(500).json({error: err.message}); 

        // Student does not exist 
        if (results.lenght === 0) return results.status(404).json({error: `Student ${studentId} does not exist`}); 

        // Add into the database if the student exists 
        db.query("INSERT INTO examresults (examName, examDate, examTime, examHours, examResult, studentId) VALUES (?, ?, ?, ?, ?, ?)", [examName, examDate, examTime, examHours, examResult, studentId], (err, results) => {
            if (err) return res.status(400).json({error: err.message}); 
            res.status(201).json({id: results.insertId, examName, examTime, examHours, examResult, studentId})
        })
    })
}

// UPDATE AN EXAM RESULT (ASSUMING THAT YOU ONLY WANT TO UPDATE THE RESULT, NOT THE INFO)
const updateExamResult = (req, res) => {
    const {studentId, examName, examDate, examResult} = req.body; 

    // checking if the student exists 
    db.query("SELECT * from students where studentId = ?", [studentId], (err, results) => {
        if (err) return res.status(500).json({error: err.message}); 

        // Student does not exist 
        if (results.length === 0) return res.status(404).json({error: `Student ${studentId} does not exist`}); 

        // Update the result of the student 
        db.query("UPDATE examresults SET examResult = ? WHERE examName = ? AND examDate = ? AND studentId = ?", [examResult, examName, examDate, studentId], (err, results) => {
            if (err) return res.status(500).json({error: err.message}); 
            if (results.length === 0) return res.status(404).json({error: "Exam does not exist"}); 

            res.status(200).json({id: results.insertId, examName, examResult, studentId})
        })
    })
}

// DELETE AND EXAM RESULT 
const deleteExamResult = (req, res) => {
    const id = req.params.id 

    // checking if the exam exists 
    db.query("SELECT * from examresults where id = ?", [id], (err, results) => {
        if (err) return results.status(500).json({error: err.message}); 
        if (results.length === 0) return res.status(404).json({error: "Exam does not exist"}); 

        db.query("DELETE from examresults WHERE id = ?", [id], (err, results) => {
            if (err) return results.status(500).json({error: err.message}); 
            res.status(200).json(results); 
        })
    })
}

export default {getExamResults, getStudentResults, addExamResult, updateExamResult, deleteExamResult}

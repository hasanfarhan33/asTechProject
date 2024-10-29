import db from '../server/config/db.js'

// GET all students 
const getAllStudents = (req, res) => {
    db.query('SELECT * from students', (err, results) => {
        if (err) return results.status(500).json({error: err.message}); 
        res.json(results); 
    })
}

// GET single student 
const getOneStudent = (req, res) => {
    const id = req.params.id
    db.query('SELECT * from students WHERE id = ?', [id], (err, results) => {
        if(err) return res.status(404).json({error:err.message}); 
        res.json(results); 
    })
}

// POST a student 
const addAStudent = (req, res) => {
    const [firstName, lastName, studentId, email, password] = req.body

    // Checking if the email already exists 
    db.query('SELECT * from students WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({error: err.message}); 
        if (results.length > 0) return res.status(400).json({error: "Email already exists"})

        // Inserting into the database 
        db.query("INSERT INTO students (firstName, lastName, studentId, email, password) VALUES (?,?,?,?,?)", [firstName, lastName, studentId, email, password], (err, results) => {
            if (err) return res.status(500).json({error: err.message}); 
            res.status(201).json({id: results.insertId, firstName, lastName, studentId, email, password})
        })
    })
}

// UPDATE a student 
const updateStudentInfo = (req, res) => {
    const id = req.params.id 

    let {firstName, lastName, studentId, email, password} = req.body; 

    // Check if the student exists or not 
    db.query('SELECT * from students WHERE id = ?', [id], (err, results) => {
        // If the student does not exist in the database 
        if (err) return res.status(500).json({error: err.message}); 
        if (results.length === 0) return res.status(404).json({error: 'STUDENT not found'}); 

    const currData = results[0] 

    if (firstName === undefined) {
        firstName = currData.firstName; 
    } else {
        firstName = req.body.firstName; 
    }

    if(lastName === undefined) {
        lastName = currData.lastName; 
    } else {
        lastName = req.body.lastName; 
    }

    if (studentId === undefined) {
        studentId = currData.studentId; 
    } else {
        studentId = req.body.studentId; 
    }

    if (email === undefined) {
        email = currData.email; 
    } else {
        email = req.body.email; 
    }

    if (password === undefined) {
        password = currData.password; 
    } else {
        password = req.body.password; 
    }

    db.query("UPDATE students SET firstName = ?, lastName = ?, studentId = ?, email = ?, password = ? WHERE id = ?", [firstName, lastName, studentId, email, password, id], (err, results) => {
        if (err) return res.status(500).json({error: err.message}); 
        return res.status(200).json(results); 
    })

    })
}

// DELETE a student 
const deleteStudent = (req, res) => {
    const id = req.params.id; 

    // Checking if the student exists 
    db.query('SELECT * from students WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        if (results.length === 0) return res.status(404).json({error: "Student does not exist!"}); 

        // Deleting the student 
        db.query('DELETE FROM students where id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({error: err.message}); 
            res.status(200).json(results); 
        })
    })
}

export default {getAllStudents, getOneStudent, addAStudent, updateStudentInfo, deleteStudent}; 
import express from 'express'
import db from '../server/config/db.js' 

const router = express.Router(); 

router.get("/testAuthServer", (req, res) => {
    console.log(res.json({mssg: "THIS IS WORKING!"}))
})

// Login 
router.post('/login', (req, res) => {
    const{email, password} = req.body; 
    db.query(`SELECT * from students WHERE email = ?`, [email], (err, results) => {
        if (err) {
            return res.status(500).json({error: "Query Failed"})
        }

        if (results.length === 0) {
            return res.status(404).json({error: "The email does not exist"})
        }

        const user = results[0] 
        if (password !== user.password) {
            return res.status(401).json({error: "Invalid Password"}); 
        }

        res.json({message: 'Login Successful', user: {firstName: user.firstName, lastName: user.lastName, 
                                                        studentId: user.studentId, email: user.email, password: user.password}}); 
        
    })

    console.log("THIS IS WORKING")
})

// Register 

export default router; 
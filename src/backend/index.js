import cors from 'cors';
import db from './server/config/db.js';
import express from 'express';

// IMPORTING ROUTERS 
import authRouter from './routes/authRoutes.js'; 
import studentRouter from '../backend/routes/studentRoutes.js'   
import examResultsRouter from '../backend/routes/examResultsRoutes.js'; 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

// Checking if connected or not 
db.getConnection((err, connection) => {
    if (err) throw err; 
    console.log(`Connected to the server`) 
    connection.release(); 
})

// Adding the routers 
app.use("/api/auth", authRouter); 
app.use("/api/students", studentRouter); 
app.use("/api/examResults", examResultsRouter); 

const PORT = 4000; 

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`)
})
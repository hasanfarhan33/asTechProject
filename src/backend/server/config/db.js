import mysql from 'mysql'; 

// Connecting to DB  
const db = mysql.createPool({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "astechproject", 
    port: 3306,
    waitForConnections: true,
    queueLimit: 0 
    
})

export default db; 
import {Link} from 'react-router-dom'
import { useState } from 'react';

const LoginPage = () => {

    const[email, setEmail] = useState(''); 
    const[password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();  
        console.log("Email: ", email); 
        console.log("Password: ", password); 
    }

    return (
        // TODO: Figure out how to authenticate and login! 
        <>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                    <br /><br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    <br /><br />
                    <button type='submit' onClick={handleSubmit}>Login</button>
                </form>

                <p>Not a user yet? Click <Link to="/register">here</Link> to register.</p>
            </div>
        </>
    )
}

export default LoginPage; 
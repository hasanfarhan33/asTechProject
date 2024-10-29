const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName"/>
                <br />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" />
                <br />
                <label htmlFor="emailAddress">Email: </label>
                <input type="email" name="emailAddress"/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password"/>
                <br />
                <label htmlFor="passwordAgain">Password Again: </label>
                <input type="password" name="passwordAgain"/>
                <br />
                <label htmlFor="studentId">Student ID: </label>
                <input type="number" name="studentId"/>
                <br /><br />
                <button>Register!</button>
            </form>
        </div>
    )
}

export default RegisterPage;  
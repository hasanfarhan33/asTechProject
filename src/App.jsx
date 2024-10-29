import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'; 
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<LoginPage></LoginPage>}></Route>
        <Route path = "/register" element = {<RegisterPage></RegisterPage>}></Route>
      </Routes>
    </Router>
  )
}

export default App; 

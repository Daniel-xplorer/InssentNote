import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import RegisterForm from "./routes/login/components/create_acount/form.jsx";
import LoginForm from "./routes/login/components/login_form/loginForm.jsx";
import Navbar from "./routes/navbar/components/navbar.jsx";

const loggedIn = false;


const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <LoginForm/> }/>
                {/* <Route exact path="/" element={ 
                    loggedIn ? <Navigate to="/home" /> : <Navigate to="/loggin" /> 
                    }>
                </Route>
                <Route path="home" element={ <Navbar/> }/>
                <Route path="loggin" element={ <RegisterForm/> }/> */}
            </Routes>
        </div>
    );
};

export default App;
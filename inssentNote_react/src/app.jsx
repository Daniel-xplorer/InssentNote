
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./routes/login/components/create_acount/register_form.jsx";
import LoginForm from "./routes/login/components/login_form/loginForm.jsx";
import Navbar from "./routes/navbar/components/navbar.jsx";
//ruta controladora para el login
import RouteController from "./config/route_controller"
import logout from './routes/navbar/logout/logout.jsx';




const App = () => {
    return (
        <div>
            <Navbar/> 
            <Routes>
                <Route path="/" element={ <LoginForm/> }/>
                <Route path="/home" element={
                    <RouteController Component={ Navbar }/>
                }/>
                <Route path="/logout" element={
                    <RouteController Component={ logout }/>
                }/>
                <Route path="/register" element={ <RegisterForm/> }/>
            </Routes>
        </div>
    );
};

export default App;
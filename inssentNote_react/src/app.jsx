
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./routes/login/components/create_acount/register_form.jsx";
import LoginForm from "./routes/login/components/login_form/loginForm.jsx";
import Navbar from "./routes/navbar/components/navbar.jsx";
//ruta controladora para el login
import RouteController from "./config/route_controller"
import logout from './routes/navbar/logout/logout.jsx';
import home from "./routes/home/home.jsx";
import Note from "./routes/new_note/editNote.js";
import Notes from "./routes/notes/notes.jsx";
import Options from "./routes/Options/index.jsx";
import DeletesNotes from "./routes/options/deleted_notes/deletes_notes.jsx";
import EditNote from "./routes/edit_note/edit_note.jsx";
import ClientForm from "./routes/clients/formulario/clientForm.jsx"
import ClientList from "./routes/clients/client_list/clientList.jsx";




const App = () => {
    return (
        <div>
            <Navbar/> 
            <Routes>
                <Route path="/" element={ <LoginForm/> }/>
                <Route path="/home" element={
                    <RouteController Component={ home }/>
                }/>
                <Route path="/logout" element={
                    <RouteController Component={ logout }/>
                }/>
                <Route path="/register" element={ <RegisterForm/> }/>
                <Route path="/note" element={ 
                    <RouteController Component={ Note }/>
                }/>
                <Route path="/notes" element={
                    <RouteController Component={ Notes }/>
                }/>
                <Route path="/options" element={
                    <RouteController Component={ Options }/>
                }>
                    {/* establecer deleted notes como ruta anidada, solucinar problema */}
                </Route>
                <Route path="/options/deleted_notes" element={
                    <RouteController Component={ DeletesNotes }/>
                }/>
                <Route path="/edit_note/:register" element={
                    <RouteController Component={ EditNote }/>
                }/>
                {/* rutas de clientes */}
                <Route path="/clients" element={
                    <RouteController Component={ ClientList }/>
                }/>
                <Route path="/clients/register" element={
                    <RouteController Component={ ClientForm }/>
                }/>
            </Routes>
        </div>
    );
};

export default App;
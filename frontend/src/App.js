import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/" element={<Dashboard/>}></Route>
            </Routes>
        </div>
    );
}

export default App;

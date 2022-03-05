import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Todos from "./pages/Todos";
import User from "./pages/User";
axios.defaults.baseURL = 7789;
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

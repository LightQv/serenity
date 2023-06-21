import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import NavBar from "./components/user/NavBar";
import PatientsManagement from "./pages/admin/PatientsManagement";
import PatientsRegister from "./pages/admin/PatientsRegister";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/patient" element={<PatientsManagement />} />
        <Route path="/admin/register" element={<PatientsRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

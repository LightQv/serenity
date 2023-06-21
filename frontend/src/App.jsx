import { Routes, Route } from "react-router-dom";
import Layout from "./components/routes/Layout";
import RequireAuth from "./components/routes/RequireAuth";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/user/Dashboard";
import PatientsManagement from "./pages/admin/PatientsManagement";
import PatientsRegister from "./pages/admin/PatientsRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="" element={<Welcome />} />
        <Route path="login" element={<Login />} />

        {/* Private routes */}
        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/patients" element={<PatientsManagement />} />
          <Route path="admin/register" element={<PatientsRegister />} />
        </Route>
        {/* User routes */}
        <Route element={<RequireAuth allowedRoles={["user"]} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

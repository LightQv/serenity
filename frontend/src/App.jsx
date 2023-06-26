import { Routes, Route } from "react-router-dom";
import Layout from "./components/routes/Layout";
import RequireAuth from "./components/routes/RequireAuth";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtocoles from "./pages/admin/AdminProtocoles";
import AdminInterventions from "./pages/admin/AdminInterventions";
import Dashboard from "./pages/user/Dashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminPractitioners from "./pages/admin/AdminPractitioners";
import EditPatient from "./components/admin/patients/EditPatient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="" element={<Welcome />} />
        <Route path="login" element={<Login />} />

        {/* Private routes */}
        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles="admin" />}>
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/interventions" element={<AdminInterventions />} />
          <Route path="admin/patients" element={<AdminPatients />} />
          <Route path="admin/patients/:id" element={<EditPatient />} />
          <Route path="admin/practitioners" element={<AdminPractitioners />} />
          <Route path="admin/protocols" element={<AdminProtocoles />} />
        </Route>
        {/* User routes */}
        <Route element={<RequireAuth allowedRoles="user" />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

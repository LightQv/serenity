import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/routes/RequireAuth";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPractitioners from "./pages/admin/AdminPractitioners";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminInterventions from "./pages/admin/AdminInterventions";
import AdminOperation from "./pages/admin/AdminOperation";
import AdminProtocoles from "./pages/admin/AdminProtocoles";
import Dashboard from "./pages/user/Dashboard";
import DetailPatient from "./components/admin/patients/DetailPatient";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      {/* Private routes */}
      {/* Admin routes */}
      <Route element={<RequireAuth allowedRoles="admin" />}>
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/practitioners" element={<AdminPractitioners />} />
        <Route path="admin/patients" element={<AdminPatients />} />
        <Route path="admin/patients/:id" element={<DetailPatient />} />
        <Route path="admin/interventions" element={<AdminInterventions />} />
        <Route path="admin/operations" element={<AdminOperation />} />
        <Route path="admin/protocols" element={<AdminProtocoles />} />
      </Route>
      {/* User routes */}
      <Route element={<RequireAuth allowedRoles="user" />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

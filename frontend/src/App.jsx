import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/routes/RequireAuth";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPractitioners from "./pages/admin/AdminPractitioners";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminInterventions from "./pages/admin/AdminInterventions";
import AdminOperations from "./pages/admin/AdminOperations";
import AdminProtocoles from "./pages/admin/AdminProtocoles";
import Dashboard from "./pages/user/Dashboard";
import Operations from "./pages/user/Operations";
import Administratives from "./pages/user/Administratives";
import Checklist from "./pages/user/Checklist";
import AdminPatientDetails from "./pages/admin/AdminPatientDetails";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      {/* Private routes */}
      {/* Admin routes */}
      <Route element={<RequireAuth allowedRoles="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/practitioners" element={<AdminPractitioners />} />
        <Route path="/admin/patients" element={<AdminPatients />} />
        <Route path="/admin/patients/:id" element={<AdminPatientDetails />} />
        <Route path="/admin/interventions" element={<AdminInterventions />} />
        <Route path="/admin/operations" element={<AdminOperations />} />
        <Route path="/admin/protocols" element={<AdminProtocoles />} />
      </Route>
      {/* User routes */}
      <Route element={<RequireAuth allowedRoles="user" />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="protocols/:id" element={<Dashboard />} />
        <Route path="contact" element={<Dashboard />} />
        <Route path="operations" element={<Operations />} />
        <Route path="administratives" element={<Administratives />} />
        <Route path="checklist" element={<Checklist />} />
      </Route>
    </Routes>
  );
}

export default App;

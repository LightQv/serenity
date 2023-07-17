import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/routes/RequireAuth";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPractitioners from "./pages/admin/AdminPractitioners";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminPatientDetails from "./pages/admin/AdminPatientDetails";
import AdminInterventions from "./pages/admin/AdminInterventions";
import AdminOperations from "./pages/admin/AdminOperations";
import AdminProtocoles from "./pages/admin/AdminProtocoles";
import Dashboard from "./pages/user/Dashboard";
import Protocols from "./pages/user/Protocols";
import Contact from "./pages/user/Contact";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      {/* <Route index element={<ToastContainer limit={1} />} /> */}
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
        <Route path="protocols/:id" element={<Protocols />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;

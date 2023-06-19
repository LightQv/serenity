import React from "react";
import { NavLink } from "react-router-dom";
import logoNavbar from "../assets/logo-navbar.svg";
import logoDashboard from "../assets/logo-dashboard.svg";
import logoIntervention from "../assets/logo-interventions.svg";
import logoOperations from "../assets/logo-operations.svg";
import logoPraticiens from "../assets/logo-praticiens.svg";
import logoPatients from "../assets/logo-patients.svg";
import logoProtocols from "../assets/logo-protocols.svg";

function Navbar() {
  return (
    <nav>
      <img
        src={logoNavbar}
        alt="logoNavbar"
        className="getActiveLinkClassName"
      />
      <ul>
        <NavLink to="/dashboard" className="">
          <img src={logoDashboard} alt="logoDashboard" className="" />
          Dashboard
        </NavLink>
        <NavLink to="/practitiens" className="">
          <img src={logoPraticiens} alt="logoPraticiens" className="" />
          Praticiens
        </NavLink>
        <NavLink to="/patients" className="">
          <img src={logoPatients} alt="logoPatients" className="" />
          Patients
        </NavLink>
        <NavLink to="/interventions" className="">
          <img src={logoIntervention} alt="logoIntervention" className="" />
          Mes interventions
        </NavLink>
        <NavLink to="/operations" className="">
          <img src={logoOperations} alt="logoOperations" className="" />
          Mes opérations
        </NavLink>
        <NavLink to="/protocols" className="">
          <img src={logoProtocols} alt="logoProtocols" className="" />
          Mes protocoles
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;

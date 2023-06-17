import React from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function Dashboard() {
  const { user } = useUserContext();
  return (
    <main className="min-w-screen min-h-screen bg-slate-100 font-poppins">
      <h1>
        {user.firstname} {user.lastname}
      </h1>
      <h3>
        {user.address_streetname}, {user.city}
      </h3>
    </main>
  );
}

import React from "react";
import ProtocolsList from "../../components/admin/protocols/ProtocolsList";

export default function AdminProtocoles() {
  return (
    <main className="min-w-screen min-h-screen bg-slate-50 p-4 font-poppins lg:ml-60">
      <h3 className="text-2xl font-semibold">Gestion des protocoles</h3>
      <ProtocolsList />
    </main>
  );
}

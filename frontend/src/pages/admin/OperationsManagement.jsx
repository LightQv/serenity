import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminListOperations from "../../components/admin/AdminListOperations";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function OperationsManagement() {
  const [listOperations, setListOperations] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/users`)
      .then((response) => setListOperations(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-w-screen relative min-h-screen bg-slate-50 p-10 font-poppins lg:ml-60">
      <button
        type="submit"
        className="ml-8 mr-8 mt-4 rounded-lg bg-violet-dark-0 p-2 text-base font-bold text-white"
      >
        Ajouter une opération
      </button>
      <div>
        {listOperations.map((listOperation) => (
          <AdminListOperations
            key={listOperation.id}
            listOperations={listOperation}
          />
        ))}
      </div>
    </main>
  );
}

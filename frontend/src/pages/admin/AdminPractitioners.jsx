import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PractitionersList from "../../components/admin/practitioners/PractitionersList";
import AddPractitioner from "../../components/admin/practitioners/AddPractitioner";
import DeletePractitioner from "../../components/admin/practitioners/DeletePractitioner";
import EditPractitioner from "../../components/admin/practitioners/EditPractitioner";
import APIService from "../../services/APIService";

export default function AdminPractitioners() {
  const [practitioners, setPractitioners] = useState([]);
  const [practitionerToDelete, setPractitionerToDelete] = useState(null);
  const [practitionerToEdit, setPractitionerToEdit] = useState(null);

  const fetchPractitioners = async () => {
    try {
      const response = await APIService.get(`/practitioners`);
      setPractitioners(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPractitioner = async (surname) => {
    try {
      const response = await APIService.post(`/practitioners`, { surname });
      if (response.status === 201) {
        fetchPractitioners();
        toast.success("Practitioner added successfully !");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePractitioner = async (practitionerId) => {
    try {
      const response = await APIService.delete(`/practitioners`, {
        practitionerId,
      });
      if (response.status === 200) {
        fetchPractitioners();
        toast.success("Practitioner deleted successfully !");
        setPractitionerToDelete(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveEditedPractitioner = async (practitionerId, surname) => {
    try {
      const response = await APIService.put(`/practitioners`, {
        practitionerId,
        surname,
      });
      if (response.status === 200) {
        fetchPractitioners();
        toast.success("Practitioner edited successfully!");
        setPractitionerToEdit(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPractitioners();
  }, []);

  return (
    <div>
      <h1>Gestion des praticiens</h1>
      <PractitionersList
        practitioners={practitioners}
        deletePractitioner={deletePractitioner}
        editPractitioner={saveEditedPractitioner}
      />
      <AddPractitioner addPractitioner={addPractitioner} />
      {practitionerToDelete && (
        <DeletePractitioner
          practitioner={practitionerToDelete}
          deletePractitioner={deletePractitioner}
        />
      )}
      {practitionerToEdit && (
        <EditPractitioner
          practitioner={practitionerToEdit}
          saveEditedPractitioner={saveEditedPractitioner}
        />
      )}
    </div>
  );
}

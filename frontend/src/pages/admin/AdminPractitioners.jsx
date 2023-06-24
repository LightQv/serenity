import React, { useEffect, useState } from "react";
import PractitionersList from "../../components/admin/practitioners/PractitionersList";
import Modal from "../../components/admin/Modal";
import AddPractitioner from "../../components/admin/practitioners/AddPractitioner";
import DeletePractitioner from "../../components/admin/practitioners/DeletePractitioner";
import EditPractitioner from "../../components/admin/practitioners/EditPractitioner";
import APIService from "../../services/APIService";

export default function AdminPractitioners() {
  const [practitioners, setPractitioners] = useState(null);
  const [isShow, setIsShow] = useState({
    modalA: false,
    modalB: false,
    modalC: false,
  });
  const [selectedPractitioner, setSelectedPractitioner] = useState();

  useEffect(() => {
    APIService.get(`/practitioners`)
      .then((res) => setPractitioners(res.data))
      .catch((error) => console.warn(error));
  }, [isShow]);

  if (!practitioners) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des praticiens
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        {practitioners.length !== 0 ? (
          <ul className="grid w-full grid-cols-1">
            {practitioners.map((practitioner) => (
              <PractitionersList
                key={practitioner.id}
                practitioner={practitioner}
                selectedPractitioner={selectedPractitioner}
                setSelectedPractitioner={setSelectedPractitioner}
                setIsShow={setIsShow}
              />
            ))}
          </ul>
        ) : null}
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow({ modalA: true })}
        >
          Ajouter un praticien
        </button>
      </div>
      <div
        className={
          isShow.modalA ||
          (isShow.modalB && selectedPractitioner !== "") ||
          (isShow.modalC && selectedPractitioner !== "")
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalA ? (
          <Modal component={<AddPractitioner />} setIsShow={setIsShow} />
        ) : null}
        {isShow.modalB && selectedPractitioner !== "" ? (
          <Modal
            component={
              <EditPractitioner
                selectedPractitioner={selectedPractitioner}
                setSelectedPractitioner={setSelectedPractitioner}
              />
            }
            setIsShow={setIsShow}
          />
        ) : null}
        {isShow.modalC && selectedPractitioner !== "" ? (
          <Modal
            component={
              <DeletePractitioner
                selectedPractitioner={selectedPractitioner}
                setSelectedPractitioner={setSelectedPractitioner}
                setIsShow={setIsShow}
              />
            }
            setIsShow={setIsShow}
          />
        ) : null}
      </div>
    </main>
  );
}

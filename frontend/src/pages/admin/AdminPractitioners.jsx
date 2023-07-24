import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PractitionerDetails from "../../components/admin/practitioners/PractitionerDetails";
import Modal from "../../components/admin/Modal";
import AddPractitioner from "../../components/admin/practitioners/AddPractitioner";
import DeletePractitioner from "../../components/admin/practitioners/DeletePractitioner";
import EditPractitioner from "../../components/admin/practitioners/EditPractitioner";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/ToastNotificationService";
import Pagination from "../../components/admin/Pagination";
import SearchBar from "../../components/admin/SearchBar";

export default function AdminPractitioners() {
  const [practitioners, setPractitioners] = useState(null);
  const [isShow, setIsShow] = useState({
    modalAdd: false,
    modalEdit: false,
    modalDelete: false,
  });
  const [selectedPractitioner, setSelectedPractitioner] = useState();
  const limitPerPage = 5;
  const defaultPage = 1;
  const defaultSearch = "";
  const [maxPage, setMaxPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams({
    page: defaultPage,
    term: defaultSearch,
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"), 10) || defaultPage
  );
  const [searchValue, setSearchValue] = useState(
    searchParams.get("term") || defaultSearch
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setSearchParams((params) => {
      if (searchValue.length >= 1) {
        setCurrentPage(1);
      }
      searchParams.set("page", currentPage);
      searchParams.set("term", searchValue);
      return params;
    });

    APIService.get(
      `/practitioners-list?page=${currentPage}&term=${searchValue}`
    )
      .then((res) => {
        // on récupère data = total des practitioner et datas = tableau des pracitioner
        setPractitioners(res.data.datas);
        setMaxPage(Math.ceil(res.data.total / limitPerPage));
      })
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, [searchValue, currentPage, isShow]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setSearchParams(searchParams.set("term", value));
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-12 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Gestion des praticiens
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:shadow-xl">
        <div className="flex w-full flex-col-reverse justify-between lg:my-1 lg:mt-4 lg:flex-row lg:items-center lg:px-4">
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            type="praticien"
          />
          <button
            type="button"
            className="my-4 h-fit w-fit self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 lg:my-0"
            onClick={() => setIsShow({ modalAdd: true })}
          >
            Ajouter un praticien
          </button>
        </div>
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-slate-200 lg:h-20 lg:border-gray-300 lg:px-4">
          <p className="text-sm">Nom du praticien</p>
          <div className="flex items-center gap-2 lg:pr-3">
            <p className="text-xs italic text-gray-500">Interactions</p>
          </div>
        </div>
        {practitioners && practitioners.length !== 0 ? (
          <ul className="grid w-full grid-cols-1">
            {practitioners.map((practitioner) => (
              <PractitionerDetails
                key={practitioner.id}
                practitioner={practitioner}
                selectedPractitioner={selectedPractitioner}
                setSelectedPractitioner={setSelectedPractitioner}
                setIsShow={setIsShow}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-2 self-center text-xs lg:mb-4 lg:mt-8 lg:text-base">
            Aucun praticien disponible.
          </p>
        )}
        {practitioners && practitioners.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
            maxPage={maxPage}
          />
        )}
      </div>
      <div
        className={
          isShow.modalAdd || isShow.modalEdit || isShow.modalDelete
            ? "fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
            : "hidden"
        }
      >
        {isShow.modalAdd && (
          <Modal
            component={<AddPractitioner setIsShow={setIsShow} />}
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalEdit && (
          <Modal
            component={
              <EditPractitioner
                selectedPractitioner={selectedPractitioner}
                setSelectedPractitioner={setSelectedPractitioner}
                setIsShow={setIsShow}
              />
            }
            setIsShow={setIsShow}
          />
        )}
        {isShow.modalDelete && (
          <Modal
            component={
              <DeletePractitioner
                selectedPractitioner={selectedPractitioner}
                setSelectedPractitioner={setSelectedPractitioner}
                setIsShow={setIsShow}
                practitioner={practitioners}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
            setIsShow={setIsShow}
          />
        )}
      </div>
    </main>
  );
}

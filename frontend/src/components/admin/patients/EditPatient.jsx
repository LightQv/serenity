import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import { patientSchema } from "../../../services/validators";
import FormError from "../../FormError";

export default function EditPatient({
  selectedPatient,
  setSelectedPatient,
  setIsShow,
}) {
  const [patientInfo, setPatientInfo] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone_number: "",
    address_number: "",
    address_streetname: "",
    city: "",
    roles: "user",
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    APIService.get(`/users/${selectedPatient}`)
      .then((res) => {
        setPatientInfo(res.data);
      })
      .catch((error) => notifyError(`${error}"La requête a échoué"`));
  }, []);

  useEffect(() => {
    APIService.get(`/users/${selectedPatient}`)
      .then((res) => {
        setPatientInfo(res.data);
      })
      .catch((error) => notifyError(`${error}"La requête a échoué"}`));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patientSchema.isValidSync(patientInfo))
      try {
        const res = await APIService.put(
          `/users/${selectedPatient}`,
          patientInfo
        );

        if (res) {
          notifySuccess("Le patient a été modifié");
          setSelectedPatient();
          setIsShow({ modalEdit: false });
        } else throw new Error();
      } catch (err) {
        if (err.request?.status === 500) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      }
  };

  const handleChange = async (e) => {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value,
    });
    try {
      const isValid = await patientSchema.validate(patientInfo, {
        abortEarly: false,
      });
      if (isValid) {
        setErrors(null);
      }
      throw new Error();
    } catch (err) {
      setErrors(err.errors);
    }
  };
  if (!patientInfo) return null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1">
      <div>
        <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
          Modifier ce patient ?
        </h1>
      </div>
      <form
        action="addProtocol"
        className="gap-4 space-y-4 p-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:p-8"
        onSubmit={handleSubmit}
      >
        {errors && <FormError errors={errors} />}
        <div className="flex flex-col ">
          <label htmlFor="name" className="mb-2 text-base">
            Nom
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            defaultValue={patientInfo.lastname}
            required="required"
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstname" className="mb-2 text-base">
            Prénom
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            defaultValue={patientInfo.firstname}
            required="required"
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address_number" className="mb-2 text-base">
            Numéro de rue
          </label>
          <input
            type="text"
            name="address_number"
            id="address_number"
            defaultValue={patientInfo.address_number}
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address_streetname" className="mb-2 text-base">
            Adresse
          </label>
          <input
            type="text"
            name="address_streetname"
            id="address_streetname"
            defaultValue={patientInfo.address_streetname}
            required="required"
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-2 text-base">
            Ville
          </label>
          <input
            type="text"
            name="city"
            id="city"
            defaultValue={patientInfo.city}
            required="required"
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="téléphone" className="mb-2 text-base">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            defaultValue={patientInfo.phone_number}
            required="required"
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={patientInfo.email}
            required="required"
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center lg:h-fit lg:w-full lg:flex-col">
          <button
            type="submit"
            className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mb-0 lg:mt-5 lg:h-full lg:w-full"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}

EditPatient.propTypes = {
  selectedPatient: PropTypes.number.isRequired,
  setSelectedPatient: PropTypes.shape().isRequired,
  setIsShow: PropTypes.shape().isRequired,
};

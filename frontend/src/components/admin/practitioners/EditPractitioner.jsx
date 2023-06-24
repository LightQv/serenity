import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { practitionerSchema } from "../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";
import FormError from "../../FormError";

export default function EditPractitioner({
  selectedPractitioner,
  setSelectedPractitioner,
  setIsShow,
}) {
  const [surname, setSurname] = useState({
    practitioner_name: "",
  });
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (practitionerSchema.isValid)
      try {
        const res = await APIService.put(
          `/practitioners/${selectedPractitioner}`,
          surname
        );
        if (res) {
          notifySuccess("Le protocole a été modifié.");
          setSelectedPractitioner();
          setIsShow({ modalB: false });
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 500) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      }
  };

  const handleChange = async (e) => {
    setSurname({
      ...surname,
      [e.target.name]: e.target.value,
    });
    try {
      const isValid = await practitionerSchema.validate(surname, {
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

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
        Modifier ce praticien ?
      </h1>
      <form
        action="addPractitioner"
        className="gap-4 space-y-4 p-4 lg:p-8"
        onSubmit={handleSubmit}
      >
        {errors && <FormError errors={errors} />}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-base">
            Nom du praticien
          </label>
          <input
            type="text"
            name="practitioner_name"
            id="practitioner_name"
            placeholder="Nom du praticien"
            required=""
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}

EditPractitioner.propTypes = {
  selectedPractitioner: PropTypes.number.isRequired,
  setSelectedPractitioner: PropTypes.shape().isRequired,
  setIsShow: PropTypes.shape().isRequired,
};

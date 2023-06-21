import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import * as Yup from "yup";
import PropTypes from "prop-types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AddProtocol({ setIsShow }) {
  const [operations, setOperations] = useState(null);
  const [protocolInfos, setProtocolInfos] = useState({
    protocol_name: "",
    operation_id: "",
  });
  //   const [errorMsg, setErrorMsg] = useState({ email: "" });
  //   const [errorPw, setErrorPw] = useState({ password: "" });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/operations`)
      .then((res) => {
        setOperations(res.data);
      })
      .catch();
  }, []);

  //   const loginSchema = Yup.object({
  //     email: Yup.string()
  //       .email("Un email valide est requit")
  //       .required("Un email est requit"),
  //     password: Yup.string()
  //       .min(7, "Minimum 7 caractères")
  //       .max(30, "Maximum 30 caractères")
  //       .required("Mot de passe est requit"),
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (loginSchema.isValid)
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/protocols`,
        protocolInfos
      );
      if (res) {
        setIsShow(false);
        //   setUser(res.data.user);
        //   setToken(res.data.token);
        //   if (res.data.user.roles === "admin") {
        //     navigate("/admin/dashboard");
        //   } else navigate("/dashboard");
      } else throw new Error();
    } catch (error) {
      if (error.request.status === 401) {
        toast.error(
          `${error.request.status} : Email et/ou Mot de passe invalide.`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "colored",
          }
        );
      }
    }
  };

  const handleChange = async (e) => {
    setProtocolInfos({
      ...protocolInfos,
      [e.target.name]: e.target.value,
    });
    // try {
    //   const isValid = await loginSchema.validate(protocolInfos, {
    //     abortEarly: false,
    //   });
    //   if (isValid) return;
    //   throw new Error();
    // } catch (err) {
    //   if (err.inner[0]?.path === "email") {
    //     setErrorMsg({ email: err.inner[0].message });
    //   } else setErrorMsg({ email: "" });
    //   if (err.inner[1]?.path === "password") {
    //     setErrorPw({
    //       password: err.inner[1].message,
    //     });
    //   } else if (err.inner[0]?.path === "password") {
    //     setErrorPw({
    //       password: err.inner[0].message,
    //     });
    //   } else setErrorPw({ password: "" });
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="mb-1 text-lg lg:mb-4 lg:text-center lg:text-xl">
        Ajouter un protocole.
      </h1>
      <form
        action="addProtocol"
        className="space-y-4 p-4 lg:p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="name" className="mb-2 text-base">
              Nom du protocole
            </label>
            {/* {errorMsg.email !== "" ? (
              <p className="mb-2 text-xs text-red-500">{errorMsg.email}</p>
            ) : null} */}
          </div>
          <input
            type="text"
            name="protocol_name"
            id="protocol_name"
            placeholder="Nom du protocole"
            required=""
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="operation_name" className="mb-2 text-base">
              Sélectionner une opération
            </label>
            {/* {errorPw.password !== "" ? (
              <p className="mb-2 text-xs text-red-500">{errorPw.password}</p>
            ) : null} */}
          </div>
          <select
            name="operation_name"
            className="rounded-lg bg-gray-50 p-2 text-sm placeholder:italic"
          >
            <option
              value=""
              onClick={(e) =>
                setProtocolInfos({
                  ...protocolInfos,
                  operation_id: e.target.value,
                })
              }
            >
              ---
            </option>
            {operations &&
              operations.map((operation) => (
                <option
                  name="operation_name"
                  value={operation.id}
                  key={operation.id}
                  onClick={(e) =>
                    setProtocolInfos({
                      ...protocolInfos,
                      operation_id: e.target.value,
                    })
                  }
                >
                  {operation.operation_name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="h-fit w-48 self-center rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-4 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          >
            Ajouter un protocole
          </button>
        </div>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}

AddProtocol.propTypes = {
  setIsShow: PropTypes.func.isRequired,
};

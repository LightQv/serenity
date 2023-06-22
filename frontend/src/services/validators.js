import * as Yup from "yup";

export default function handleErrors() {}

export const loginSchema = Yup.object({
  email: Yup.string().email("Un email valide est requis"),
  password: Yup.string().min(7, "Minimum 7 caractères"),
});

export const protocolSchema = Yup.object({
  protocol_name: Yup.string().required("Le protocole doit être nommé."),
  operation_id: Yup.string().required("Une opération doit être sélectionnée."),
});

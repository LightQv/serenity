import * as Yup from "yup";

export default function handleErrors() {}

export const loginSchema = Yup.object({
  email: Yup.string().email("Un email valide est requis"),
  password: Yup.string().min(7, "Minimum 7 caractères"),
});

export const registerSchema = Yup.object({
  firstname: Yup.string()
    .min(3, "Prénom doit contenir 3 caractères minimum")
    .max(30, "Prénom doit contenir 30 caractères maximum"),
  lastname: Yup.string()
    .min(3, "Nom de famille doit contenir 3 caractères minimum")
    .max(30, "Nom de famille doit contenir 30 caractères maximum"),
  email: Yup.string()
    .max(255, "Email doit contenir 255 caractères maximum")
    .email("Un email valide est requis"),
  password: Yup.string()
    .min(7, "Minimum 7 caractères")
    .max(30, "Mot de passe doit contenir 30 caractères maximum"),
  phone_number: Yup.number()
    .min(10, "Numéro de téléphone doit contenir 10 chiffres")
    .max(10, "Numéro de téléphone doit contenir 10 chiffres"),
  address_number: Yup.number().nullable,
  address_streetname: Yup.string()
    .min(3, "Adresse doit contenir au moins 3 caractères")
    .max(100, "Adresse doit contenir moins de 100 caractères"),
  city: Yup.string()
    .min(3, "Ville doit contenir plus de 3 caractères")
    .max(100, "Ville doit contenir moins de 100 caractères"),
});

export const protocolSchema = Yup.object({
  protocol_name: Yup.string()
    .min(3, "Minimum 3 caractères")
    .required("Le protocole doit être nommé."),
  operation_id: Yup.string().required("Une opération doit être sélectionnée."),
});

export const operationSchema = Yup.object({
  operation_name: Yup.string().required("L'opération doit être nommé."),
});

export const practitionerSchema = Yup.object({
  surname: Yup.string().required("Le praticien doit être nommé."),
});

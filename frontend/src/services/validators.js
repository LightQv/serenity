import * as Yup from "yup";

export default function handleErrors() {}

export const loginSchema = Yup.object({
  email: Yup.string().email("Un email valide est requis"),
  password: Yup.string().min(7, "Minimum 7 caractères"),
});

export const registerSchema = Yup.object({
  lastname: Yup.string()
    .min(3, "Le nom de famille doit contenir 3 caractères minimum.")
    .max(30, "Le nom de famille doit contenir 30 caractères maximum."),
  firstname: Yup.string()
    .min(3, "Le prénom doit contenir 3 caractères minimum.")
    .max(30, "Le prénom doit contenir 30 caractères maximum."),
  email: Yup.string()
    .max(255, "L'email doit contenir 255 caractères maximum.")
    .email("Un email valide est requis."),
  password: Yup.string()
    .min(7, "Le mot de passe doit contenir 7 caractères minimum.")
    .max(30, "Le mot de passe doit contenir 30 caractères maximum."),
  phone_number: Yup.string()
    .min(10, "Le numéro de téléphone doit contenir 10 chiffres.")
    .max(10, "Numéro de téléphone doit contenir 10 chiffres."),
  address_number: Yup.string().nullable(),
  address_streetname: Yup.string()
    .min(3, "L'adresse doit contenir au moins 3 caractères.")
    .max(100, "L'adresse doit contenir moins de 100 caractères."),
  city: Yup.string()
    .min(3, "La ville doit contenir 3 caractères minimum.")
    .max(100, "La ville doit contenir moins de 100 caractères."),
});

export const patientSchema = Yup.object({
  lastname: Yup.string()
    .min(3, "Le nom de famille doit contenir 3 caractères minimum.")
    .max(30, "Le nom de famille doit contenir 30 caractères maximum."),
  firstname: Yup.string()
    .min(3, "Le prénom doit contenir 3 caractères minimum.")
    .max(30, "Le prénom doit contenir 30 caractères maximum."),
  email: Yup.string()
    .max(255, "L'email doit contenir 255 caractères maximum.")
    .email("Un email valide est requis."),
  phone_number: Yup.string()
    .min(10, "Le numéro de téléphone doit contenir 10 chiffres.")
    .max(10, "Numéro de téléphone doit contenir 10 chiffres."),
  address_number: Yup.string().nullable(),
  address_streetname: Yup.string()
    .min(3, "L'adresse doit contenir au moins 3 caractères.")
    .max(100, "L'adresse doit contenir moins de 100 caractères."),
  city: Yup.string()
    .min(3, "La ville doit contenir 3 caractères minimum.")
    .max(100, "La ville doit contenir moins de 100 caractères."),
});

export const protocolSchema = Yup.object({
  protocol_name: Yup.string()
    .required("Le protocole doit être nommé.")
    .min(3, "Nom : minimum 3 caractères"),
  operation_id: Yup.string().required("Une opération doit être sélectionnée."),
  color_theme: Yup.string().required("Un thème doit être sélectionné."),
});

export const itemSchema = Yup.object({
  protocol_item_name: Yup.string()
    .required("Le contenu doit être nommé.")
    .min(3, "Nom : minimum 3 caractères"),
  protocol_description: Yup.string()
    .required("Une description est requise.")
    .min(10, "Description : minimum 10 caractères"),
});

export const operationSchema = Yup.object({
  operation_name: Yup.string().required("L'opération doit être nommé."),
});

export const practitionerSchema = Yup.object({
  surname: Yup.string().required("Le praticien doit être nommé."),
});

export const interventionSchema = Yup.object({
  lastname: Yup.string()
    .min(3, "Le nom de famille doit contenir 3 caractères minimum.")
    .max(30, "Le nom de famille doit contenir 30 caractères maximum."),
  firstname: Yup.string()
    .min(3, "Le prénom doit contenir 3 caractères minimum.")
    .max(30, "Le prénom doit contenir 30 caractères maximum."),
});

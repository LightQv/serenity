const Joi = require("joi");

// Schema for register user
const userSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).required().messages({
    "any.required": "Un prénom est requis",
    "string.min": "Firstname should be min 3 characters",
    "string.max": "Firstname should be max 30 characters",
  }),
  lastname: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .required(),
  password: Joi.string().min(7).max(30).required(),
  phoneNumber: Joi.number().integer().precision(10),
  addressNumber: Joi.number().min(1).less(10000),
  addressStreetname: Joi.string().min(3).max(100),
  city: Joi.string().min(3).max(50),
  roles: Joi.string(),
});

// Validator for register user
const validateUser = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phone_number: phoneNumber,
    address_number: addressNumber,
    address_streetname: addressStreetname,
    city,
    roles,
  } = req.body;

  const { error } = userSchema.validate(
    {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      addressNumber,
      addressStreetname,
      city,
      roles,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
};

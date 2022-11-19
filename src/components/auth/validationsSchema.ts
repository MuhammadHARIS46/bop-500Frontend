import * as Yup from "yup";

export const validateEmail = Yup.string()
  .email("The email provided should be a valid email address")
  .max(255)
  .required("The email field is required");

export const loginValidationSchema = Yup.object({
  username: Yup.string().max(255).required("The username field is required"),
  password: Yup.string().max(255).required("The password field is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must agree to our terms and conditions"
  ),
});

export const registrationValidationSchemas = {
  personalInformations: Yup.object().shape({
    email: validateEmail,
    username: Yup.string().max(255).required("The username field is required"),
    password: Yup.string()
      .min(8)
      .max(255)
      .required("The password field is required"),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password")], "Both password fields need to be the same")
      .required("This field is required"),
    default_city: Yup.object().required("Please select your city"),
  }),

  companyDetails: Yup.object().shape({
    company_size: Yup.string().max(55),
    // .required("The company size field is required"),
    company_name: Yup.string().max(255),
    // .required("The company name field is required"),
    company_role: Yup.string().max(255),
    // .required("The company role field is required"),
  }),
};

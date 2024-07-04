import { string, object } from "yup";

const LoginValidation = object().shape({
  email: string().required("Required"),
  password: string().required("Required"),
});

export const initialLog = {
  email: "",
  password: "",
};
export default LoginValidation;

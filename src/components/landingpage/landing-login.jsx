import { useFormik } from "formik";
import * as yup from "yup";
import abdo from "./style.module.css";

function Login(props) {
  let schema = yup.object({
    password: yup.string().required(),
    email: yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: () => {},
    validationSchema: schema,
  });
  return (
    <form
      action=""
      className={abdo["login-form"]}
      id="login-form"
      style={{ right: props.loginFlag ? "0" : "-100%" }}
    >
      <h1>Login </h1>
      <input
        type="email"
        placeholder="UserName"
        className={abdo.box}
        id="loginEmail"
        name="user"
        value={formik.values.user}
        onChange={formik.handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        className={abdo.box}
        id="loginPassword"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <p>Forgot my password</p>
      <p>SignUp</p>
      <button type="submit" value="login now" className={abdo.btn}>
        Login
      </button>
    </form>
  );
}

export default Login;

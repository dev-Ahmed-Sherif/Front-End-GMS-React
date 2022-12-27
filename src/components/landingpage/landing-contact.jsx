import { useFormik } from "formik";
import * as yup from "yup";
import abdo from "./style.module.css";

function LandingContact() {
  let connectschema = yup.object({
    user: yup.string().required(),
    email: yup.string().email().required(),
    msg: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      user: "",
      email: "",
      msg: "",
    },
    onSubmit: () => {},
    validationSchema: connectschema,
  });

  return (
    <>
      <section>
        <div id="contact" className={`${abdo.contact} ${abdo.view}`}>
          <div className={abdo.main}>
            <h2>
              <span>C</span>ontact <span>U</span>s
            </h2>
            <h6></h6>
          </div>
          <div className={abdo["content-form"]}>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="User"
                name="user"
                value={formik.values.user}
                onChange={formik.handleChange}
              />
              <span>{formik.errors.user}</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <span>{formik.errors.email}</span>

              <textarea
                rows="5"
                placeholder="what's on Your Mind"
                name="msg"
                value={formik.values.msg}
                onChange={formik.handleChange}
              ></textarea>
              <span>{formik.errors.msg}</span>

              <br />
              <input
                type="submit"
                value="Sent"
                className={abdo.btn}
                onSubmit={formik.handleSubmit}
              />
            </form>
            <div className={abdo.bgimg}></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingContact;

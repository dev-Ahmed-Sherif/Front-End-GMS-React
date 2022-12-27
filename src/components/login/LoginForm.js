import { useFormik } from "formik";
import { Label } from 'react-label';
import style from "./LoginForm.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from '../../config/axios'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setuser } from "../../Redux/Actions/userAction";
import { setcart } from "../../Redux/Actions/productsAction";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginForm()
{
    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const [error, setError] = useState();

    const register = useFormik({
        initialValues: {
            firstName: "",
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(4, "Must be 4 characters or more")
                .required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .min(8, "Password cannot be less than 8 characters")
                .required("Required"),
        }),
        onSubmit: (values) =>
        {


            
            axiosInstance.post('/users/register', values).then((err, res) =>
            {
                toast.success('User registered successfully !', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                toLogin()
                // 
                // setError('Invalid Username or Password')
            }).catch(error =>
            {
                toast.error('Inputs are invalid !', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        },
    });

    const login = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .min(8, "Password cannot be less than 8 characters")
                .required("Required"),
        }),
        onSubmit: (values) =>
        {


            
            axiosInstance.post('/users/login', values).then((response) =>
            {
                toast.success('Login Success', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                const token = response.headers['authorization']
                
                dispatch(setuser(response.data))
                dispatch(setcart(response.data.cart))
                localStorage.setItem('token', token)
                navigateTo('/profile')

            }).catch(error =>
            {
                
                // alert('Login Faild !')
                toast.error('Invalid Credentials !', {
                    position: "top-center",
                    marginTop: "30%",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        }
    })

    //          --------------------------LoginErrorMsg----------------------------

    function toLogin()
    {
        const container = document.getElementById(style.container);
        container.classList.remove(style["right-panel-active"]);
    }

    function toSignUp()
    {
        const container = document.getElementById(style.container);
        container.classList.add(style["right-panel-active"]);
    }

    return (
        <section className={style.body}>
            <div>
                <h2 className={style.welcome}>
                    <pre>GMS -&gt; Start your sport journey</pre>
                </h2>
                <div className={style.container} id={style.container}>
                    <div
                        className={`${style["form-container"]} ${style["sign-up-container"]}`}
                    >
                        <form onSubmit={register.handleSubmit} className={style.form}>
                            <h1>Create Account</h1>
                            <div className={style["social-container"]}>
                                <a href="#" className={style.social}>
                                    <i className={`${style.fab} ${style["fa-facebook-f"]}`} />
                                </a>
                                <a href="#" className={style.social}>
                                    <i
                                        className={`${style.fab} ${style["fa-google-plus-g"]}`}
                                    />
                                </a>
                                <a href="#" className={style.social}>
                                    <i className={`${style.fab} ${style["fa-linkedin-in"]}`} />
                                </a>
                            </div>
                            <input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={register.handleChange}
                                value={register.values.firstName}
                            />
                            {register.errors.firstName ? <small className={style.validationMsg}>{register.errors.firstName}</small> : null}
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={register.handleChange}
                                value={register.values.email}
                            />
                            {register.errors.email ? <small className={style.validationMsg}>{register.errors.email}</small> : null}
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={register.handleChange}
                                value={register.values.password}
                            />
                            {register.errors.password ? <small className={style.validationMsg}>{register.errors.password}</small> : null}

                            <button type="submit">Sign Up</button>
                        </form>

                    </div>
                    <div
                        className={`${style["form-container"]} ${style["sign-in-container"]}`}
                    >
                        <form onSubmit={login.handleSubmit} className={style.form}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className={style.social}>
                                    <i className={`${style.fab} ${style["fa-facebook-f"]}`} />
                                </a>
                                <a href="#" className={style.social}>
                                    <i
                                        className={`${style.fab} ${style["fa-google-plus-g"]}`}
                                    />
                                </a>
                                <a href="#" className={style.social}>
                                    <i className={`${style.fab} ${style["fa-linkedin-in"]}`} />
                                </a>
                            </div>
                            {error ? <Label>{error}</Label> : null}
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={login.handleChange}
                                value={login.values.email}
                            />
                            {login.errors.email ? <small className={style.validationMsg}>{login.errors.email}</small> : null}
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={login.handleChange}
                                value={login.values.password}
                            />
                            {login.errors.password ? <small className={style.validationMsg}>{login.errors.password}</small> : null}
                            <a href="#">Forgot your password?</a>
                            <button type="submit">Sign In</button>
                        </form>
                        <ToastContainer
                            position="bottom-center"
                            // margin-top={"5%"}
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                        <ToastContainer
                            position="bottom-center"
                            autoClose={3000}
                            limit={1}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </div>
                    <div className={style["overlay-container"]}>
                        <div className={style.overlay}>
                            <div
                                className={`${style["overlay-panel"]} ${style["overlay-left"]}`}
                            >
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with your personal info
                                </p>
                                <button
                                    onClick={toLogin}
                                    className={`${style.ghost} ${style.button}`}
                                    id={style.signIn}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div
                                className={`${style["overlay-panel"]} ${style["overlay-right"]}`}
                            >
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button
                                    onClick={toSignUp}
                                    className={`${style.ghost} ${style.button}`}
                                    id={style.signUp}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </section>
    );
}

export default LoginForm;

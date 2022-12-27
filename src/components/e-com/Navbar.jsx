import React, { useState, useEffect } from "react";
import logo from "../../images/gym logo 4.png";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Abdo from "./e-com.module.css";
import { useSelector } from "react-redux";
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap'
import FormData from 'form-data';
import { axiosInstance } from '../../config/axios';
import { deleteExercise } from '../../Redux/Actions/deleteAction';
import { useDispatch } from 'react-redux';
import '../../App.css'
import AddNewFood from "../AddNewFood/AddNewFood";
import io from "socket.io-client";

import
{
  faUser,
  faShoppingBasket,
  faShop,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { setuser } from "../../Redux/Actions/userAction";
import { setcart } from "../../Redux/Actions/productsAction";

function Navbar(props)
{
  const trainer = useSelector((state) => state.userReducer.user.role);
  
  const navigateTo = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => 
  {
    navigateTo('/login')
    localStorage.clear()
    dispatch(setuser({}))
    dispatch(setcart([]))
  }
  
  const dispatch = useDispatch();
  var navigate = useNavigate();
  ///////////////////login slide function/////////////////
  function loginform()
  {
    props.loginFlag((pre) => !pre);
  }
  ///////////////nav bar hide state//////////////
  let [show, setShow] = useState(true);

  ///////////////////////navbar scroll state///////////////////////
  let [scrol, setScrol] = useState(window.scrollY);
  // Set Notification to Nav
  const [notification, setNotification] = useState('')
  ///////////////// navbar hide on scroll function//////////////////
  useEffect(() =>
  {
    window.addEventListener("scroll", function ()
    {
      setScrol(window.scrollY);
      if (scrol < window.scrollY)
      {
        return setShow(false);
      } else
      {
        return setShow(true);
      }
    });
  }, [scrol]);
  ///////////// navbare responsive hide state ////////////////
  let [showmen, setShowmen] = useState(false);
  ///////////////////navbar side menue responsive function/////////////////////
  function showmenue()
  {
    setShowmen((pre) => !pre);
  }
  let cart = useSelector((state) => state.cartReducer.cart);

  // ------------------ to add exercise nav link form "pop up message modal" ------------------
  const [isShow, invokeModal] = React.useState(false)
  // --------------------------- pop up confirm add new exercise message ---------------------------
  const [isAddNewExConfirmShow, invokeAddNewExConfirmModal] = React.useState(false)
  const initAddNewExConfirmModal = (item) =>
  {
    
    invokeAddNewExConfirmModal(!isAddNewExConfirmShow)
  }
  const initModal = (item) =>
  {
    // 
    invokeModal(!isShow)
  }

  const [isnewShow, invokenewModal] = React.useState(false)
  const initnewModal = (item) => 
  {
    invokenewModal(!isnewShow)
    navigate('/foods')
  }

  const schema = yup.object().shape({
    exerciseName: yup.string().required('Required'),
    exBodyPart: yup.string().required('Required'),
  });

  const [exercise, setExercise] = useState(
    [], {
    // --------------------- to filter with body part and map on it --------------------------
    bodyPart: [],
    response: [],
  }
  )

  const [filteredExercise, setFilteredExercise] = useState(
    [], {
    // --------------------- to filter with body part and map on it --------------------------
    bodyPart: [],
    response: [],
  }
  )
  let user = useSelector((state) => state.userReducer.user);
  // Socket Ex 
  const socket = io("http://localhost:4000");
  // socket.on("addExerciseResponse", (msg) =>
  // {
  //     //dispatch(setNotification(msg));
  //     
  // });
  const formik = useFormik({
    initialValues: {
      _id: "",
      exerciseName: "",
      exBodyPart: "",
      exTools: "",
      exStaticImage: "",
      exGifImage: "",
      exAdditionNotes: "",

    },
    onSubmit: values =>
    {
      // alert(JSON.stringify(values));

      const form = new FormData();
      form.append('_id', values._id);
      form.append('exerciseName', values.exerciseName);
      form.append('exBodyPart', values.exBodyPart);
      form.append('exTools', values.exTools);
      // form.append('exStaticImage', .values.exerciseName);
      form.append('exStaticImage', values.file); //hossam ex[0]
      form.append('exAdditionNotes', values.exAdditionNotes);
      // for (let i = 0; i < values.exStaticImage.length; i++) {

      // }
      socket.emit("addExercise", user.email);
      axios.post("http://localhost:8000/api/v1/notification/create", {
        notificationSender: user.email,
        notificationMsg: 'new exersice',
        notificationDate: new Date().toDateString()

      });
      
      // alert(`You are registered! email: ${values.email}. password: ${values.password}`);
      axios.post('http://localhost:8000/api/v1/exercises/create', form).then(function (response)
      {
        
        // addExercise();
        axiosInstance.get('/exercises/view').then((ress) =>
        {
          
          
          initAddNewExConfirmModal()
          setExercise(ress.form);
          setFilteredExercise(ress.form);
          dispatch(deleteExercise(form));

        })
      })
    },
    validationSchema: schema
  });

  return (
    <>
      {isnewShow && <AddNewFood i={initnewModal} is={isnewShow} />}
      <nav className={Abdo.navbar} style={{ top: show ? "0" : "-70px" }}>
        <div className={Abdo.logo}>
          <img src={logo} alt="logo pic" className={Abdo.logoRest} />
          <h1 id={Abdo.logo}>
            GMS
            <span id="logoDecoration" style={{ color: "var(--prime)" }}>
              .
            </span>
          </h1>
        </div>
        <ul style={{ right: showmen ? "0" : "-50%" }}>
          {" "}
          <FontAwesomeIcon icon={faX} className={Abdo.fax} onClick={showmenue} />
          <li>
            <NavLink to="">Home</NavLink>
          </li>
          <li>
            <NavLink to="/AccountSettings">Settings</NavLink>
          </li>

          {trainer == "trainer" && <li className="nav-item dropdown">
            <NavLink to="/Trainers" className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: "20px" }}>Trainers  <i className="uil uil-angle-double-down" style={{ fontSize: "22px" }}></i></NavLink>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ background: "var(--onyx-darker)", boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.5)" }}>
              <li><NavLink to="/AllExercise" className="dropdown-item" style={{ background: "transparent", color: "var(--white)", fontSize: "15px" }}>Exercises</NavLink></li>
              <li> <NavLink className="dropdown-item" style={{ background: "transparent", color: "var(--white)", fontSize: "15px" }} aria-current="page" href="#" onClick={() => { initModal() }}>Add Exercise</NavLink></li>
              {/* <li><hr className="dropdown-divider" /></li> */}
              <li><hr /></li>
              <li><NavLink to="/HealthyFood" className="dropdown-item" style={{ background: "transparent", color: "var(--white)", fontSize: "15px" }}>Foods</NavLink></li>
              <li> <NavLink to="/new" className="dropdown-item" style={{ background: "transparent", color: "var(--white)", fontSize: "15px" }} aria-current="page" href="#" onClick={() => { initnewModal() }}>Add Food</NavLink></li>
              <li><hr /></li>
              <li><NavLink to="/AllTrainee" className="dropdown-item" style={{ background: "transparent", color: "var(--white)", fontSize: "15px" }}>Trainees</NavLink></li>
            </ul>
          </li>}
          {trainer == "client" && ""}


          <Modal show={isShow} scrollable={true}>
            <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
              <Modal.Title style={{ color: "var(--basic-c-white)" }}>Add New Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "var(--onyx-darker)" }}>
              {/* form */}
              <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <Form.Group className="mb-2" >
                  <Form.Label style={{ color: "var(--prime)" }}>Exercise Name</Form.Label>
                  <Form.Control type="text" name='exerciseName' onChange={formik.handleChange}
                    value={formik.values.exerciseName} />
                </Form.Group>

                <Form.Group className="mb-2" >
                  <Form.Label style={{ color: "var(--prime)" }}>Exercise Body Part</Form.Label>
                  <Form.Control type="text" name='exBodyPart' onChange={formik.handleChange}
                    value={formik.values.exBodyPart} />
                </Form.Group>

                <Form.Group className="mb-2" >
                  <Form.Label style={{ color: "var(--prime)" }}>Exercise Tools</Form.Label>
                  <Form.Control type="text" name='exTools' onChange={formik.handleChange}
                    value={formik.values.exTools} />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label style={{ color: "var(--prime)" }}>Exercise Static Image</Form.Label>
                  <Form.Control type="file" name='file' onChange={(event) =>
                  {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                    value={formik.values.exStaticImage} />
                </Form.Group>

                <Button className='buttonApi' onClick={initModal} style={{ marginLeft: "10px" }} type="submit">
                  Add
                </Button>
              </Form>

            </Modal.Body>
          </Modal>
          {/* modal for add confirmation new exercise message  */}
          <Modal show={isAddNewExConfirmShow}>
            <Modal.Header closeButton onClick={initAddNewExConfirmModal} style={{ background: "var(--onyx-darker)" }}>
              <Modal.Title style={{ color: "--basic-c-white" }}>Edit Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "var(--onyx-darker)" }}>
              <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Exercise Added Successfully</h3>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button closeButton onClick={initAddNewExConfirmModal} className='buttonApi' style={{ marginLeft: "2%" }}>Ok</Button>
              </div>

            </Modal.Body>
          </Modal>
          {!token && <li>
            <NavLink to="/Login">Log In</NavLink>
          </li>}
          {token && <li>
            <NavLink onClick={logout}>Log Out</NavLink>
          </li>}
          <li>
            <NavLink to="/profile">
              <FontAwesomeIcon icon={faUser} onClick={loginform} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/ecom/main">
              <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ecom/cart">
              <FontAwesomeIcon icon={faShoppingBasket} />
              <span
                style={{ color: "#ff5733", fontSize: "1rem", margin: "1rem" }}
              >
                {cart.length}
              </span>
            </NavLink>
          </li>
        </ul>
        <FontAwesomeIcon
          icon={faBars}
          className={Abdo.fabars}
          onClick={showmenue}
        />
      </nav>
    </>
  );
}

export default Navbar;
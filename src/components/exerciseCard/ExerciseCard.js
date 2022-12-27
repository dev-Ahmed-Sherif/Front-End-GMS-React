import './ExerciseCard.css';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addFav } from '../../Redux/Actions/favAction';
import { deleteExercise } from '../../Redux/Actions/deleteAction';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import { useSelector } from 'react-redux';
import { setuser } from '../../Redux/Actions/userAction';
import io from "socket.io-client";

function ExerciseCard({ data, user, pathFunctionsExercise, pathFunctionsExerciseFilter })
{

  let userSocket = useSelector((state) => state.userReducer.user);
  const socket = io("http://localhost:4000");


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
  // 

  const NavigateTo = useNavigate();
  // 

  // ------------------------ to see more button "pop up message modal" ------------------
  // pop up for see more button
  const [isShow, invokeModal] = React.useState(false)
  const [isEditShow, invokeEditModal] = React.useState(false)
  const [isDeleteConfirmShow, invokedeleteConfirmModal] = React.useState(false)
  const [isEditNewExConfirmShow, invokeEditNewExConfirmModal] = React.useState(false)
  const [isAssignExNotesShow, invokeAssignExNotesModal] = React.useState(false)
  const [isAssignExConfirmShow, invokeAssignExConfirmModal] = React.useState(false)

  const initModal = (item) =>
  {


    invokeModal(!isShow)
  }
  // pop up for edit form from icon
  const initEditModal = (item) =>
  {

    invokeEditModal(!isEditShow)
  }
  // pop up for edit form from icon
  // const handleClose = () => setShow(false);

  // ------------------------------ pop up confirm delete message ---------------------------------
  const initdeleteConfirmModal = (item) =>
  {

    invokedeleteConfirmModal(!isDeleteConfirmShow)
  }
  // --------------------------- pop up confirm add new exercise message ---------------------------
  const initEditNewExConfirmModal = (item) =>
  {

    invokeEditNewExConfirmModal(!isEditNewExConfirmShow)
  }
  // --------------------------- pop up confirm add new exercise message ---------------------------
  const initAssignExNotesModal = (item) =>
  {

    invokeAssignExNotesModal(!isAssignExNotesShow)
  }
  // --------------------------- pop up confirm assign exercise to trainee message ---------------------------
  const initAssignExConfirmModal = (item) =>
  {

    invokeAssignExConfirmModal(!isAssignExConfirmShow)
  }


  // ------------------------------- to add to favourite page --------------------------

  const formik2 = useFormik({
    initialValues: {
      // _id: "",
      // exerciseName: "",
      // exBodyPart: "",
      // exTools: "",
      // exStaticImage: "",
      // exGifImage: "",
      exAdditionNotes: "",

    },
    onSubmit: values =>
    {



      // const form = new FormData();
      // // form.append('_id', values._id);
      // // form.append('exerciseName', values.exerciseName);
      // // form.append('exBodyPart', values.exBodyPart);
      // // form.append('exTools', values.exTools);
      // // // form.append('exStaticImage', .values.exerciseName);
      // // form.append('exStaticImage', values.file);
      // form.append('exAdditionNotes', values.exAdditionNotes);
      // for (let i = 0; i < values.exStaticImage.length; i++) {

      // }
      // 
      // alert(JSON.stringify(values));
      // alert(`You are registered! email: ${values.email}. password: ${values.password}`);



      data.exAdditionNotes = values.exAdditionNotes;

      data.email = user;
      dispatch(addFav(data));

      axios.patch('http://localhost:8000/api/v1/users//add_exersice', data).then((res) =>
      {
        //

        // dispatch(deleteExercise(data));
        // TrainerDataGetTrainee.clientIds[index]=res.data;
        // 
        // dispatch(setuser({clientIds:TrainerDataGetTrainee.clientIds}))
        // axios.get('/exercises/view').then((ress) => {
        //     
        //     
        //     pathFunctionsExercise(ress.data);
        //     pathFunctionsExerciseFilter(ress.data);
        // })
      })
    },
  });
  const dispatch = useDispatch();

  function add(data)
  {




    data.email = user;
    dispatch(addFav(data));

    axios.patch('http://localhost:8000/api/v1/users//add_exersice', data).then((res) =>
    {

      // axios.get('/exercises/view').then((ress) => {
      //     
      //     
      //     pathFunctionsExercise(ress.data);
      //     pathFunctionsExerciseFilter(ress.data);
      // })
    })
  }

  // // ---------------------------- to assign exercise to trainee --------------------------
  // function assign(data) {
  //     
  //     dispatch(assignExercise(data));

  // }

  // ----------------------------------- to delete exercise ------------------------------
  function deleteEx(data)
  {


    dispatch(deleteExercise(data));

    var objExerciseName = { exerciseName: data.exerciseName };

    axios.delete('http://localhost:8000/api/v1/exercises/delete/' + data.exerciseName).then((res) =>
    {



      socket.emit("deleteExercise", userSocket.email);
      axios.post("http://localhost:8000/api/v1/notification/create", {
        notificationSender: userSocket.email,
        notificationMsg: 'delete exercise',
        notificationDate: new Date().toDateString()

      });
      // axios.post("http://localhost:8000/api/v1/notification/create", {
      //   email: user.email,

      // });
      // onClick={initdeleteConfirmModal};
      initdeleteConfirmModal()

    })
  }

  // ------------------------------------ to edit exercise --------------------------------
  const schema = yup.object().shape({
    exerciseName: yup.string().required('Required'),
    exBodyPart: yup.string().required('Required'),
  });

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



      const form = new FormData();
      form.append('_id', values._id);
      form.append('exerciseName', values.exerciseName);
      form.append('exBodyPart', values.exBodyPart);
      form.append('exTools', values.exTools);
      // form.append('exStaticImage', .values.exerciseName);
      form.append('exStaticImage', values.file);
      form.append('exAdditionNotes', values.exAdditionNotes);
      // for (let i = 0; i < values.exStaticImage.length; i++) {

      // }

      // alert(JSON.stringify(values));
      // alert(`You are registered! email: ${values.email}. password: ${values.password}`);
      axios.patch('http://localhost:8000/api/v1/exercises/editEx', form).then(function (response)
      {


        initEditNewExConfirmModal()

        axiosInstance.get('/exercises/view').then((ress) =>
        {


          setExercise(ress.form);
          setFilteredExercise(ress.form);
          dispatch(deleteExercise(form));
        })
        // NavigateTo('/AllExercise');
      })
      socket.emit("updateExercise", userSocket.email);
      axios.post("http://localhost:8000/api/v1/notification/create", {
        notificationSender: userSocket.email,
        notificationMsg: 'update exercise',
        notificationDate: new Date().toDateString()

      });
    },
    validationSchema: schema
  });


  return (
    <div className='cards'>
      <div className='contentTitle' style={{ textAlign: "center", paddingBottom: "5%", fontWeight: "600", fontSize: "16px" }}>{data.exerciseName}</div>
      <div className='image-section'>
        <img src={`http://localhost:8000/${data.exStaticImage}`} style={{ width: '100%', height: '100%', borderRadius: "10px" }} alt="image modal" />
      </div>
      {/* <div className=''> */}
      {/* <button className='buttonApi my-5' onClick={() => { initModal(data) }}>See More</button> */}
      {/* <div className='iconsDiv'> */}
      {user != '' ?
        <div className='iconExCardButton'>
          <div className='iconExCard'><i className="uil uil-plus" aria-hidden="true" onClick={() => { initAssignExNotesModal(data) }}></i></div>
          <span>Assign</span>
        </div> :
        <div className='iconExCardButton' style={{ display: "none" }}>
          <div className='iconExCard'><i className="uil uil-plus" aria-hidden="true" onClick={() => { initAssignExNotesModal(data) }}></i></div>
          <span>Assign</span>
        </div>}

      {user == '' ?
        <>
          <div className='iconExCardButton'>
            <div className='iconExCard'><i className="uil uil-pen" onClick={() => { initEditModal(data) }}></i></div>
            <span>Edit</span>
          </div>
          <div className='iconExCardButton'>
            {/* <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { deleteEx(data) }}></i></div> */}
            <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { initdeleteConfirmModal(data) }}></i></div>
            <span>Delete</span>
          </div>
        </> :
        <>
          <div className='iconExCardButton' style={{ display: "none" }}>
            <div className='iconExCard'><i className="uil uil-pen" onClick={() => { initEditModal(data) }}></i></div>
            <span>Edit</span>
          </div>
          <div className='iconExCardButton' style={{ display: "none" }}>
            {/* <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { deleteEx(data) }}></i></div> */}
            <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { initdeleteConfirmModal(data) }}></i></div>
            <span>Delete</span>
          </div>
        </>
      }
      <div className='iconExCardButton'>
        {/* <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { deleteEx(data) }}></i></div> */}
        <div className='iconExCard'><i className="uil uil-align-center-v" aria-hidden="true" onClick={() => { initModal(data) }}></i></div>
        <span>Show</span>
      </div>

      {/* </div> */}

      {/* modal for see mode button */}
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Exercise Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)", textAlign: "center" }}>

          <h3 style={{ fontWeight: "600" }}><span>Title: </span>{data.exerciseName}</h3>
          <img src={`http://localhost:8000/${data.exStaticImage}`} style={{ width: "50%", marginBottom: "3%", borderRadius: "10px" }} alt="image modal" />
          <p style={{ fontSize: "20px" }}><span>Body Part: </span>{data.exBodyPart}</p>
          <p style={{ fontSize: "20px" }}><span>Tools: </span>{data.exTools}</p>
        </Modal.Body>
      </Modal>

      {/* modal for edit exercise form  */}
      <Modal show={isEditShow}>
        <Modal.Header closeButton onClick={initEditModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Edit Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)" }}>
          {/* form */}
          <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            <Form.Group className="mb-2" style={{ display: "none" }}>
              <Form.Label style={{ color: "var(--prime)" }}>Exercise id</Form.Label>
              <input type="text" name='_id' onChange={formik.handleChange}
                value={formik.values._id = data._id} />
            </Form.Group>
            <Form.Group className="mb-2" >
              <Form.Label style={{ color: "var(--prime)" }}>Exercise Name</Form.Label>
              <Form.Control className='formInput' type="text" name='exerciseName' onChange={formik.handleChange}
                value={formik.values.exerciseName} placeholder={data.exerciseName} />
            </Form.Group>

            <Form.Group className="mb-2" >
              <Form.Label style={{ color: "var(--prime)" }}>Exercise Body Part</Form.Label>
              <Form.Control className='formInput' type="text" name='exBodyPart' onChange={formik.handleChange}
                value={formik.values.exBodyPart} placeholder={data.exBodyPart} />
            </Form.Group>

            <Form.Group className="mb-2" >
              <Form.Label style={{ color: "var(--prime)" }}>Exercise Tools</Form.Label>
              <Form.Control className='formInput' type="text" name='exTools' onChange={formik.handleChange}
                value={formik.values.exTools} placeholder={data.exTools} />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label style={{ color: "var(--prime)" }}>Exercise Static Image</Form.Label>
              <Form.Control className='formInput' type="file" name='file' onChange={(event) =>
              {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
                value={formik.values.exStaticImage} placeholder={data.exStaticImage} />
            </Form.Group>

            <Button className='buttonApi' onClick={initEditModal} style={{ marginLeft: "10px" }} type="submit">
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* modal for delete confirmation exercise message  */}
      <Modal show={isDeleteConfirmShow}>
        <Modal.Header closeButton onClick={initdeleteConfirmModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Delete Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)" }}>
          <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Are you sure you want to delete this exercise? </h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button closeButton onClick={initdeleteConfirmModal} className='buttonApiConfirm' style={{ marginLeft: "2%" }}>Cancel Process</Button>
            <Button closeButton onClick={() => { deleteEx(data) }} className='buttonApi'>Delete Exercise</Button>
          </div>

        </Modal.Body>
      </Modal>

      {/* modal for edit confirmation new exercise message  */}
      <Modal show={isEditNewExConfirmShow}>
        <Modal.Header closeButton onClick={initEditNewExConfirmModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Edit Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)" }}>
          <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Exercise Edited Successfully</h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button closeButton onClick={initEditNewExConfirmModal} className='buttonApi' style={{ marginLeft: "2%" }}>Ok</Button>
          </div>

        </Modal.Body>
      </Modal>

      {/* modal for enter variable notes to user before assign exercise  */}
      <Modal show={isAssignExNotesShow}>
        <Modal.Header closeButton onClick={initAssignExNotesModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Rest Of Exercise Information</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)" }}>
          {/* <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Exercise Edited Successfully</h3>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Button closeButton onClick={initAssignExNotesModal} className='buttonApi' style={{ marginLeft: "2%" }}>Ok</Button>
                        </div>
                         */}
          {/* form */}
          <Form onSubmit={formik2.handleSubmit} encType='multipart/form-data'>
            <Form.Group className="mb-2" >
              <Form.Label style={{ color: "var(--prime)" }}>Exercise Notes</Form.Label>
              <Form.Control type="text" name='exAdditionNotes' onChange={formik2.handleChange}
                value={formik2.values.exAdditionNotes} placeholder={data.exAdditionNotes} />
            </Form.Group>

            <Button className='buttonApi' style={{ marginLeft: "10px" }} type="submit" onClick={initAssignExNotesModal}>
              Add To Trainee
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
      {/* </div> */}

      {/* modal for edit confirmation new exercise message  */}
      {/* <Modal show={initAssignExConfirmModal}>
                <Modal.Header closeButton onClick={initAssignExConfirmModal} style={{ background: "var(--onyx-darker)" }}>
                    <Modal.Title style={{ color: "--basic-c-white" }}>Assign Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "var(--onyx-darker)" }}>
                    <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Exercise Assigned to Trainee Successfully</h3>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Button closeButton onClick={initAssignExConfirmModal} className='buttonApi' style={{ marginLeft: "2%" }}>Ok</Button>
                    </div>

                </Modal.Body>
            </Modal> */}
    </div>
  )
}

export default ExerciseCard;
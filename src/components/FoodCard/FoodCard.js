import style from './FoodCard.module.css'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { axiosInstance } from '../../config/axios';
import { FaCartPlus, FaLink, FaTrash } from "react-icons/fa";
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddToUser from '../AddToUser/AddToUser'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { delFromUser } from '../../Redux/Actions/DeleteFoodAction'
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from 'react-redux';

export default function FoodCard({ data, key, user, deletefood, loading }) {
  let userSocket = useSelector((state) => state.userReducer.user);
  const socket = io("http://localhost:4000");

  var navigate = useNavigate();
  const dispatch = useDispatch();
  const [arrOfFood, setArrOfFood] = useState([])

  const [isShow, invokeModal] = React.useState(false)
  const initModal = (item) => {

    
    invokeModal(!isShow)
  }

  const [isAddShow, invokeAddModal] = React.useState(false)
  const initAddModal = (item, key) => {
    invokeAddModal(!isAddShow)
  }

  const [isEditShow, invokeEditModal] = React.useState(false)
  // pop up for edit form from icon
  const initEditModal = (item, key) => {
    invokeEditModal(!isEditShow)
    
  }
  const [isDeleteFoodConfirmShow, invokedeleteFoodConfirmModal] = React.useState(false)
  const initdeleteFoodConfirmModal = (item) => {
    
    invokedeleteFoodConfirmModal(!isDeleteFoodConfirmShow)
  }

  const [isEditeFoodConfirmShow, invokeEditeFoodConfirmModal] = React.useState(false)
  const initediteFoodConfirmModal = (item) => {
    
    invokeEditeFoodConfirmModal(!isEditeFoodConfirmShow)
    axiosInstance.get('/healthyfoods');
  }

  var arr = [];
  function del(name) {
    deletefood(name)
    setArrOfFood((prev) => prev.filter((item) => item.foodName != name));
    axiosInstance.delete('/healthyfoods/delete/' + name).then((res) => {
      
      initdeleteFoodConfirmModal()
    })
    socket.emit("deleteFood", userSocket.email);
    axios.post("http://localhost:8000/api/v1/notification/create", {
      notificationSender: userSocket.email,
      notificationMsg: 'delete Food',
      notificationDate: new Date().toDateString()

    });

  }

  const schema = yup.object().shape({
    foodName: yup.string().required('Required'),
    foodTime: yup.string().required('Required'),
    foodType: yup.string().required('Required'),
    ingredients: yup.string(),
    imgFood: yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      _id: data._id,
      foodName: data.foodName,
      foodTime: data.foodTime,
      foodType: data.foodType,
      ingredients: data.ingredients,
      imgFood: '',

    },
    onSubmit: values => {
      var form = new FormData();
      form.append("_id", values._id)
      form.append("foodName", values.foodName)
      form.append("foodTime", values.foodTime)
      form.append("foodType", values.foodType)
      form.append("ingredients", values.ingredients)
      form.append('imgFood', values.file);
      axiosInstance.patch('/healthyfoods/update', form).then(function (response) {
        // setArrOfFood(response.form)
        initediteFoodConfirmModal()

        // then((res)=>
        //   {
        //     setArrOfFood(res.form)
        dispatch(delFromUser(form));

        //   })

      })
      socket.emit("updateFood", userSocket.email);
      axios.post("http://localhost:8000/api/v1/notification/create", {
        notificationSender: userSocket.email,
        notificationMsg: 'update Food',
        notificationDate: new Date().toDateString()

      });
    },
    validationSchema: schema
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    < >{isAddShow && <AddToUser initAddModal={initAddModal} isAddShow={isAddShow} data={data} user={user} />}
      <div className={style.containerFood}>
        <div className={style.contentTitle} style={{ textAlign: "center", paddingBottom: "5%", fontWeight: "600", fontSize: "16px" }}>{data.foodName}</div>
        <div className='image-section'>
          <img src={`http://localhost:8000/${data.imgFood}`} style={{ width: '100%', height: '100%', borderRadius: "10px" }} alt="image modal" />
        </div>
        {/* <div className=''> */}
        {/* <button className='buttonApi my-5' onClick={() => { initModal(data) }}>See More</button> */}
        {/* <div className='iconsDiv'> */}
        {user != '' ?
          <div className={style.iconExCardButton}>
            <div className={style.iconExCard}><i className="uil uil-plus" aria-hidden="true" onClick={() => { initAddModal(data, key) }}></i></div>
            <span>Assign</span>
          </div> :
          <div className={style.iconExCardButton} style={{ display: "none" }}>
            <div className={style.iconExCard}><i className="uil uil-plus" aria-hidden="true" onClick={() => { initAddModal(data, key) }}></i></div>
            <span>Assign</span>
          </div>}

        {user == '' ?
          <>
            <div className={style.iconExCardButton}>
              <div className={style.iconExCard}><i className="uil uil-pen" onClick={() => { initEditModal(data, key) }}></i></div>
              <span>Edit</span>
            </div>
            <div className={style.iconExCardButton}>
              {/* <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { deleteEx(data) }}></i></div> */}
              <div className={style.iconExCard}><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { initdeleteFoodConfirmModal(data) }}></i></div>
              <span>Delete</span>
            </div>
          </> :
          <>
            <div className={style.iconExCardButton} style={{ display: "none" }}>
              <div className={style.iconExCard}><i className="uil uil-pen" onClick={() => { initEditModal(data, key) }}></i></div>
              <span>Edit</span>
            </div>
            <div className={style.iconExCardButton} style={{ display: "none" }}>
              {/* <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { deleteEx(data) }}></i></div> */}
              <div className={style.iconExCard}><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { initdeleteFoodConfirmModal(data) }}></i></div>
              <span>Delete</span>
            </div>
          </>
        }
        <div className={style.iconExCardButton}>
          {/* <div className='iconExCard'><i className="uil uil-trash-alt" aria-hidden="true" onClick={() => { deleteEx(data) }}></i></div> */}
          <div className={style.iconExCard}><i className="uil uil-align-center-v" aria-hidden="true" onClick={() => { initModal(data) }}></i></div>
          <span>Show</span>
        </div>   {/* onClick={()=>{del(data.foodName)}} */}
        {/*Edit */}
        <Modal show={isShow}>
          <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
            <Modal.Title style={{ color: "--basic-c-white" }}>Food Details</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "var(--onyx-darker)", textAlign: "center" }}>
            <h3 style={{ fontWeight: "600" }}><span>Title: </span>{data.foodName}</h3>
            <img src={`http://localhost:8000/${data.imgFood}`} style={{ width: "50%", marginBottom: "3%", borderRadius: "10px" }} alt="image modal" />
            <p style={{ fontSize: "20px" }}><span>Food Time: </span>{data.foodTime}</p>
            <p style={{ fontSize: "20px" }}><span>Food Type: </span>{data.foodType}</p>
            <p style={{ fontSize: "20px" }}><span>Food Ingredients: </span>{data.ingredients}</p>
          </Modal.Body>
        </Modal>

        <Modal show={isEditShow}>
          <Modal.Header closeButton onClick={initEditModal} style={{ background: "var(--onyx-darker)" }}>
            <Modal.Title style={{ color: "--basic-c-white" }}>Edit Food</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "var(--onyx-darker)" }}>
            {/* form */}
            <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
              <Form.Group className="mb-2" style={{ display: "none" }}>
                <Form.Label style={{ color: "var(--prime)" }}>ID</Form.Label>
                <Form.Control type="text" disabled name='id' onChange={formik.handleChange}
                  value={formik.values._id} />
              </Form.Group>
              <Form.Group className="mb-2" >
                <Form.Label style={{ color: "var(--prime)" }}>Food Name</Form.Label>
                <Form.Control type="text" name='foodName' onChange={formik.handleChange}
                  value={formik.values.foodName} />
              </Form.Group>

              <Form.Group className="mb-2" >
                <Form.Label style={{ color: "var(--prime)" }}>Food Time</Form.Label>
                <Form.Control type="text" name='foodTime' onChange={formik.handleChange}
                  value={formik.values.foodTime} />
              </Form.Group>

              <Form.Group className="mb-2" >
                <Form.Label style={{ color: "var(--prime)" }}>Food Type</Form.Label>
                <Form.Control type="text" name='foodType' onChange={formik.handleChange}
                  value={formik.values.foodType} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "var(--prime)" }}>Ingredients of food</Form.Label>
                <Form.Control type="text" name='ingredients' onChange={formik.handleChange}
                  value={formik.values.ingredients} />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{ color: "var(--prime)" }}>Food Image</Form.Label>
                <Form.Control type="file" name='file' onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
                  value={formik.values.imgFood} />
              </Form.Group>

              <Button className={style.buttonApi} style={{ marginLeft: "10px" }} type="submit">
                Edit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={isEditeFoodConfirmShow}>
          <Modal.Header closeButton onClick={initediteFoodConfirmModal} style={{ background: "var(--onyx-darker)" }}>
            <Modal.Title style={{ color: "var(--prime)" }}>Edite Food</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "var(--onyx-darker)" }}>
            <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Edite is success </h3>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button closeButton onClick={initediteFoodConfirmModal} className='buttonApiConfirm' style={{ marginLeft: "2%" }}>Done Process</Button>

            </div>

          </Modal.Body>
        </Modal>

        <Modal show={isDeleteFoodConfirmShow}>
          <Modal.Header closeButton onClick={initdeleteFoodConfirmModal} style={{ background: "var(--onyx-darker)" }}>
            <Modal.Title style={{ color: "var(--prime)" }}>Delete Food</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "var(--onyx-darker)" }}>
            <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Are you sure you want to delete this food ? </h3>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button closeButton onClick={initdeleteFoodConfirmModal} className='buttonApiConfirm' style={{ marginLeft: "2%" }}>Cancel Process</Button>
              <Button closeButton onClick={() => { del(data.foodName) }} className='buttonApi'>Delete Food</Button>
            </div>

          </Modal.Body>
        </Modal>
      </div>
   
    
    </>
  )
}
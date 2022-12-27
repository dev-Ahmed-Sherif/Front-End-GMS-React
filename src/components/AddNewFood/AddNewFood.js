import './AddNewFood.css'
import React, { useState } from 'react'
import { axiosInstance } from '../../config/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from 'react-redux';

export default function AddNewFood(props)
{
  let userSocket = useSelector((state) => state.userReducer.user);
  const socket = io("http://localhost:4000");
  const [arrOfFood, setArrOfFood] = useState([])
  var navigate = useNavigate();
  const [isAddFoodConfirmShow, invokeAddFoodConfirmModal] = React.useState(false)
  const initaddFoodConfirmModal = (item) =>
  {
    
    invokeAddFoodConfirmModal(!isAddFoodConfirmShow)
  }
  const formik = useFormik({
    initialValues: {
      foodName: '',
      foodType: '',
      foodTime: '',
      ingredients: '',
      imgFood: '',
    },
    validationSchema: Yup.object({
      foodName: Yup.string().required('Enter food name'),
      foodType: Yup.string().required('Enter food type like (Hot mail, Sweet mail, Drink,& Snacks)'),
      foodTime: Yup.string().required('Enter food time like (Breakfast, Lunsh,& Dinner)'),
      ingredients: Yup.string(),
      imgFood: Yup.string()
    }),

    onSubmit: values =>
    {

      var form = new FormData();
      form.append("foodName", values.foodName)
      form.append("foodTime", values.foodTime)
      form.append("foodType", values.foodType)
      form.append("ingredients", values.ingredients)
      form.append('imgFood', values.file);
      axiosInstance.post('/healthyfoods/add', form).then((res) =>
      {
        setArrOfFood(res.form)
        formik.values.foodName = '';
        formik.values.foodTime = '';
        formik.values.foodType = '';
        formik.values.ingredients = '';
        initaddFoodConfirmModal()
      }
      )
      socket.emit("addFood", userSocket.email);
      axios.post("http://localhost:8000/api/v1/notification/create", {
        notificationSender: userSocket.email,
        notificationMsg: 'new Food',
        notificationDate: new Date().toDateString()

      });
      
    },
  });

  return (
    <>
      <Modal show={props.is} scrollable={true}>
        <Modal.Header closeButton onClick={props.i} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Add New Food</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)" }}>
          {/* form */}
          <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
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

            <Form.Group className="mb-2" >
              <Form.Label style={{ color: "var(--prime)" }}>Ingredients</Form.Label>
              <Form.Control type="text" name='ingredients' onChange={formik.handleChange}
                value={formik.values.ingredients} />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label style={{ color: "var(--prime)" }}>Food Image</Form.Label>
              <Form.Control type="file" name='file' onChange={(event) =>
              {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
                value={formik.values.foodImage} multiple accept="image/*" />
            </Form.Group>
            <Button className='buttonApi' style={{ marginLeft: "10px" }} type="submit">
              Add
            </Button>
          </Form>

        </Modal.Body>
      </Modal>

      <Modal show={isAddFoodConfirmShow}>
        <Modal.Header closeButton onClick={initaddFoodConfirmModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "var(--prime)" }}>Add New Food</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)" }}>
          <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Add is success </h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button closeButton onClick={initaddFoodConfirmModal} className='buttonApiConfirm' style={{ marginLeft: "2%" }}>Done Process</Button>

          </div>

        </Modal.Body>
      </Modal>
    </>
  )
}
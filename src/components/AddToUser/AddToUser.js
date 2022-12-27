import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addToUser } from '../../Redux/Actions/AddFoodAction';
import { axiosInstance } from '../../config/axios';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddToUser(props)
{
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {

      quantity: '',
    },
    validationSchema: Yup.object({

      quantity: Yup.string()
    }),

    onSubmit: values =>
    {
      values.email = props.user;
      values.foodName = props.data.foodName;
      values.foodTime = props.data.foodTime;
      values.foodType = props.data.foodType;
      values.ingredients = props.data.ingredients;
      values.imgFood = props.data.imgFood;
      // dispatch(addToUser(values))
      
      axiosInstance.patch('/users/addHealthyFood', values).then((res) =>
      {
        
      })
      dispatch(addToUser(values))
      props.initAddModal()
    },
  });
  return (
    <>
      {/*Add To user*/}
      <Modal show={props.isAddShow}>
        <Modal.Header closeButton onClick={props.initAddModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Add Food To User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)" }}>
          {/* form */}
          <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--prime)" }}>Quantity of food</Form.Label>
              <Form.Control type="text" name='quantity' onChange={formik.handleChange}
                value={formik.values.quantity} />
            </Form.Group>



            <Button className='buttonApi' style={{ marginLeft: "10px" }} type="submit"   >
              Add To User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
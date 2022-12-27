
import './Bigcontainer.css';
import ContainerExercises from '../mainContentExercise/ContainerExercises';
import Header from '../header/Header';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

function Bigcontainer()
{

    const NavigateTo = useNavigate();
    // ------------------ to add exercise nav link form "pop up message modal" ------------------
    const [isShow, invokeModal] = React.useState(false)
    const initModal = (item) =>
    {
        // 
        invokeModal(!isShow)
    }

    const schema = yup.object().shape({
        exerciseName: yup.string().required('Required'),
        exBodyPart: yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
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
            form.append('exerciseName', values.exerciseName);
            form.append('exBodyPart', values.exBodyPart);
            form.append('exTools', values.exTools);
            form.append('exStaticImage', values.file);
            form.append('exAdditionNotes', values.exAdditionNotes);
            // 
            axios.post('http://localhost:8000/api/v1/exercises/create', form).then(function (response)
            {
                // 
                NavigateTo('/AllExercise');
            })
        },
        validationSchema: schema
    });
    // 
    return (
        <>
            <Header />
            <nav style={{ marginLeft: "30%", marginTop: "5%" }}>
                <ul>
                    <li>
                        <NavLink to="/AllExercise" className="nav-link active" aria-current="page" href="#">All Exercise</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link active" aria-current="page" href="#" onClick={() => { initModal() }}>Add Exercise</NavLink>
                    </li>

                    <Modal show={isShow} scrollable={true}>
                        <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
                            <Modal.Title style={{ color: "--basic-c-white" }}>Add New Exercise</Modal.Title>
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
                                {/* 
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label style={{ color: "var(--prime)" }}>Exercise Gif Image</Form.Label>
                                    <Form.Control type="file" name='exGifImage' onChange={formik.handleChange}
                                        value={formik.values.exGifImage} multiple accept="image/*" />
                                </Form.Group> */}

                                <Form.Group className="mb-2" >
                                    <Form.Label style={{ color: "var(--prime)" }}>Exercise Notes</Form.Label>
                                    <Form.Control type="text" name='exAdditionNotes' onChange={formik.handleChange}
                                        value={formik.values.exAdditionNotes} />
                                </Form.Group>

                                <Button className='buttonApi' style={{ marginLeft: "10px" }} type="submit">
                                    Add
                                </Button>
                            </Form>

                        </Modal.Body>
                    </Modal>

                    <li>
                        <NavLink to="/FavExercise" className="nav-link active" aria-current="page" href="#">Assigned Exercise</NavLink>
                    </li>
                    <li>
                        <NavLink to="/AllTrainee" className="nav-link active" aria-current="page" href="#">All Trainees</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Bigcontainer;
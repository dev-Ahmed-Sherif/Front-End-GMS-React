import './ProfileExerciseCard.css';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import { setuser } from '../../Redux/Actions/userAction';

function ProfileExerciseCard(data) {
    const dispatch=useDispatch()

    const userProfile = useSelector(
        (state) => state.userReducer.user
    );
    const userExerciseHistory = useSelector(
        (state) => state.userReducer.user.exersiceHistory
    );
    // ------------------------ to see more button "pop up message modal" ------------------
    // pop up for see more button
    const [isShow, invokeModal] = React.useState(false)
    const [isEditShow, invokeEditModal] = React.useState(false)
    const initModal = (item) => {
        
        invokeModal(!isShow)
    }
    // pop up for edit form from icon
    const initEditModal = (item) => {
        
        invokeEditModal(!isEditShow)
    }

    function updateState(name, date) {
        

        var index=userExerciseHistory.findIndex((item)=>item.exerciseName==name&&item.date==date);
        
        
        userExerciseHistory[index].finsh=!userExerciseHistory[index].finsh;
        dispatch(setuser({exersiceHistory:userExerciseHistory}))
        axios.patch('http://localhost:8000/api/v1/users/update',{email:userProfile.email,exersiceHistory:userExerciseHistory} ).then((data)=>
        {
            
        })
        // 
    }



    return (
        <div className='profileCards'>
            <div className='profileCardConten'>
                <div className='ProfileImage-section'>
                    
                    <img src={`http://localhost:8000/${data.data.exStaticImage}`} style={{ width: '100%', height: '80%', borderRadius: "10px", position: "relative" }} alt="image modal" />

                </div>
                <div className='profileRightPartCard'>
                    <div className='profileTitleContainer'>
                        <i className="uil uil-dumbbell"></i>
                        <p className='profileTitle' style={{ fontWeight: "600" }}>{data.data.exerciseName}</p>
                    </div>
                    <div className='profileTitleContainer'>
                        <i className="uil uil-calendar-alt"></i>
                        <p className='profileTitle' style={{ fontSize: "15px" }}>{data.data.date}</p>
                    </div>
                    <div className="profileExCheckBox">
                        <input className='profileExCheckBox' type="checkbox" name="profileExChecked" id="profileExChecked" checked={data.data.finsh} onChange={() => updateState(data.data.exerciseName, data.data.date)}></input>
                        <label>Check if You finished it</label>
                    </div>
                    <div className='profileIconExCardButton'>
                        <div className='profileIconExCard' onClick={() => { initModal(data.data) }}><i class="uil uil-eye"></i></div>
                        <span>Show</span>
                    </div>
                </div>

                <Modal show={isShow}>
                    <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
                        <Modal.Title style={{ color: "--basic-c-white" }}>Exercise Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: "var(--onyx-darker)", textAlign: "center" }}>
                        
                        <h3 style={{ fontWeight: "600" }}><span>Title: </span>{data.data.exerciseName}</h3>
                        
                        <img src={`http://localhost:8000/${data.data.exStaticImage}`} style={{ width: "50%", borderRadius: "10px" }} alt="image modal" />
                        <p style={{ fontSize: "20px" }}><span>Body Part: </span>{data.data.exBodyPart}</p>
                        <p style={{ fontSize: "20px" }}><span>Tools: </span>{data.data.exTools}</p>
                        <p style={{ fontSize: "20px" }}><span>Notes: </span>{data.data.exAdditionNotes}</p>
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    )
}

export default ProfileExerciseCard;
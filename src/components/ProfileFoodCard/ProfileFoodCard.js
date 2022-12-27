import React from 'react'
import './ProfileFoodCard.css';
import { Modal, Button, Form } from 'react-bootstrap';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { setuser } from '../../Redux/Actions/userAction';

export default function ProfileFoodCard(data)
{
  const dispatch = useDispatch()

  const userProfile = useSelector(
    (state) => state.userReducer.user
  );
  const userFoodHistory = useSelector(
    (state) => state.userReducer.user.healthyFoodHistory
  );


  // ------------------------ to see more button "pop up message modal" ------------------
  // pop up for see more button
  const [isShow, invokeModal] = React.useState(false)

  const initModal = (item) =>
  {

    invokeModal(!isShow)
  }
  // pop up for edit form from icon
  function updateState(name, date)
  {


    var index = userFoodHistory.findIndex((item) => item.foodName == name && item.date == date);


    userFoodHistory[index].finsh = !userFoodHistory[index].finsh;
    dispatch(setuser({ healthyFoodHistory: userFoodHistory }))
    axios.patch('http://localhost:8000/api/v1/users/update', { email: userProfile.email, healthyFoodHistory: userFoodHistory }).then((data) =>
    {

    })
    // 
  }

  return (
    <div className='profileCards'>
      <div className='profileCardConten'>
        <div className='ProfileImage-section'>

          <img src={`http://localhost:8000/${data.data.imgFood}`} style={{ width: '100%', height: '80%', borderRadius: "10px", position: "relative" }} alt="image modal" />

        </div>
        <div className='profileRightPartCard'>
          <div className='profileTitleContainer'>
            <i class="uil uil-crockery"></i>
            <p className='profileTitle' style={{ fontWeight: "600" }}>{data.data.foodName}</p>
          </div>
          <div className='profileTitleContainer'>
            <i class="uil uil-calendar-alt"></i>
            <p className='profileTitle' style={{ fontSize: "15px" }}>{data.data.date}</p>
          </div>
          <div className="profileExCheckBox">
            <input type="checkbox" name="profileExChecked" id="profileExChecked" checked={data.data.finsh} onChange={() => updateState(data.data.foodName, data.data.date)}></input>
            <label>Check if You finished it</label>
          </div>
          <div className='profileIconExCardButton'>
            <div className='profileIconExCard' onClick={() => { initModal(data.data) }}><i class="uil uil-eye"></i></div>
            <span>Show</span>
          </div>
        </div>

        <Modal show={isShow}>
          <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
            <Modal.Title style={{ color: "--basic-c-white" }}>Food Details</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "var(--onyx-darker)", textAlign: "center" }}>

            <h3 style={{ color: "var(--prime)", fontWeight: "600" }}>{`TITLE: ` + data.data.foodName}</h3>
            <img src={`http://localhost:8000/${data.data.imgFood}`} style={{ width: "50%", borderRadius: "10px" }} alt="image modal" />
            <p style={{ fontSize: "20px" }}>{`Food Time : ` + data.data.foodTime}</p>
            <p style={{ fontSize: "20px" }}>{`Food Type : ` + data.data.foodType}</p>
            <p style={{ fontSize: "20px" }}>{`Ingredients of food : ` + data.data.ingredients}</p>
            <p style={{ fontSize: "20px" }}>{`Food Qantity : ` + data.data.quantity}</p>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  )
}
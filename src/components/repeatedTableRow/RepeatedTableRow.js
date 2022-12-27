import './RepeatedTableRow.css';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addFav } from '../../Redux/Actions/favAction';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axios'

// import { Link, NavLink,  } from 'react-router-dom';

function RepeatedTableRow({ data })
{


  const [arrOfHistory, setArrOfHistory] = useState(data.healthyFoodHistory)
  const [arrOfexHistory, setArrOfexHistory] = useState(data.exersiceHistory)
  const dispatch = useDispatch();
  var exHistoryCounter = 0;
  var foodHistoryCounter = 0;
  // 
  function FoodTraineeNav(userEmailToFood)
  {

    NavigateTo('/foods', {
      state:
        { clientEmail: userEmailToFood || '' }
    })

  }

  const [ishistoryShow, invokehistoryModal] = React.useState(false)
  const inithistoryModal = (item) =>
  {

    invokehistoryModal(!ishistoryShow)
  }
  const NavigateTo = useNavigate();

  function ExerciseTraineeNav(userEmailToEx)
  {


    // NavigateTo('/AllExercise',{userEmailToEx});
    NavigateTo('/AllExercise', {
      state:
        { clientEmail: userEmailToEx || '' }

    })
  }

  const [isShow, invokeModal] = React.useState(false)
  const initModal = (item) =>
  {

    invokeModal(!isShow)
  }
  function delex(dataOfUser)
  {

    dataOfUser.email = data.email;


    let y = arrOfexHistory.filter((item) => item != dataOfUser);
    setArrOfexHistory([...y])
    axiosInstance.patch('/users//del_Exersice', dataOfUser).then((res) =>
    {

    })

  }

  function del(dataOfUser)
  {

    dataOfUser.email = data.email;


    let x = arrOfHistory.filter((item) => item != dataOfUser);
    setArrOfHistory([...x])
    axiosInstance.patch('/users/delHealthyFood', dataOfUser).then((res) =>
    {

    })

  }
  return (
    <div className='traineeExCard'>
      <div className='traineeExCardLines'></div>
      {/* <div className='contentTitle' style={{ textAlign: "center", paddingBottom: "5%", fontWeight: "600", fontSize: "16px" }}>{data.exerciseName}</div> */}
      <div className='traineeCardImgBox'>
        <img src={`http://localhost:8000/${data.exStaticImage}`} style={{ width: '100%', height: '100%', borderRadius: "10px" }} alt="image modal" />
      </div>
      <div className='trineeCardContent'>
        <p style={{ color: "white" }}>{`Email: ` + data.email}</p>
        <p style={{ color: "white" }}>{`Subscription: ` + data.role}</p>

        <button className='buttonApi' onClick={() => { initModal(data.exersiceHistory) }}>Exercise History</button>
        <button className="buttonApi" aria-current="page" onClick={() => { ExerciseTraineeNav(data.email) }}>Assign Exercise</button>

        <button className='buttonApi' onClick={() => { inithistoryModal(data.healthyFoodHistory) }}>Food History</button>
        <button className="buttonApi" aria-current="page" onClick={() => { FoodTraineeNav(data.email) }}>Assign Food</button>
      </div>
      {/* modal to show history for every user client */}
      <Modal show={isShow} scrollable={true}>
        <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-#ffffff" }}>Exercise History</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)", textAlign: "left", fontSize: "18px" }}>


          {arrOfexHistory.map((item) => <div>

            <p style={{ display: "none" }}>{exHistoryCounter++}</p>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>{exHistoryCounter}. <span>Exercise Name:</span> {item.exerciseName}</p>
            <p ><span>Exercise Body Part:</span> {item.exBodyPart}</p>
            <p ><span>Exercise Tools: </span>{item.exTools}</p>
            <p ><span>Exercise Notes:</span> {item.exAdditionNotes}</p>
            <p ><span>Assign Date: </span>{item.date}</p>
            <p ><span>Exercise Status: </span>{item.finsh?.toString()}</p>
            <img src={`http://localhost:8000/${item.exStaticImage}`} style={{ width: "50%" }} alt="image modal" />
            <br></br>
            <button className='buttonApi' onClick={() => { delex(item) }} style={{ marginTop: "5%" }}>Delete</button>

            <hr />

          </div>)}

        </Modal.Body>
      </Modal>



      <Modal show={ishistoryShow} scrollable={true}>
        <Modal.Header closeButton onClick={inithistoryModal} style={{ background: "var(--onyx-darker)" }}>
          <Modal.Title style={{ color: "--basic-c-white" }}>Food History</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "var(--onyx-darker)", textAlign: "left", fontSize: "18px" }}>



          {arrOfHistory.map((item) => <div>
            <p style={{ display: "none" }}>{foodHistoryCounter++}</p>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>{foodHistoryCounter}. <span>Food Name:</span> {item.foodName}</p>
            <p ><span>Food Time:</span> {item.foodTime}</p>
            <p ><span>Food Type:</span> {item.foodType}</p>
            <p ><span>Ingredients oF Food: </span>{item.ingredients}</p>
            <p><span>Amount Of Food: </span>{item.quantity} amount</p>
            <p><span>Assign Date:</span>{item.date}</p>
            <p ><span>Food Status: </span>{item.finsh?.toString()}</p>
            <img src={`http://localhost:8000/${item.imgFood}`} style={{ width: "50%" }} alt="foodPhoto" />
            <br></br>
            <button className='buttonApi' onClick={() => { del(item) }} style={{ marginTop: "5%" }}>Delete</button>
            <hr />
          </div>)}

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default RepeatedTableRow;
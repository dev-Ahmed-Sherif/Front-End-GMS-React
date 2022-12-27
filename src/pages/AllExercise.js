import React, { useEffect, useState } from 'react'
import ExerciseCard from '../components/exerciseCard/ExerciseCard'
import { axiosInstance } from '../config/axios'
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header/Header';
import Bigcontainer from '../components/bigContainer/Bigcontainer';
import { useSelector } from 'react-redux';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../components/bigContainer/Bigcontainer.css';

import { headerEx1 } from './images/headerEx1.jpeg';

function AllExercise(props)
{
  var emptyStringRoute = "";
  const [wordEntered, setWordEntered] = useState("");
  const [searchParam] = useState(["exerciseName"]);


  var location = useLocation().state?.clientEmail || "";
  var emptyLocation = "";


  var deleted = useSelector(state => state.deleteReducer.del)
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

  function addExercise()
  {

    // 

    // 
    // data.email = user;
    // dispatch(addFav(data));

    // axiosInstance.patch('http://localhost:8000/api/v1/exercises/create', data).then((res) => {
    //     
    //     axios.get('/exercises/view').then((ress) => {
    //         
    //         
    //         setExercise(ress.data);
    //         setFilteredExercise(ress.data);
    //     })
    // })
    // // to post new exercise
    // axiosInstance.post('/exercises/create').then((res) => {
    //   
    //   
    //   setExercise(res.data)
    // })
  }
  useEffect(() =>
  {

    axiosInstance.get('/exercises/view').then((res) =>
    {


      setExercise(res.data);
      setFilteredExercise(res.data);
    })

    //??????????????????????? don'tknw where put its useSelector() ????????????????????
    // to post new exercise
    // axiosInstance.post('/exercises/create').then((res) => {
    //   
    //   
    //   setExercise(res.data)
    // })

    // // // to update / edit specific exercise
    // // ???????????????????????? axiosInstance.patch() not responding ??????????????????
    // axiosInstance.get('/exercises/editEx').then((res) => {
    //   
    //   
    //   setExercise(res.data)
    // })

    // // assign exercise to trainee with email
    // axiosInstance.get('/users/add_exersice').then((res) => {
    //   
    //   
    //   setExercise(res.data)
    // })
  }, [deleted])

  const handleChange = (e) =>
  {
    // Destructuring

    const { value, checked } = e.target;



    const { bodyPart } = exercise;


    if (checked)
    {

    }

    // Case 1 : The user checks the box
    if (checked)
    {
      setFilteredExercise(
        // pre => {
        exercise.filter((e) => e.exBodyPart === value)
        // }
      );
    }

    // Case 2  : The user unchecks the box
    else
    {
      setFilteredExercise(
        exercise.filter((e) => e.exBodyPart)
      );
    }

  };

  function search(exercise)
  {
    return exercise.filter((item) =>
    {
      return searchParam.some((newItem) =>
      {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(wordEntered.toLowerCase()) > -1
        );
      });
    });
  }
  // update design "solve issue"
  return (
    <>

      <section>
        <div className="home view">
          {location == '' ?
            <>
              <div className="highlights">
                <div className='static-txt'>Let's help someone to </div>
                <div className='dynamic-txt'>
                  <li><span>be fit...</span></li>
                </div>
              </div>
              <div className="backgroundAllEx"></div> </> :
            <>
              <div className="highlights">
                <div className='static-txt'>Select Exercise to </div>
                <div className='dynamic-txt'>
                  <li><span>special trainee...</span></li>
                </div>
              </div>
              <div className="backgroundAssignEx"></div>
            </>}

        </div>

        <div className="ExBoxSquareAnimated">
          <div className="exAnimateSquare" >
            <i class="uil uil-angle-double-down"></i>
            {/* <p>We love Egypt</p> */}
          </div>
        </div>
      </section>

      {/* <Bigcontainer></Bigcontainer> */}
      <div className='row mt-3' style={{ display: 'flex', width: '95%', justifyContent: 'space-around', marginLeft: '2%', position: 'relative', top: '100px' }}>
        {/* <Filtersidebar></Filtersidebar> */}
        <div style={{ width: "20%", position: "relative", top: "0.7rem" }}>
          <div style={{ width: "100%", position: "relative", left: "0.5rem", marginBottom: "0.5rem" }}>
            <form role="search">
              <input className='form-control me-2 iconSearch' style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }} type="search" value={wordEntered} placeholder=' Enter a Exercise Name...' aria-label="Search" onChange={(e) => setWordEntered(e.target.value)} />
            </form>
          </div>
          {/* --------------------------------- filter part -------------------------------------*/}
          <div id="filterApi">
            <h4>Filter Exercises By:</h4>
            <br></br>
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne">
                    Body Part:
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingOne">
                  <div className="accordion-body">
                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="bodyPart" id="absBodyPart" onChange={handleChange} value="push"></input>
                      <label>Push</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="bodyPart" id="fullBodyPart" onChange={handleChange} value="pull"></input>
                      <label>Pull</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="bodyPart" id="chest" onChange={handleChange} value="leg"></input>
                      <label>Leg</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo">
                    Equipments:
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="noEquip" name="tools" onChange={handleChange} value=""></input>
                      <label>No Equipment</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="medicineBallEquip" name="tools" onChange={handleChange} value="metal"></input>
                      <label>Metal</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="dumbbellsEquip" name="tools" onChange={handleChange} value="dumbbells"></input>
                      <label>Dumbbells</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="barbellEquip" name="tools" onChange={handleChange} value="barbell"></input>
                      <label>Barbell</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="trxEquip" name="tools" onChange={handleChange} value="trx"></input>
                      <label>TRX</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="resisBandsEquip" name="tools" onChange={handleChange} value="resistence bands"></input>
                      <label>Resistence Bands</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="stabilityBallEquip" id="stabilityBallEquip"></input>
                      <label>Stability Ball</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="benchEquip" id="benchlEquip"></input>
                      <label>Bench</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree">
                    Hardness Level:
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree">
                  <div className="accordion-body">
                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="enteryLevel" id="enteryLevel"></input>
                      <label>Entery Level</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="intermediateLevel" id="intermediateLevel"></input>
                      <label>Intermediate Level</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="highLevel" id="highLevel"></input>
                      <label>High Level</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------- exercise card part ----------------------------*/}
        <div id='containerApi' >
          {
            filteredExercise.length !== 0 ? search(filteredExercise).map((item) =>
            {
              return <div className=''><ExerciseCard data={item} user={location} /></div>
            })
              :
              exercise.map((item) =>
              {
                return <div className=''><ExerciseCard data={item} user={location} pathFunctionsExercise={setExercise} pathFunctionsExerciseFilter={setFilteredExercise} /></div>
              })
          }
        </div>
      </div>
    </>
  )
}

export default AllExercise
import React, { useEffect, useState } from 'react'
import RepeatedTableRow from '../components/repeatedTableRow/RepeatedTableRow'
import { axiosInstance } from '../config/axios'
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import '../components/bigContainer/Bigcontainer.css'
import Bigcontainer from '../components/bigContainer/Bigcontainer';
import '../components/repeatedTableRow/RepeatedTableRow.css';
import ExerciseCard from '../components/exerciseCard/ExerciseCard';
import { useSelector } from "react-redux";

function AllTrainee()
{
  const TrainerDataGetTrainee = useSelector((state) => state.userReducer.user);

  
  const [trainee, setTrainee] = useState([])

  useEffect(() =>
  {

    // // rest of api link
    // axiosInstance.get('/users/client').then((res) =>
    // {
    //   
    //   
    //   setTrainee(res.data)
    // })
    
    setTrainee(TrainerDataGetTrainee.clientIds)
  }, [TrainerDataGetTrainee])

  return (
    <>
      <section>
        <div className="home view">
          <div className="highlights">
            <div className='static-txt'>Let's change </div>
            <div className='dynamic-txt'>
              <li><span>life to someone...</span></li>
            </div>
          </div>
          <div className="backgroundAllTrainee"></div>
        </div>
        <div className="ExBoxSquareAnimated">
          <div className="exAnimateSquare" >
            <i class="uil uil-angle-double-down"></i>
          </div>
        </div>
      </section>
      <div id='containerTraineeCardApi' >
        {
         trainee&& trainee.map((item) => <RepeatedTableRow data={item} />)
        }
      </div>
    </>
  )
}

export default AllTrainee
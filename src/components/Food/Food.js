import style from './Food.module.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import FoodCard from '../FoodCard/FoodCard';
import { axiosInstance } from '../../config/axios';


export default function Food()
{

  const [arrOfFood, setArrOfFood] = useState([])
  const [filteredFood, setFilteredFood] = useState([])
  const [loading, setLoading] = useState(false);
  const [wordEntered, setWordEntered] = useState("");
  const [searchParam] = useState(["foodName"]);


  const handleChange = (e) =>
  {
    // Destructuring
    const { value, checked } = e.target;
    if (checked)
    {
      setFilteredFood(
        [...arrOfFood.filter((e) => e.foodTime === value)]
      )
    }
    // Case 2  : The user unchecks the box
    else
    {
      setFilteredFood(
        arrOfFood.filter((e) => e.foodTime)
      );
    }
  };
  //Filter for Food Type
  const handleChangeForType = (eType) =>
  {
    // Destructuring

    const { value, checked } = eType.target;

    if (checked)
    {
      setFilteredFood(
        arrOfFood.filter((eType) => eType.foodType == value)

      )
    }

    // Case 2  : The user unchecks the box
    else
    {
      setFilteredFood(
        arrOfFood.filter((eType) => eType.foodType)
      );
    }

  };
  var location = useLocation().state?.clientEmail || "";

  useEffect(() =>
  {
    axiosInstance.get('/healthyfoods').then((res) =>
    {
      setArrOfFood(res.data.healthyFood)
      setFilteredFood(res.data.healthyFood)
      setLoading(false);
    }
    )

  }, [])

  function deletefood(name)
  {
    var arr = arrOfFood.filter((item) => item.foodName != name);
    setArrOfFood([...arr]);
    setFilteredFood([...arr]);
  }


  function search(arrOfFood)
  {
    return arrOfFood.filter((item) =>
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


  return (
    <>
      <div className={`d-flex row ${style.food}`}>
        <div style={{ width: "20%", position: "relative", top: "0.7rem" }}>
          <div style={{ width: "100%", position: "relative", left: "0.5rem", marginBottom: "0.5rem" }}>
            <form role="search">
            {/* <i className={`uil uil-search-alt ${style.icon}`}></i> */}
              <input className={`form-control me-2 ${style.iconSearch}`} style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }} type="search" value={wordEntered} placeholder='&#xe96b; Enter a Food Name...' aria-label="Search" onChange={(e) => setWordEntered(e.target.value)} ></input>
              
            </form>
          </div>
          <div className={style.filterApiFood}>
            <h4>Filter Food By:</h4>
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne">
                    Food Time:
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingOne">
                  <div className="accordion-body">
                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="foodTtime" id="absBodyPart" onChange={handleChange} value="Breakfast"></input>
                      <label>Breakfast</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="foodTtime" id="fullBodyPart" onChange={handleChange} value="Lunch"></input>
                      <label>Lunch</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" name="foodTtime" id="chest" onChange={handleChange} value="Diner"></input>
                      <label>Diner</label>
                    </div>
                    {/* 
                <div className="sortExerciseChoices">
                  <input type="checkbox" name="legsPart" id="legsPart"></input>
                  <label>Legs - Calves</label>
                </div> */}
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo">
                    Food Type:
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo">
                  <div className="accordion-body">
                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="noEquip" onChange={handleChangeForType} value="Sweet"></input>
                      <label>Sweet Food</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="medicineBallEquip" onChange={handleChangeForType} value="Hot"></input>
                      <label>Hot Food</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="dumbbellsEquip" onChange={handleChangeForType} value="Drink"></input>
                      <label>Drink</label>
                    </div>

                    <div className="sortExerciseChoices">
                      <input type="checkbox" id="barbellEquip" onChange={handleChangeForType} value="Snack"></input>
                      <label>Snack</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.content}>

          <div className={style.foodCard}>
            {
              search(filteredFood).map((item) =>
              {
                return <div><FoodCard data={item} key={item._id} user={location} deletefood={deletefood} loading={loading} /></div>
              })
            }
          </div>

        </div>

      </div>


    </>
  )
}
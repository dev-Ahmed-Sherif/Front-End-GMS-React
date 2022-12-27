import { useSelector } from "react-redux";
import hamdy from "./profile.module.css";
// import refreshUserData from "../../App";
// import { useEffect, useState } from "react";
// // import { useSelector } from 'react-redux'
// import { useDispatch } from "react-redux";
// import { setuser } from "../../Redux/Actions/userAction";
// import axios from "axios";
// import { axiosInstance } from "../../config/axios";
import { Offcanvas, Button, OffcanvasHeader, OffcanvasBody } from 'react-bootstrap';
import './profileSideBar.css'
function ProfileDetails()
{
  const user = useSelector((state) => state.userReducer.user);
  const BMR =
    user.gender === "Male"
      ? 10 * user.weight + 6.25 * user.height - 5 * user.age + 5
      : user.gender === "Female"
        ? 10 * user.weight + 6.25 * user.height - 5 * user.age - 161
        : 1200;
  return (
    <>
      <div style={{ marginLeft:"86%", marginTop:"2%"}}>
       
        <button className="buttonApi p-3" style={{ textDecoration: "none" }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          Show
        </button>
      </div>
      {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Button with data-bs-target
      </button> */}

      <div className="offcanvas offcanvas-start bg-black" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body" style={{ fontSize: "25px" }}>

          <p>
            <span>Age: </span>
            {user.age}
          </p>
          <p>
            <span>Gender: </span>
            {user.gender}
          </p>
          <p>
            <span>Weight: </span>
            {user.weight} kg
          </p>
          <p>
            <span>Height: </span>
            {user.height} cm
          </p>
          <p>
            <span>Fat: </span>
            {user.fat} %
          </p>

          <div>
            <p>
              <span>BMI: </span>
              {isFinite(user.weight)
                ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(2)
                : "Not assigned yet"}
            </p>
            <p>
              <span>Protein: </span>
              {isFinite(user.weight)
                ? Math.ceil(user.weight * 1.2)
                : "Not assigned yet"}
              -{Math.ceil(isFinite(user.weight * 2) ? user.weight * 2 : " ")} grm{" "}
            </p>
            <p>
              <span>Healthy weight range: </span>
              {isFinite(user.height)
                ? (19 * Math.pow(user.height / 100, 2)).toFixed(2)
                : "Not assigned yet"}
              -
              {isFinite(user.height)
                ? (25 * Math.pow(user.height / 100, 2)).toFixed(2)
                : ""}
              kg
            </p>
            <p>
              <span>BMR: </span>
              {BMR}
            </p>
            <p>
              <span>Low activity: </span>
              {BMR * 1.2} cal
            </p>
            <p>
              <span>Light exercise: </span>
              {BMR * 1.375} cal
            </p>
            <p>
              <span>Moderate exercise: </span>
              {BMR * 1.55} cal
            </p>
            <p>
              <span>Active individuals: </span>
              {BMR * 1.725} cal
            </p>
            <p>
              <span>Extremly active: </span>
              {BMR * 1.9} cal
            </p>
          </div>
        </div>
      </div>

      <div className={hamdy.profileDetails}>
        {/* <div>
          <p>
            <span>Age </span>
            <br />
            {user.age}
          </p>
          <p>
            <span>Gender </span> <br />
            {user.gender}
          </p>
          <p>
            <span>Weight </span> <br />
            {user.weight} kg
          </p>
          <p>
            <span>Height </span> <br />
            {user.height} cm
          </p>
          <p>
            <span>Fat </span> <br />
            {user.fat} %
          </p>
        </div>
        <div>
          <p>
            <span>BMI </span> <br />
            {isFinite(user.weight)
              ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(2)
              : "Not assigned yet"}
          </p>
          <p>
            <span>Protein </span> <br />
            {isFinite(user.weight)
              ? Math.ceil(user.weight * 1.2)
              : "Not assigned yet"}
            -{Math.ceil(isFinite(user.weight * 2) ? user.weight * 2 : " ")} grm{" "}
          </p>
          <p>
            <span>Healthy weight range </span> <br />
            {isFinite(user.height)
              ? (19 * Math.pow(user.height / 100, 2)).toFixed(2)
              : "Not assigned yet"}
            -
            {isFinite(user.height)
              ? (25 * Math.pow(user.height / 100, 2)).toFixed(2)
              : ""}
            kg
          </p>
          <p>
            <span>BMR </span> <br />
            {BMR}
          </p>
          <p>
            <span>Low activity </span> <br />
            {BMR * 1.2} cal
          </p>
          <p>
            <span>Light exercise </span> <br />
            {BMR * 1.375} cal
          </p>
          <p>
            <span>Moderate exercise </span> <br />
            {BMR * 1.55} cal
          </p>
          <p>
            <span>Active individuals </span> <br />
            {BMR * 1.725} cal
          </p>
          <p>
            <span>Extremly active </span> <br />
            {BMR * 1.9} cal
          </p>
        </div> */}
      </div>
    </>
  );
}

export default ProfileDetails;
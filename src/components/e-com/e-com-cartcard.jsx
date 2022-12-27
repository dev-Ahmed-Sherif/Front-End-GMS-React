// import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import ima from "../../e-com/images/bottel3.jpg";
import { decount, incount } from "../../Redux/Actions/productsAction";
import Abdo from "./e-com.module.css";

function EComCartCard(props) {
  const dispatch = useDispatch();
  return (
    <>
      <div className={Abdo["cart-card"]}>
        <div>
          <img src={`http://localhost:8000${props.i.image}`} />

          <div>
            <p>{props.i.title}</p>
            <br />
            <p>{props.i.brand}</p>
          </div>
        </div>
        <div>
          <div>{props.i.price} EGP</div>
          <div>
            <span
              className={Abdo.ripple1}
              style={{ padding: ".25rem .4rem" }}
              onClick={() => {
                dispatch(decount(props.i));
              }}
            >
              -
            </span>

            <span>{props.i.count}</span>
            <span
              className={Abdo.ripple1}
              onClick={() => {
                dispatch(incount(props.i));
              }}
            >
              +
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default EComCartCard;

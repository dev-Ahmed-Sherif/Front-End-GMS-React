import React, { useState } from "react";
import { useDispatch } from "react-redux";
import IM from "../../e-com/images/bottel1.jpg";
import { addtoCart } from "../../Redux/Actions/productsAction";
import Details from "./e-com-details";
import Abdo from "./e-com.module.css";

function EComCard(props) {
  let [details, setDetails] = useState(false);
  function handel() {
    setDetails((pre) => !pre);
  }
  const dispatch = useDispatch();
  return (
    <>
      <div className={Abdo.card}>
        {details && <Details i={props.i} details={setDetails} />}
        <img  src={`http://localhost:8000${props.i.image}`} onClick={handel} />
        <div>{props.i.title}</div>
        <div>
          <span>{props.i.price} EGP</span>
          <button
            className={`${Abdo["card-button"]} ${Abdo.ripple}`}
            onClick={() => {
              dispatch(addtoCart(props.i));
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
export default EComCard;

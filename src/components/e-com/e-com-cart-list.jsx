import React from "react";
import { useSelector } from "react-redux";
import EComCartCard from "./e-com-cartcard";
import Abdo from "./e-com.module.css";

function ECartList() {
  const cart = useSelector((state) => state.cartReducer.cart);
  let cartmap = cart.map((item) => <EComCartCard i={item} key={item.title} />);
  return (
    <>
      <div>
        <div id={Abdo["cart-head"]}>Cart</div>
        {cartmap}
      </div>
    </>
  );
}

export default ECartList;

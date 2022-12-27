import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import Abdo from "./e-com.module.css";
import axios from "axios";
import io from "socket.io-client";
import { axiosInstance } from "../../config/axios";
import { checkoutt } from "../../Redux/Actions/productsAction";
function EComCheckout()
{
  const dispatch = useDispatch();
  const [notification, setNotification] = useState("");
  let cart = useSelector((state) => state.cartReducer.cart);
  let x = 0;
  let user = useSelector((state) => state.userReducer.user);
  for (let i of cart)
  {
    x += i.price * i.count;
  }

    
  // socket.on("orderResponse", (msg) =>
  // {
  //    //dispatch(setNotification(msg));
  //     
  // });

  function checkout()
  {
    const socket = io("http://localhost:4000");
    if ((user.email, user.address, user.phoneNumber))
    {
      axios.post(`http://localhost:8000/api/v1/users/placeorder`, {
          email: user.email,
        })
        .then((res) =>
        {
          dispatch(checkoutt());
          alert("Your order has been placed successfuly");
        });
    } else
    {
      // alert("Please fill in your phone number and address");
    }
    socket.emit("Order", user.email);
    axios.post("http://localhost:8000/api/v1/notification/create", {
      notificationSender: user.email,
      notificationMsg:'new order',
      notificationDate:new Date().toDateString()

    });
  }
  useEffect(() =>
  {
    axiosInstance.patch("/users/update", {
      email: user.email,
      cart: cart,
    });
  }, [cart]);

  return (
    <>
      <div>
        <div className={Abdo.checkout}>Check Out</div>
        <div className={Abdo.checkout}>Total : {x} EGP</div>
        <div className={Abdo.checkout}>
          <button className={Abdo.ripple} onClick={checkout}>
            Complete the order
          </button>
        </div>
      </div>
    </>
  );
}

export default EComCheckout;
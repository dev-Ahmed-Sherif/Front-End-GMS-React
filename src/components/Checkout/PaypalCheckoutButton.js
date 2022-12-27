import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../../Redux/Actions/userAction";
import axios from "axios";
function PaypalCheckoutButton(props)
{
  let user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const { product } = props;
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = async (orderID) =>
  {

    setPaid(true);
    let endsin = Math.floor(
      (new Date(user.endDate) - Date.now()) / (1000 * 60 * 60 * 24)
    );
    let date =
      user.endDate && endsin && user.subscription == "premium"
        ? user.endDate
        : new Date(Date.now()).toDateString();
    let newend = addDays(date);
    
    axios
      .patch(
        `http://localhost:8000/api/v1/users/update`,
        { subscription: product.sub, email: user.email, endDate: newend },
      )
      .then(() =>
      {
        dispatch(setuser({ subscription: product.sub, endDate: newend }));
        alert("Purchase Succeeded!");
      });
  }
  if (paid)
  {

  }
  if (error)
  {
    alert("An Error Occured!");
  }
  // async function payment() {
  //   let endsin = Math.floor(
  //     (new Date(user.endDate) - Date.now()) / (1000 * 60 * 60 * 24)
  //   );
  //   let date =
  //     user.endDate && endsin && user.subscription == "premium"
  //       ? user.endDate
  //       : new Date(Date.now()).toDateString();
  //   let newend = addDays(date);
  //   
  //   await axios
  //     .patch(
  //       `http://localhost:8000/api/v1/users/update`,
  //       { subscription: product.sub, email: user.email, endDate: newend },
  //       {
  //         headers: { authorization: Token },
  //       }
  //     )
  //     .then(() => {
  //       dispatch(setuser({ subscription: product.sub, endDate: newend }));
  //     });
  // }
  function addDays(date)
  {
    var result = new Date(date);
    result.setDate(result.getDate() + 30);
    return result;
  }
  return (
    <PayPalButtons
      className="mx-5"
      style={{
        color: "silver",
        layout: "horizontal",
        tagline: false,
        shape: "pill",
      }}
      onClick={(data, actions) =>
      {
        const hasAlreadyBought = false;
        if (hasAlreadyBought)
        {
          setError("You have already bought this cart!");
          return actions.reject();
        } else
        {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) =>
      {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: product.price,
                currency: product.currency,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) =>
      {
        let order = await actions.order.capture();
        
        handleApprove(data.orderID);
      }}
      onError={(err) =>
      {
        setError(err);
        console.error("paypal error", err);
      }}
      onCancel={() => { }}
    />
  );
}

export default PaypalCheckoutButton;

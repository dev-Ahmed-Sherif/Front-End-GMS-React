import React, { useEffect } from "react";

import Abdo from "./e-com.module.css";
import EComHeader from "./e-com-header";
import EComMain from "./e-com-main";
import ECart from "./e-com-cart";
import { Routes, Route } from "react-router-dom";
import Guard from "../../guard";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setProduce,
  setPagenate,
} from "../../Redux/Actions/productsAction";
import axios from "axios"
function ECom() {
  const dispatch = useDispatch();
  const produce = useSelector((state) => state.produceReducer.produce);
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/products/`).then((res) => {
      dispatch(setProducts(res.data));
    });
  }, [produce]);
 

  const products = useSelector((state) => state.productReducer.products);
  useEffect(() => {
    if (produce.length === 0) {
      dispatch(setProduce(products));
    }
  }, [products]);

  useEffect(() => {
    dispatch(
      setPagenate({
        NOP: Math.ceil(produce.length / 12),
        curpage: 1,
        nextpage: 2,
        prepage: 0,
      })
    );
  }, [produce]);

  return (
    <>
      {/* <Navbar /> */}
      {/* ecommerce route */}
      <Routes>
        <Route
          path="/main"
          element={
            <>
              <EComHeader />
              <EComMain />
            </>
          }
        />
        {/* cart route */}
        <Route
          path="cart"
          element={
            <Guard>
              <ECart />
            </Guard>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default ECom;

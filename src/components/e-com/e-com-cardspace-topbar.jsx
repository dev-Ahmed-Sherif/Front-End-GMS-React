// import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPagenate, setProduce } from "../../Redux/Actions/productsAction";
import Abdo from "./e-com.module.css";

function EComCardspaceTobar(props) {
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();

  function search(event) {
    if (event.key === "Enter") {
      const val = event.target.value.toLowerCase();
      let reg = new RegExp(val);
      let x = products.filter((i) => reg.test(i.title.toLowerCase()));
      dispatch(setProduce(x));
      dispatch(
        setPagenate({
          NOP: Math.ceil(x.length / 10),
          curpage: 1,
          nextpage: 2,
          prepage: 0,
        })
      );
    }
  }
  function showmenue() {
    props.sidebar[1]((pre) => !pre);
  }
  return (
    <>
      <div id={Abdo["top-bar"]}>
        <FontAwesomeIcon
          icon={faBars}
          className={Abdo.fabars}
          onClick={showmenue}
        />

        <div>Products</div>
        <div>
          <div id={Abdo.search} >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              // className={Abdo.faa}
              onClick={search}
              style={{ color:"#222" ,height:"1.5rem"}}
            />
            <input type="text" onKeyPress={search} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EComCardspaceTobar;

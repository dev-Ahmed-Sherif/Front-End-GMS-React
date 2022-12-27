import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setProduce, setPagenate } from "../../Redux/Actions/productsAction";
import Abdo from "./e-com.module.css";

function EComSidebar(props) {
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  let [search, setSearch] = useState({
    sort: "",
    min: 500,
    max: 1500,
    ALL: true,
    Supplements: false,
    Resistanceband: false,
    proteinshakers: false,
    Bags: false,
    Weights: false,
    Accessories: false,
  });
  let [slider, setSlider] = useState({ mi: 0, ma: 2000 });

  // useEffect(() => {
  //   for (let j of props.i) {
  //     if (j.price > slider.ma) {
  //       setSlider((pre) => {
  //         return { ...pre, ma: j.price };
  //       });
  //     } else if (j.price < slider.mi) {
  //       setSlider((pre) => {
  //         return { ...pre, mi: j.price };
  //       });
  //     }
  //   }
  // }, [props.i]);

  function change(event) {
    let { name, value, checked, type } = event.target;

    if (name === "min") {
      if (search.max < value) {
        value = search.max - 50;
      } else {
      }
    } else if (name === "max") {
      if (search.min > value) {
        value = search.min + 50;
      } else {
      }
    }

    setSearch((pre) => {
      return { ...pre, [name]: type === "checkbox" ? checked : value };
    });
  }

  function sorted(a, b) {
    if (search.sort === "price1") {
      if (a.price > b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (a[search.sort] > b[search.sort]) {
        return 1;
      } else if (a[search.sort] > b[search.sort]) {
        return -1;
      } else {
        return 0;
      }
    }
  }
  function searched() {
    let sear = products.filter(
      (i) => i.price > search.min && i.price < search.max
    );
    let filterd = sear.filter((i) => {
      return search.ALL
        ? i.category === "Supplements" ||
            i.category === "Resistance band" ||
            i.category === "bottles" ||
            i.category === "Bags" ||
            i.category === "Weights" ||
            i.category === "Accessories"
        : (search.Supplements && i.category === "Supplements") ||
            (search.Resistanceband && i.category === "Resistance band") ||
            (search.proteinshakers && i.category === "bottles") ||
            (search.Bags && i.category === "Bags") ||
            (search.Weights && i.category === "Weights") ||
            (search.Accessories && i.category === "Accessories");
    });
    let sor = filterd.sort(sorted);
    dispatch(setProduce(sor));
    dispatch(
      setPagenate({
        NOP: Math.ceil(sor.length / 10),
        curpage: 1,
        nextpage: 2,
        prepage: 0,
      })
    );
  }
  function showmenue() {
    props.sidebar[1]((pre) => !pre);
  }
  return (
    <>
      <div
        id={Abdo["side-bar"]}
        style={{ left: props.sidebar[0] ? "0" : "-50%" }}
      >
        <FontAwesomeIcon icon={faX} className={Abdo.fax} onClick={showmenue} />

        <div>
          <h3>Sort by</h3>
          <br />
          <label htmlFor="Title" className={Abdo.container}>
            {" "}
            <input
              type="radio"
              name="sort"
              id="Title"
              checked={search.sort === "title"}
              value="title"
              onChange={change}
            />
            Title
            <span className={Abdo.checkmark}></span>
          </label>{" "}
          <br />
          <label htmlFor="Heighestprice" className={Abdo.container}>
            <input
              type="radio"
              name="sort"
              id="Heighestprice"
              checked={search.sort === "price1"}
              value="price1"
              onChange={change}
            />
            Heighest price
            <span className={Abdo.checkmark}></span>
          </label>
          <br />
          <label htmlFor="lowestprice" className={Abdo.container}>
            <input
              type="radio"
              name="sort"
              id="lowestprice"
              checked={search.sort === "price"}
              value="price"
              onChange={change}
            />
            lowest price
            <span className={Abdo.checkmark}></span>
          </label>
          <br />
          <label htmlFor="Popularity" className={Abdo.container}>
            <input
              type="radio"
              name="sort"
              id="Popularity"
              checked={search.sort === "quantity"}
              value="quantity"
              onChange={change}
            />
            Popularity <span className={Abdo.checkmark}></span>
          </label>
          <br />
        </div>
        <div>
          <h3>Category</h3>
          <br />
          <label htmlFor="ALL" className={Abdo.container}>
            <input
              type="checkbox"
              name="ALL"
              id="ALL"
              checked={search.ALL}
              onChange={change}
            />{" "}
            ALL
            <span className={Abdo.checkmark}></span>
          </label>{" "}
          <br />
          <label htmlFor="Supplements" className={Abdo.container}>
            <input
              type="checkbox"
              name="Supplements"
              id="Supplements"
              checked={search.Supplements}
              onChange={change}
            />
            Supplements
            <span className={Abdo.checkmark}></span>
          </label>
          <br />
          <label htmlFor="Resistance band" className={Abdo.container}>
            <input
              type="checkbox"
              name="Resistanceband"
              id="Resistance band"
              checked={search.Resistanceband}
              onChange={change}
            />{" "}
            Resistance band
            <span className={Abdo.checkmark}></span>
          </label>
          <br />
          <label
            htmlFor="bottles and protein shakers"
            className={Abdo.container}
          >
            <input
              type="checkbox"
              name="proteinshakers"
              id="bottles and protein shakers"
              checked={search.proteinshakers}
              onChange={change}
            />{" "}
            protein shakers <span className={Abdo.checkmark}></span>
          </label>
          <br />
          <label htmlFor="Bags" className={Abdo.container}>
            <input
              type="checkbox"
              name="Bags"
              id="Bags"
              checked={search.Bags}
              onChange={change}
            />{" "}
            Bags
            <span className={Abdo.checkmark}></span>
          </label>
          <br />
          <label htmlFor="Weights" className={Abdo.container}>
            {" "}
            <input
              type="checkbox"
              name="Weights"
              id="Weights"
              checked={search.Weights}
              onChange={change}
            />{" "}
            Weights
            <span className={Abdo.checkmark}></span>
          </label>
          <br />
          <label htmlFor="Accessories" className={Abdo.container}>
            <input
              type="checkbox"
              name="Accessories"
              id="Accessories"
              checked={search.Accessories}
              onChange={change}
            />{" "}
            Accessories <span className={Abdo.checkmark}></span>
          </label>
          <br />
        </div>

        <div className={Abdo.input}>
          <h3>Price range</h3>
          <div className={Abdo.slider}>
            <div
              className={Abdo.progress}
              style={{
                left: `${(search.min / slider.ma) * 100}%`,
                right: `${100 - (search.max / slider.ma) * 100}%`,
              }}
            ></div>
          </div>
          <div className={Abdo.range}>
            <input
              type="range"
              className={Abdo.min}
              min={slider.mi}
              max={slider.ma}
              value={search.min}
              step="25"
              name="min"
              onChange={change}
            />
            <input
              type="range"
              className={Abdo.max}
              min={slider.mi}
              max={slider.ma}
              name="max"
              value={search.max}
              step="25"
              onChange={change}
            />
          </div>
          <div>
            <input
              type="number"
              value={search.min}
              id="min"
              name="min"
              onChange={change}
            />
            -
            <input
              type="number"
              value={search.max}
              id="max"
              name="max"
              onChange={change}
            />
          </div>
        </div>

        <button
          onClick={searched}
          className={`${Abdo["card-button"]} ${Abdo.ripple}`}
          style={{ margin: "10%" }}
        >
          Apply
        </button>
      </div>
    </>
  );
}

export default EComSidebar;

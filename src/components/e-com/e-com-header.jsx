import React, { useEffect, useState } from "react";
import img from "../../images/slider4.jpg";
import img1 from "../../images/slider2.jpg";
import img2 from "../../images/slider3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import Abdo from "./e-com.module.css";

function EComHeader() {
  let imges = [img, img1, img2];
  let [num, setNum] = useState(1);
  let view = imges[num];

  ////// slider interval//////
  useEffect(() => {
    let slider = setInterval(function () {
      setNum((pre) => {
        if (pre < imges.length - 1) {
          return pre + 1;
        } else {
          return (pre = 0);
        }
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, []);
  //////////////////slider next////////////////
  function next() {
    setNum((pre) => {
      if (pre < imges.length - 1) {
        return pre + 1;
      } else {
        return 0;
      }
    });
  }
  //////////////////slider previous////////////////

  function prev() {
    setNum((pre) => {
      if (pre > 0) {
        return pre - 1;
      } else {
        return imges.length - 1;
      }
    });
  }
  return (
    <>
      <section>
        <div className={`${Abdo.home} ${Abdo.view}`}>
          <div className={Abdo.background}>
            <div className={Abdo.slideShow}>
              <img src={view} />
              <div>
                <FontAwesomeIcon
                  icon={faAngleDoubleLeft}
                  className={Abdo.slideleft}
                  onClick={prev}
                />
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  className={Abdo.slideright}
                  onClick={next}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EComHeader;

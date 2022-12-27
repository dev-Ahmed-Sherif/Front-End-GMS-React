import React from "react";
import style from './HeroSection.module.css'

function HeroSection()
{
  return (
    <>
    <div className={style.food_home}>
      <div className={style.highlights}>
        <div className={style.static_food}>Let's help someone to </div>
        <div className={style.dynamic_food}>
          <li><span>be fit...</span></li>
        </div>
      </div>
      <div className={style.food_background}>
      </div>
    </div>
     <div className="ExBoxSquareAnimated">
     <div className="exAnimateSquare" >
       <i class="uil uil-angle-double-down"></i>
       {/* <p>We love Egypt</p> */}
     </div>
   </div>
   </>
  );
}

export default HeroSection;
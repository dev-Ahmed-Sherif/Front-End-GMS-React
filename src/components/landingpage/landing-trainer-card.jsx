import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import abdo from "./style.module.css";

function LandingTrainerCard() {
  return (
    <>
      {" "}
      <div className={abdo.frame}>
        <div className={abdo.box}>
          <img src="./images/header 1.jpg" />
        </div>
        <div className={abdo.headline}>
          <div className={abdo.title}>Someone Famous</div>
          <div className={abdo.icons}>
            <FontAwesomeIcon
              icon={faFacebookF}
              className={`${abdo.fab} ${abdo["fa-facebook-f"]}`}
              style={{ color: "#2374E1", margin: "5px" }}
            />
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: "#1DA1F2", margin: "5px" }}
            />
            <FontAwesomeIcon
              icon={faLinkedinIn}
              style={{ color: "#0A66C2", margin: "5px" }}
            />
          </div>
        </div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <a href="#">Explore</a>
      </div>
    </>
  );
}

export default LandingTrainerCard;

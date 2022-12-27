import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import Abdo from "./e-com.module.css";

function Footer() {
  return (
    <>
      <div className={Abdo.Copyright}>
        <marquee>
          Copyright @ 2022 GYM Management System{" "}
          <FontAwesomeIcon icon={faDumbbell} />
        </marquee>
      </div>
    </>
  );
}

export default Footer;

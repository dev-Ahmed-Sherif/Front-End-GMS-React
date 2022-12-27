import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTheTop() {
  function scrollup() {
    window.scrollTo(0, 0);
  }
  return (
    <FontAwesomeIcon
      icon={faCircleArrowUp}
      onClick={scrollup}
      style={{
        color: "#ff5733",
        position: "fixed",
        bottom: "5%",
        right: "2%",
        fontSize: "2rem",
      }}
    />
  );
}

export default ScrollToTheTop;

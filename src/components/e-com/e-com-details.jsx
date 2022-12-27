import IM from "../../e-com/images/bottel1.jpg";
import Abdo from "./e-com.module.css";

function Details(props) {
  return (
    <>
      <div
        className={Abdo.Details}
        onDoubleClick={() => {
          props.details((pre) => !pre);
        }}
      >
        <div>
          <div>
            <img src={IM} />
          </div>
          <div>
            <p>
              <h3>Product:</h3> {props.i.title}
            </p>
            <p>
              <h3>Brand:</h3>
              {props.i.brand}
            </p>
            <p>
              <h3> Production country:</h3>
              {props.i.details.made}
            </p>
            <p>
              <h3>Color:</h3>
              {props.i.details.color}
            </p>
            <p>
              <h3>In the Box:</h3> {props.i.details.box}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;

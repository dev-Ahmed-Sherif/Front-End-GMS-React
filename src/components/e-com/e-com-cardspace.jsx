import EComCardspaceTobar from "./e-com-cardspace-topbar";
import EComCardspaceMain from "./e-com-cardspace-main";
import Pagenation from "./e-com-pagenation";
import Abdo from "./e-com.module.css";

function EComCardspace(props) {
  return (
    <>
      {" "}
      <div id={Abdo["card-space"]}>
        <EComCardspaceTobar sidebar={props.sidebar} />
        <EComCardspaceMain />
        <Pagenation />
      </div>
    </>
  );
}

export default EComCardspace;

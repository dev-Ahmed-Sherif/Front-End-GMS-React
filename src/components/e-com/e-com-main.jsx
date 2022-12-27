import EComSidebar from "./e-com-sidebar";
import EComCardspace from "./e-com-cardspace";
import { useState } from "react";
import Abdo from "./e-com.module.css";

function EComMain() {
  let [showSort, setShowSort] = useState(false);
  return (
    <>
      <section className={Abdo["e-com"]}>
        {" "}
        <EComSidebar sidebar={[showSort, setShowSort]} />
        <EComCardspace sidebar={[showSort, setShowSort]} />{" "}
      </section>
    </>
  );
}

export default EComMain;

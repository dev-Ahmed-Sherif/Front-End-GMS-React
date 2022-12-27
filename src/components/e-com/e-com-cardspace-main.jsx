import { useSelector } from "react-redux";
import EComCard from "./e-com-card";
import Abdo from "./e-com.module.css";

function EComCardspaceMain() {
  const produce = useSelector((state) => state.produceReducer.produce);
  const pagenation = useSelector((state) => state.pagenateReducer.pagenate);
  let page = produce.slice(pagenation.prepage * 12, pagenation.curpage * 12);
  let cards = page.map((item) => <EComCard i={item} key={item.title} />);
  return (
    <>
      <div className={Abdo["main-card"]}>{cards}</div>
    </>
  );
}

export default EComCardspaceMain;

import { useDispatch, useSelector } from "react-redux";
import { setPagenate } from "../../Redux/Actions/productsAction";
import Abdo from "./e-com.module.css";

function Pagenation() {
  const dispatch = useDispatch();
  const prev = useSelector((state) => state.pagenateReducer.pagenate);
  function next() {
    

    
    dispatch(
      setPagenate({
        curpage: prev.curpage + 1,
        nextpage: prev.nextpage + 1,
        prepage: prev.prepage + 1,
      })
    );
  }

  function pre() {
    
    
    dispatch(
      setPagenate({
        curpage: prev.curpage - 1,
        nextpage: prev.nextpage - 1,
        prepage: prev.prepage - 1,
      })
    );
  }

  return (
    <>
      <nav>
        <ul style={{ justifyContent: "center", margin: "2rem 0" }}>
          <li
            onClick={
              prev.NOP > 1 && prev.nextpage <= prev.NOP ? next : undefined
            }
          >
            <span aria-hidden="true" style={{ color: "#ff5733" }}>
              &laquo;
            </span>
          </li>
          {prev.nextpage > 0 && prev.nextpage <= prev.NOP && prev.NOP > 1 && (
            <li onClick={next} style={{ color: "#fff" }}>
              {prev.nextpage}
            </li>
          )}

          {prev.curpage > 0 && (
            <li style={{ color: "#fff" }}>{prev.curpage}</li>
          )}
          {prev.prepage > 0 && (
            <li onClick={pre} style={{ color: "#fff" }}>
              {prev.prepage}
            </li>
          )}
          <li onClick={prev.curpage > 0 ? pre : undefined}>
            <span style={{ color: "#ff5733" }}>&raquo;</span>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagenation;

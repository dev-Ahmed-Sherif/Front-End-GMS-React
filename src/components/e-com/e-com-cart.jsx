import ECartList from "./e-com-cart-list";
import EComCheckout from "./e-com-cart-checkout";
import Abdo from "./e-com.module.css";

function ECart() {
  return (
    <>
      <section className={Abdo.cart}>
        <ECartList />
        <EComCheckout />
        <div className={Abdo.cartbg}></div>
      </section>
    </>
  );
}

export default ECart;

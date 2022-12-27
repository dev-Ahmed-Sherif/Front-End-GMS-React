import abdo from "./style.module.css";

function LandingHeader() {
  return (
    <>
      <section>
        <div className={`${abdo.home} ${abdo.view} `}>
          <div className={abdo.highlights}>
            <h3>Feel The Power With</h3>
            <h1>
              <b>OUR </b>GYM
            </h1>
            <p className={abdo.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              esse aspernatur quod quaerat earum consequatur? Vero consequatur
              repellat maiores architecto.
            </p>
            <button className={abdo.join}>Join Now</button>
          </div>
          <div className={abdo.background}></div>
        </div>
      </section>
    </>
  );
}

export default LandingHeader;

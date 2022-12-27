import image from "../../images/hero-banner.png";
import abdo from "./style.module.css";
function LandingAbout() {
  return (
    <>
      <section className={abdo["about-us"]}>
        <div id="about" className={`${abdo.about} ${abdo.view}`}>
          <div className={abdo.main}>
            <h2>
              <span>A</span>bout US
            </h2>
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
          </div>
          <div className={abdo.content}>
            <div className={abdo["col-2"]}>
              <p>
                <b>L</b>orem ipsum dolor sit amet consectetur adipisicing elit.
                Quae nemo, dicta perferendis necessitatibus fuga deleniti quia
                consequuntur reprehenderit voluptatibus alias veritatis in
                provident sint vel incidunt tempore ipsam corrupti
                exercitationem eaque optio. Quas sunt veritatis iusto quis dolor
                asperiores, sint
              </p>

              <button className={abdo.join}>More</button>
            </div>
            <div className={abdo["col-2"]}>
              <div className={abdo["right-side"]}>
                <img src={image} />
                <div className={abdo.box}>
                  <div className={abdo.triangle}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingAbout;

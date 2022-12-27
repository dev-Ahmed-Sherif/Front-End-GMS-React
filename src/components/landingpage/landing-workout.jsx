import imag from "../../images/workout6.jpg";
import abdo from "./style.module.css";

function LandingWorkout() {
  return (
    <>
      <section>
        <div id="workout" className={`${abdo.workout} ${abdo.view}`}>
          <div className={abdo.main}>
            <h2>
              <span>W</span>orkout
            </h2>
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
          </div>
          <div className={abdo.content}>
            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className={abdo.frame}>
              <div className={abdo.box}>
                <img src={imag} />
              </div>
              <div className={abdo.title}>Someone Famous</div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingWorkout;

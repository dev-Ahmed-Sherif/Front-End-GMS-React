import LandingTrainerCard from "./landing-trainer-card";
import abdo from "./style.module.css";

function LandingTrainers() {
  return (
    <>
      <section>
        <div className={`${abdo.trainers} ${abdo.view}`} id={abdo.trainers}>
          <div className={abdo.main}>
            <h2>
              <span>B</span>est <span>T</span>rainers
            </h2>
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
          </div>
          <div className={abdo.content}>
            <LandingTrainerCard />
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingTrainers;

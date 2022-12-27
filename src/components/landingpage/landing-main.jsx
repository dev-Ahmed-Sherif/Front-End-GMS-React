import LandingAbout from "./landing-about";
import LandingContact from "./landing-contact";
import LandingDite from "./landing-dite";
import LandingHeader from "./landing-header";
import Subscription from "./landing-sub";
import LandingTrainers from "./landing-trainers";
import LandingWorkout from "./landing-workout";

function LandingPage() {
  return (
    <>
      <LandingHeader />
      <LandingAbout />
      <Subscription />
      <LandingWorkout />
      <LandingTrainers />
      <LandingDite />
      <LandingContact />
    </>
  );
}

export default LandingPage;

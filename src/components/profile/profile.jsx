import ProfileDite from "./profiledite";
import ProfileExcersise from "./profileexercise";
import ProfileTop from "./profiletop";
import hamdy from "./profile.module.css";
import ProfileDetails from "./profiledetails";

function Profile()
{
  return (
    <>
      <ProfileTop />
      <section className={hamdy.Profilebottom}>
        <ProfileDetails />
        <ProfileExcersise />
        <ProfileDite />
      </section>
    </>
  );
}

export default Profile;

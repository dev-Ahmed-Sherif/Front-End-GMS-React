import hamdy from "./profile.module.css";
import { useSelector } from "react-redux";
import ProfileExerciseCard from "../profileExerciseCard/ProfileExerciseCard";

function ProfileExcersise()
{
  const userExerciseHistory = useSelector(
    (state) => state.userReducer.user.exersiceHistory
  );
  

  return (
    <>
      <section className={hamdy.Profileexcersise}>
        <div>
          {userExerciseHistory &&
            userExerciseHistory.map((item) => (
              <ProfileExerciseCard type="fav" data={item} />
            ))}
        </div>
      </section>
    </>
  );
}

export default ProfileExcersise;
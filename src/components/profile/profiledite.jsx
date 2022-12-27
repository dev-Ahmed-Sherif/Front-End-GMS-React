import hamdy from "./profile.module.css";
import ProfileFoodCard from "../ProfileFoodCard/ProfileFoodCard";
import { useSelector } from "react-redux";

function ProfileDite()
{
  const userhealthyFoodHistory = useSelector(
    (state) => state.userReducer.user.healthyFoodHistory
  );

  
  return (
    <>
      <section className={hamdy.Profiledite}>
        <div>
          {userhealthyFoodHistory &&
            userhealthyFoodHistory.map((item) => (
              <ProfileFoodCard type="fav" data={item} />
            ))}
        </div>
      </section>
    </>
  );
}

export default ProfileDite;
import img from "../../images/cover.jpg";
import img1 from "../../images/profile.webp";
import { useSelector } from "react-redux";
import hamdy from "./profile.module.css";
import { useEffect } from "react";
function ProfileTop()
{
  const user = useSelector((state) => state.userReducer.user);
  useEffect(() =>
  {
    
  }, []);

  return (
    <>
      <section>
        {/* <img src={img} alt="" className={hamdy.coverImage} /> */}
        <img
          src={`http://localhost:8000/${user.profileImage}`}
          alt=""
          className={hamdy.profileImage}
        />
        <h1 className={hamdy.profileName}>
          {user.firstName + " " + user.lastName}
        </h1>
      </section>
    </>
  );

}

export default ProfileTop;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap"
import Navbar from "./components/e-com/Navbar";
import ECom from "./components/e-com/e-com";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/e-com/footer";
import LandingPage from "./components/landingpage/landing-main";
import { useEffect, useState } from "react";
import ScrollToTheTop from "./components/e-com/scrollup";
import Profile from "./components/profile/profile";
import LoginForm from "./components/login/LoginForm";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import AllExercise from "./pages/AllExercise";
import FavExercise from "./pages/FavExercise";
import AllTrainee from "./pages/AllTrainee";
import HealthyFood from "./pages/HealthyFood";
import ToDoListExercise from "./pages/ToDoListExercise";
import Bigcontainer from "./components/bigContainer/Bigcontainer";
import Food from "./components/Food/Food";
import AddNewFood from "./components/AddNewFood/AddNewFood";
import Trainees from "./components/Trainees/Trainees";
import AssignedFood from "./components/AssignedFood/AssignedFood";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { axiosInstance } from "./config/axios";
import { useDispatch } from "react-redux";
import { setuser } from "./Redux/Actions/userAction";
import { setcart } from "./Redux/Actions/productsAction";
import Guard from "./guard";


function App()
{
  let [scroll, setScroll] = useState(window.scrollY);
  const dispatch = useDispatch()
  //--------------To Presist User Data On Page Reloads-------------
  useEffect(() =>
  {
    axiosInstance.post("/users/gateway").then((res) =>
    {
      dispatch(setuser(res.data));
      dispatch(setcart(res.data.cart));
    });
  }, []);

  useEffect(() =>
  {
    window.addEventListener("scroll", () =>
    {
      setScroll(window.scrollY);
    });

  }, []);

  const navigateTo = useNavigate()
  function authUser()
  {
    const token = localStorage.getItem('token')
    if (!token)
    {
      navigateTo('/login')
    } else
    {
      navigateTo('/profile')
    }
  }
  return (
    <>

      <PayPalScriptProvider
        options={{ "client-id": "ASxEe92P4RUkBhG1GLVzBbNj8Ppl4U93513px8QsIxARQsTfIolxx_sGj0tddu8vjPgaT8Yv5wYeK7mi" }}
      >
        <Navbar position="fixed" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />
          <Route path="/ecom/*" element={<ECom />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Guard><Profile /></Guard>} />
          <Route path="/AccountSettings" element={<Guard><AccountSettings /></Guard>} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}

          ---------------------Exersice Routes--------------------------
          <Route path="/bigContainer" element={<Guard><Bigcontainer /></Guard>} />
          <Route path='/AllExercise' element={<Guard><AllExercise /></Guard>} />
          <Route path='/FavExercise' element={<Guard><FavExercise /></Guard>} />
          <Route path='/AllTrainee' element={<Guard><AllTrainee /></Guard>} />
          <Route path='/ToDoListExercise' element={<Guard><ToDoListExercise /></Guard>} />

          -----------------Food Routes---------------
          <Route path='/HealthyFood' element={<Guard><HealthyFood /></Guard>} />
          <Route path='/foods' element={<Guard><Food /></Guard>} />
          <Route path='/new' element={<Guard><AddNewFood /></Guard>} />
          {/* <Route path='/trainees' element={<Trainees />} />
                <Route path='/assignFood' element={<AssignedFood />} /> */}

        </Routes>
        {scroll > 500 && <ScrollToTheTop />}
        <Footer /></PayPalScriptProvider>
    </>
  );
}

export default App;

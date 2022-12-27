import React from 'react'
import { useFormik } from 'formik';
import style from './AccountSettings.module.css'
import * as Yup from "yup";
import { axiosInstance } from '../../config/axios'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap'
import $ from 'jquery'
import './Account.css'
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

function AccountSettings()
{

  const user = useSelector((state) => state.userReducer.user);
  const account = useFormik({
    initialValues: {
      profileImage: "",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      bio: user.bio,
      gender: user.gender,
      age: user.age,
      height: user.height,
      weight: user.weight
    },

    validationSchema: Yup.object({
      profileImage: Yup.string(),
      // .min(4, "Must be 4 characters or more"),

      firstName: Yup.string()
        .min(4, "Must be 4 characters or more"),

      lastName: Yup.string()
        .min(4, "Must be 4 characters or more"),

      phoneNumber: Yup.string()
        .min(4, "Must be 4 characters or more"),

      address: Yup.string()
        .min(4, "Must be 4 characters or more"),

      bio: Yup.string()
        .min(4, "Must be 4 characters or more"),

      gender: Yup.string()
        .min(4, "Must be 4 characters or more"),

      age: Yup.string()
        .max(2, "Must be 4 characters or more"),

      height: Yup.string()
        .max(3, "Must be 4 characters or more"),

      weight: Yup.string()
        .min(2, "Must be 4 characters or more"),
    }),


    onSubmit: values =>
    {
      
      const form = new FormData();
      form.append('profileImage', values.file);
      form.append('firstName', values.firstName);
      form.append('lastName', values.lastName);
      form.append('phoneNumber', values.phoneNumber);
      form.append('address', values.address);
      form.append('bio', values.bio);
      form.append('age', values.age);
      form.append('height', values.height);
      form.append('weight', values.weight);
      form.append('gender', values.gender);
      // const newUser = {

      // }
      // if (values.firstName !== "")
      // {
      //   newUser.firstName = values.firstName;
      // }
      // if (values.lastName !== "")
      // {
      //   newUser.firstName = values.lastName;
      // }
      // if (values.phoneNumber !== "")
      // {
      //   newUser.phoneNumber = values.phoneNumber;
      // }
      // if (values.address !== "")
      // {
      //   newUser.address = values.address;
      // }
      
      axiosInstance.patch('/users/updateSettings', form).then((error, res) =>
      {
        toast.success('Updated Successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }).catch(error =>
      {
        
        // alert('Login Faild !')
        toast.error('Invalid inputs !', {
          position: "top-center",
          marginTop: "30%",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      
    }

  }
  );




  return (

    <div className="container" style={{ margineTop: '35%' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
          <h2 className="h3 mb-4 page-title">Settings</h2>
          <div className="my-4">
            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Profile</a>
              </li>
            </ul>
            <form onSubmit={account.handleSubmit} encType='multipart/form-data'>

              <div className="row mt-5 align-items-center">
                <div className="col-md-3 text-center mb-5">
                  <div className="avatar avatar-xl">
                    
                    
                    <img src={`http://localhost:8000/${user.profileImage}`} alt="oooo" className="avatar-img rounded-circle" />

                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <i className={`uil uil-plus ${style.imagePicker}`} aria-hidden="true"></i>
                      </label>

                      <input id="file-input" type="file" name='file' value={account.values.profileImage} onChange={(event) =>
                      {
                        account.setFieldValue("file", event.currentTarget.files[0]);
                      }} style={{ display: "none" }} />
                    </div>

                  </div>
                </div>
                <div className="col mx-5">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <h4 className="mb-1">{user.firstName}</h4>
                      <p className="small mb-3"><span className="badge badge-dark">{user.address}</span></p>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-7">
                      <p className="text-muted">
                        {user.bio}
                      </p>
                    </div>
                    <div className="col">
                      <p className="small mb-0 text-muted">{user.address}</p>
                      <p className="small mb-0 text-muted">{user.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="form-row">


                <div className="form-group col-md-6">
                  <label htmlFor="firstname">First Name</label>
                  <input onChange={account.handleChange} name="firstName" type="text" id="firstname" className="form-control" placeholder={user.firstName} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastname">Last Name</label>
                  <input onChange={account.handleChange} name="lastName" type="text" id="lastname" className="form-control" placeholder={user.lastName} />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input onChange={account.handleChange} name="phoneNumber" type="text" id="phoneNumber" className="form-control" placeholder={user.phoneNumber}  />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress5">Address</label>
                <input onChange={account.handleChange} name="address" type="text" className="form-control" id="inputAddress5" placeholder={user.address}  />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCompany5">Bio</label>
                  <input onChange={account.handleChange} name="bio" type="text" className="form-control" id="inputCompany5" placeholder={user.bio}  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputCompany5">Age</label>
                  <input onChange={account.handleChange} name="age" type="number" className="form-control" id="inputCompany5" placeholder={user.age}  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputCompany5">Height</label>
                  <input onChange={account.handleChange} name="height" type="number" className="form-control" id="inputCompany5" placeholder={user.height}  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputCompany5">Weight</label>
                  <input onChange={account.handleChange} name="weight" type="number" className="form-control" id="inputCompany5" placeholder={user.weight}  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState5">Gender</label>
                  <select onChange={account.handleChange} name="gender" id="inputState5" className="form-control" >
                    <option value="male" >{user.gender === "male" ? "male" : "female"}</option>
                    <option value="female">{user.gender !== "male" ? "male" : "female"}</option>
                  </select>
                </div>
                {/* <div className="form-group col-md-2">
                  <label htmlFor="inputZip5">Zip</label>
                  <input type="text" className="form-control" id="inputZip5" placeholder={98232} />
                </div> */}
              </div>
              <hr className="my-4" />
              {/* <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="inputPassword4">Old Password</label>
                    <input type="password" className="form-control" id="inputPassword5" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword5">New Password</label>
                    <input type="password" className="form-control" id="inputPassword5" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword6">Confirm Password</label>
                    <input type="password" className="form-control" id="inputPassword6" />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">Password requirements</p>
                  <p className="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                  <ul className="small text-muted pl-4 mb-0">
                    <li>Minimum 8 character</li>
                    <li>At least one special character</li>
                    <li>At least one number</li>
                    <li>Can’t be the same as a previous password</li>
                  </ul>
                </div>
              </div> */}
              <button type="submit" className="btn btn-success">Save Change</button>
            </form>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              limit={1}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default AccountSettings
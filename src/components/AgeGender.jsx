import React, { useEffect, useState } from "react";
import "boxicons";
import { useDispatch } from "react-redux";
import { setAgeInStore, setGenderInStore } from "../redux/reducers/userDetailsSlice";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const AgeGender = () => {
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [disableSubmit,setDisableSubmit]=useState(true);
  useEffect(()=>{
    if(age && gender.length>0){
        setDisableSubmit(false);
    }
    else{
        setDisableSubmit(true);
    }
  },[age,gender])
  const navigate=useNavigate();
//   // console.log(gender);
//   // console.log(age);
  const dispatch=useDispatch();
  const handleSubmit=()=>{
    // // console.log(gender+age);
    if(!age){
        toast.error("Age cannot be empty");
        return;
    }
    if(gender.length==0){
        toast.error("Please choose your gender");
        return;
    }
    dispatch(setAgeInStore(age));
    dispatch(setGenderInStore(gender));
    navigate("/bodyLocation")
  }
  return (
    <div className="min-h-80">
      <div className="headings m-2 space-y-3">
        <h1 className="text-5xl font-bold text-center">Symptom Checker</h1>
        <h2 className="text-center text-xl">
          Identify possible conditions and treatment related to your symptoms.
        </h2>
      </div>

      <form className="">
        <div className="inputs-container flex justify-center space-x-80 my-8">
          <div className="age-container">
            <label
              for="number-input"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              type="number"
              id="number-input"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder=""
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="gender">
            <h1 className="text-xl font-medium">Gender</h1>
            <div className="choice-container flex space-x-3 my-2">
              <div
                className={`px-3 py-2 rounded-md hover:bg-blue-300 cursor-pointer ${
                  gender == "male" ? "bg-blue-400" : "bg-blue-200"
                }`}
                onClick={() => setGender("male")}
              >
                Male
              </div>
              <div
                className={`px-3 py-2 rounded-md hover:bg-blue-300 cursor-pointer ${
                  gender == "female" ? "bg-blue-400" : "bg-blue-200"
                }`}
                onClick={() => setGender("female")}
              >
                Female
              </div>
            </div>
          </div>
        </div>
        <div className="submit-container flex justify-center">
          <button className="bg-blue-200 w-36 px-3 py-3 rounded-md hover:bg-blue-300 cursor-pointer disabled:bg-gray-200 disabled:cursor-default" onClick={handleSubmit} disabled={disableSubmit}>
            <div className="flex justify-center items-center">
            <span className="">Continue</span>
            <box-icon
              name="chevron-right"
              type="solid"
              flip="vertical"
              className="inline-block align-middle"
            ></box-icon>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgeGender;

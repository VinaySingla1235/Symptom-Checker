import MaleFront from "./HumanBody/MaleFront";
import "boxicons";
import arrowCircle from "../assets/arrow-circle.png";
import MaleBack from "./HumanBody/MaleBack";
import FemaleFront from "./HumanBody/FemaleFront";
import FemaleBack from "./HumanBody/FemaleBack";
import { bodyParts } from "../DataFiles/BodyLocations";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBodyPart, setSymptomInStore } from "../redux/reducers/userDetailsSlice";
import { baseUrl, token } from "../DataFiles/Urls";
import toast from "react-hot-toast";
const BodyLocation = () => {
  const navigate = useNavigate();
  const symptom=useSelector((state)=>state.userDetails.symptoms);
  const [rotateBody, setRotateBody] = useState(false);
  const gender = useSelector((state) => state.userDetails.gender);
  const age = useSelector((state) => state.userDetails.age);
  useEffect(() => {
    if (!age || !gender) {
      navigate("/");
    }
  }, [age, gender]);
  const selectedBodyPart = useSelector(
    (state) => state.userDetails.selectedBodyPart
  );
  const [symptoms, setSymptoms] = useState([]);
  console.log(selectedBodyPart);
  const dispatch = useDispatch();
  //   const [selectedBodyPart,setSelectedBodyPart]=useState(null);
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        toast.loading("fetching symptoms", { id: "fetchSymptoms" });
        const response = await fetch(
          `${baseUrl}symptoms/${selectedBodyPart}/0?${token}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();

        // Handle the data
        // console.log(data);
        setSymptoms(data);
        toast.success("Symptoms fetched", { id: "fetchSymptoms" });
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch symptoms", { id: "fetchSymptoms" });
      }
    };
    dispatch(setSymptomInStore(null));
    if (selectedBodyPart && selectedBodyPart.length !== 0) {
      fetchSymptoms();
    }
  }, [selectedBodyPart]);
  return (
    <>
      <div className="">
        <h1 className="text-center text-3xl font-bold my-5">
          Select body part and symptom related to it
        </h1>
      </div>
      <div className="container flex h-96">
        <div className="left w-[40%] px-10 space-y-3">
          <div className="body-location-container">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose body part
            </label>
            <select
              id="selectBodyPart"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedBodyPart}
              onChange={(e) => dispatch(setSelectedBodyPart(e.target.value))}
            >
              <option selected value="">
                Choose body part
              </option>
              {bodyParts.map((part, index) => (
                <option key={index} value={part.ID}>
                  {part.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="symptoms-container">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select your symptom
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={
                selectedBodyPart === null || selectedBodyPart.length === 0
              }
              value={symptom}
              onChange={(e)=>dispatch(setSymptomInStore(e.target.value))}
            >
              <option selected value="">
                Choose a symptom
              </option>
              {symptoms.map((symptom, index) => (
                <option key={index} value={symptom.ID}>
                  {symptom.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="right w-[50%]">
          <div className="body-container w-full flex">
            <div className="w-[55%]">
              {gender === "male" && !rotateBody ? (
                <MaleFront />
              ) : gender === "female" && !rotateBody ? (
                <FemaleFront />
              ) : null}
              {gender === "male" && rotateBody ? (
                <MaleBack />
              ) : gender === "female" && rotateBody ? (
                <FemaleBack />
              ) : null}
            </div>
            <div className="buttons-container space-y-2">
              <div
                className="px-2 py-1 border-2 rounded-md hover:bg-slate-200 cursor-pointer"
                onClick={() => setRotateBody(!rotateBody)}
              >
                <img src={arrowCircle} className="h-5" />
              </div>
              <div
                className="px-2 py-1 border-2 rounded-md hover:bg-slate-200 cursor-pointer"
                onClick={() => dispatch(setSelectedBodyPart(17))}
              >
                Skin
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 h-20 px-3">
        <button className="bg-blue-200 w-36 px-3 py-3 rounded-md hover:bg-blue-300 cursor-pointer disabled:bg-gray-200 disabled:cursor-default" onClick={()=>navigate("/")}>
          <div className="flex justify-center items-center">
            <box-icon type="solid" name="chevron-left"></box-icon>
            <span className="font-bold">Prev</span>
          </div>
        </button>
        <button className="bg-blue-200 w-36 px-3 py-3 rounded-md hover:bg-blue-300 cursor-pointer disabled:bg-gray-200 disabled:cursor-default" 
        disabled={!symptom || symptom.length==0 || selectedBodyPart === null || selectedBodyPart.length === 0}
        onClick={()=>navigate("/issues")}>
          <div className="flex justify-center items-center">
            <span className="font-bold">Next</span>
            <box-icon
              name="chevron-right"
              type="solid"
              flip="vertical"
            ></box-icon>
          </div>
        </button>
      </div>
    </>
  );
};

export default BodyLocation;

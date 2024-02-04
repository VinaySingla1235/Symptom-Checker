import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { issueArr } from "../DataFiles/IssueArr";
import { baseUrl, token } from "../DataFiles/Urls";
import toast from "react-hot-toast";
import { setIssueInStore } from "../redux/reducers/userDetailsSlice";
const Issues = () => {
  // console.log(issueArr);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const navigate = useNavigate();
  const selectedIssue = userDetails.issues;
  const [issueList, setIssueList] = useState([]);
  useEffect(() => {
    if (!userDetails.symptoms || userDetails.symptoms.length == 0) {
      navigate("/");
    }
  }, [userDetails]);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        toast.loading("fetching Issues", { id: "fetchIssues" });
        const response = await fetch(
          `${baseUrl}diagnosis?symptoms=[${userDetails.symptoms}]&gender=${userDetails.gender}&year_of_birth=${userDetails.age}&${token}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        console.log(data);
        // Handle the data
        // console.log(data);
        setIssueList(data);
        toast.success("Issues fetched", { id: "fetchIssues" });
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch Issues", { id: "fetchIssues" });
      }
    };
    if (userDetails.symptoms && userDetails.symptoms.length != 0) {
      fetchIssues();
    }
  }, [userDetails.symptoms]);
  return (
    <>
      <h1 className="text-center text-3xl font-bold my-5">
        Here are the issues according to your symptom
      </h1>
      <h2 className="text-center text-2xl font-bold my-5">
        Click on your issue and move next to see details
      </h2>
      <div className="issue-container grid grid-cols-4 gap-5 mx-5">
        {issueList.map((issueObj) => (
          <div
            key={issueObj.Issue.ID}
            className={`py-2 px-3 hover:bg-pink-400 cursor-pointer rounded-md flex justify-center items-center font-bold ${
              selectedIssue === issueObj.Issue.ID
                ? "bg-pink-500"
                : "bg-pink-300"
            }`}
            onClick={() => dispatch(setIssueInStore(issueObj.Issue.ID))}
          >
            <span className="block">{issueObj.Issue.Name}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 h-20 px-3">
        <button
          className="bg-blue-200 w-36 px-3 py-3 rounded-md hover:bg-blue-300 cursor-pointer disabled:bg-gray-200 disabled:cursor-default"
          onClick={() => navigate("/bodyLocation")}
        >
          <div className="flex justify-center items-center">
            <box-icon type="solid" name="chevron-left"></box-icon>
            <span className="font-bold">Prev</span>
          </div>
        </button>
        <button
          className="bg-blue-200 w-36 px-3 py-3 rounded-md hover:bg-blue-300 cursor-pointer disabled:bg-gray-200 disabled:cursor-default"
          disabled={!selectedIssue}
          onClick={() => navigate("/treatement")}
        >
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

export default Issues;

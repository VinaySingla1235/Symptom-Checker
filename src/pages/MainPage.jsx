import React from "react";
import HierarchyNavigation from "../components/HierarchyNavigation";
import AgeGender from "../components/AgeGender";
import { Route, Routes } from "react-router-dom"
import BodyLocation from "../components/BodyLocation";
import Issues from "../components/Issues";
import Treatement from "../components/Treatement";

const MainPage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] bg-slate-300">
      <div className="w-full lg:w-[70%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-slate-50">
        <HierarchyNavigation />
        <Routes>
            <Route path="/" element={<AgeGender/>}></Route>
            <Route path="bodyLocation" element={<BodyLocation/>}></Route>
            <Route path="issues" element={<Issues/>}></Route>
            <Route path="treatement" element={<Treatement/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;

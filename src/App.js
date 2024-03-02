import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./pages";
import { auth, db } from "./config/firebase.config";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Triangle } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import {SET_USER} from "./context/actions/userActions"

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
            navigate("/home/projects", {replace: true})
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(()=>{
        setIsLoading(false);
      }, 2000)
    });
    //cleanup the listner event
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Triangle
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />

            {/* if route is not matching*/}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
};


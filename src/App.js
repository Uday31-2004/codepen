import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home, NewProject } from "./pages";
import { auth, db } from "./config/firebase.config";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {Spinner} from './components/index'
import { setUser } from "./context/slice/userSlice";
export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(setUser(userCred?.providerData[0]));
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
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/newProject" element={<NewProject />} />

            {/* if route is not matching*/}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
};


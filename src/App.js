import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home, NewProject } from "./pages";
import { auth, db } from "./config/firebase.config";
import { useEffect } from "react";
import {
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./components/index";
import { setUser } from "./context/slice/userSlice";
import { setProjects } from "./context/slice/projectSlice";
import ExistingProject from "./pages/ExistingProject";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state?.project?.projects);
  console.log(projects.id)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(setUser(userCred?.providerData[0]));
            navigate("/home/projects", { replace: true });
          }
        );
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
    //cleanup the listner event
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );

    const unsubscribe = onSnapshot(projectQuery, (querySnaps => {
      const projectsList = querySnaps.docs.map(doc => doc.data())
      dispatch(setProjects(projectsList));
    }));
    return unsubscribe;
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
            <Route path={`/home/projects/:project`}  element={<ExistingProject />} />

            {/* if route is not matching*/}
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

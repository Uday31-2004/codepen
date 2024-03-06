import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import {motion} from "framer-motion"
import { Link, Route, Routes } from "react-router-dom";
import { Projects, SignUp} from "./index"
import { useSelector } from "react-redux";
import UserProfileDetail from "../components/UserProfileDetail";
const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const user = useSelector(state => state?.user?.value)

  
  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex-[.2] xl:flex[0.2]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        {/*Anchor  */}
        <motion.div
          whileTap={{scale:.9}}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg absolute -right-6 flex items-center justify-center cursor-pointer "
        >
          <HiChevronDoubleLeft className=" text-white text-xl" />
        </motion.div>
        <div className="overflow-hidden w-full flex flex-col gap-4">
        {/* logo */}
          <Link to={"/home"}>
            <img src={"https://blog.codepen.io/wp-content/uploads/2022/01/codepen-wordmark-display-inside-white@10x.png"} alt="Logo" className="object-contain w-72 h-auto" />
          </Link>
        {/* start coading */}
          <Link to={"/newProject"}>
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
              <p className="text-gray-400 group-hover:text-gray-200 capitalize">Start Coding</p>
            </div>
          </Link>
        {/*home nav */}
          {user &&(
            <Link className="flex items-center justify-center gap-2" to={"home/projects"}>
              <MdHome className="text-primaryText text-xl "/>
              <p className="text-lg text-primaryText">Home</p>
            </Link>
          )
          }
        </div>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
      {/*top section */}
          <div className="w-full items-center flex justify-between gap-3 ">
          {/*search Section */}
            <div className="flex bg-secondary w-full px-4 py-3 rounded-md items-center justify-center gap-3">
              <FaSearch className="text-2xl text-primaryText"/>
              <input type="text" className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600" placeholder="Search here..."/>
            </div>
          {/*profile section */}
            {!user &&(
              <motion.div whileTap={{scale:0.9}} className="flex items-center justify-center gap-3">
                <Link to={"/home/auth"} className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700">
                  Signup
                </Link>
              </motion.div>
            )}
            {user && 
                <UserProfileDetail />
            }
          </div>
          {/* bottom section */}
          <div className="w-full">
            <Routes>
              <Route path="/*" element={<Projects/>} />
              <Route path="/auth" element={<SignUp/>}/>
            </Routes>
          </div>
      </div>
    </>
  );
};

export default Home;

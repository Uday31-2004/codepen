import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";
import { signInWithGithub, signInWithGoogle } from "../utils/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
const Signup = () => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, pass)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, pass)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="w-full py-6">
      <img
        src={
          "https://blog.codepen.io/wp-content/uploads/2022/01/codepen-wordmark-display-inside-white@10x.png"
        }
        alt="Logo"
        className="object-contain w-32 h-auto opacity-50"
      />
      <div className="w-full flex flex-col py-6 items-center justify-center">
        <p className="py-12 text-2xl text-primaryText"> Join With Us!</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label="Email"
            placeholder="Email"
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            isPass={false}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          {/* password */}
          <UserAuthInput
            label="Password"
            placeholder="Password"
            key="Password"
            setStateFunction={setPass}
            Icon={MdPassword}
            isPass={true}
          />
          {/* alert section */}
            <motion.p className="text-red-500">
              some alert
            </motion.p>
          {/* login section */}
          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emrald-400 cursor-pointer bg-emrald-500"
            >
              <p className="text-xl text-white flex items-center justify-center rounded-xl bg-emerald-500 w-full py-3 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700">
                Sign Up
              </p>
            </motion.div>
          ) : (
            <motion.div
            onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emrald-400 cursor-pointer bg-emrald-500"
            >
              <p className="text-xl text-white flex items-center justify-center rounded-xl bg-emerald-500 w-full py-3 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700">
                Login
              </p>
            </motion.div>
          )}

          {/* account text section */}
          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already have an account !{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-emerald-500 cursor-pointer"
              >
                {" "}
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Don't have an account !{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-emerald-500 cursor-pointer"
              >
                {" "}
                Create Account
              </span>
            </p>
          )}
          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* Sign in with google */}
          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center cursor-pointer gap-3 backdrop-blur-md w-full py-3 rounded-xl bg-[rgba(256,256,256,0.2)] hover:bg-[rgba(256,256,256,0.4)]"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign In with Google</p>
          </motion.div>
          {/* or section*/}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* Sign in with github */}
          <motion.div
            onClick={signInWithGithub}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center cursor-pointer gap-3 backdrop-blur-md w-full py-3 rounded-xl bg-[rgba(256,256,256,0.2)] hover:bg-[rgba(256,256,256,0.4)]"
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign In with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

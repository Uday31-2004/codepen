import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
const UserAuthInput = ({
  label,
  placeholder,
  isPass,
  Icon,
  setStateFunction,
  setGetEmailValidationStatus
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false)
  const handleTextChange =(e)=>{
    setValue(e.target.value)
    setStateFunction(e.target.value)

    if(placeholder === "Email"){
      const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailValidator.test(value)
      setIsEmailValid(status)
      setGetEmailValidationStatus(status)
    }
  }

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center w-full gap-3 md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
          !isEmailValid && placeholder === "Email"  && value.length > 0 && "border-red-500 border-4 border-solid"
        }`}
      >
        <Icon className="text-text555 text-lg" />
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeholder}
          className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
          value={value}
          onChange={handleTextChange}
        />
        {isPass && (
          <motion.div onClick={() => setShowPass(!showPass)} whileTap={{ scale: 0.9 }} className="cursor-pointer">
            {showPass ? (
              <FaEye className="text-text555 text-2xl" />
            ) : (
              <FaEyeSlash className="text-text555 text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;

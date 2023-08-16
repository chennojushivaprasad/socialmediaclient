import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../../Context";
import Cookies from "js-cookie";
import { MdOutlineLogout } from "react-icons/md";

const SignOut = () => {
  const { setIsValidUser } = useContext(AppContext);
  const signOut = () => {
    try {
      Cookies.remove("userId");
      Cookies.remove("accessToken");
      setIsValidUser(false);
    } catch (error) {
      console.log("sign out", error);
    }
  };
  return (
    <button type="button" className="signout-button" onClick={signOut}>
      <MdOutlineLogout className="signout-icon" />
      {/* <p className="signout">Logout</p> */}
    </button>
  );
};

export default SignOut;

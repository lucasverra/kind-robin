import React from 'react';
import Loader from "react-loader-spinner";
import { FaCheck, FaTimes } from "react-icons/fa";

export const ButtonSubmit = ({buttonState, text}) => {
    if (buttonState === "loading") {
      return <Loader type="Oval" color="#fff" />;
    }
    if (buttonState === "success") {
      return <FaCheck />;
    }
    if (buttonState === "error") {
      return <FaTimes />;
    } else {
      return text;
    }
  };
import React from "react";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <section className="custom-container">
      <div className="custom-container__left">
        <div className="content">
          <h2>Hello</h2>
          <p>Create a new account to continue</p>
        </div>
      </div>
      <div className="custom-container__right">
        <div className="content">
          <h3 className="title">Sign up</h3>
          <SignupForm />
        </div>
      </div>
    </section>
  );
};

export default Signup;

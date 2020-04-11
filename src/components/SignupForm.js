import React, { Component } from "react";
import { FaEnvelope, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "gatsby";
import { signUp } from "../services/auth";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FaCheck, FaTimes } from "react-icons/fa";

import "../sass/custom.scss";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      buttonState: "",
    };
    this.handleToggler = this.handleToggler.bind(this);
  }

  handleToggler() {
    this.setState({
      hide: !this.state.hide,
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      buttonState: "loading",
    });
    signUp(this.state.email, this.state.password)
      .then(() => {
        this.setState({
          buttonState: "success",
        });
        setTimeout(() => {
          if (typeof window !== `undefined`)
            window.location.replace(`/profile`);
        }, 1500);
      })
      .catch((e) => {
        this.setState({
          buttonState: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({
            buttonState: "",
          });
        }, 3000);
      });
  };

  conditionalButton = () => {
    let { buttonState } = this.state;
    if (buttonState === "loading") {
      return <Loader type="Oval" color="#fff" />;
    }
    if (buttonState === "success") {
      return <FaCheck />;
    }
    if (buttonState === "error") {
      return <FaTimes />;
    } else {
      return "Sign Up";
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { hide, buttonState } = this.state;
    return (
      <form
        name="signupForm"
        method="POST"
        className="signup-form"
        onSubmit={this.handleSubmit}
      >
        <div className="form-row">
          <label>
            <span className="screen-reader-text">Email</span>
          </label>
          <div className="input_container">
            <FaEnvelope />
            <input
              className="email"
              type="email"
              name="email"
              required
              onChange={this.handleChange}
              autoFocus
            />
          </div>
        </div>
        <div className="form-row">
          <label>
            <span className="screen-reader-text">Password</span>
          </label>
          <div className="input_container">
            <FaLock />
            <input
              className="password"
              type={hide ? "password" : "text"}
              name="password"
              required
              onChange={this.handleChange}
            />
            <div onClick={this.handleToggler} className="hider">
              {hide ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="addition_text">
            Have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>

        <button
          className={`${
            buttonState && `btn-${buttonState}`
          } button secondary btn-submit submit-btn`}
          type="submit"
        >
          {this.conditionalButton()}
        </button>
      </form>
    );
  }
}

export default SignupForm;

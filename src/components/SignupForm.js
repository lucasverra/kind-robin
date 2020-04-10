import React, { Component } from "react";
import { FaEnvelope, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "gatsby";
import { signUp } from "../services/auth";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      loading: false
    };
    this.handleToggler = this.handleToggler.bind(this);
  }

  handleToggler() {
    this.setState({
      hide: !this.state.hide
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    signUp(this.state.email, this.state.password).then(
      () => {
        this.setState({
          loading: false,
        });
        if (typeof window !== `undefined`) window.location.replace(`/profile`)
      }
    )
    this.setState({
      loading: true,
    });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    const { hide, loading } = this.state;
    return (
      <form name="signupForm" method="POST" className="signup-form"  onSubmit={this.handleSubmit}>
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

        <button className="submit-btn" type="submit">
        {loading ? <Loader type="Oval" color="#fff" /> : "Create An Account"}
        </button>
      </form>
    );
  }
}

export default SignupForm;

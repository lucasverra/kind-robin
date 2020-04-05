import React, { Component } from "react";
import { FaEnvelope, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "gatsby";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true
    };
    this.handleToggler = this.handleToggler.bind(this);
  }

  handleToggler() {
    this.setState({
      hide: !this.state.hide
    });
  }
  render() {
    const { hide } = this.state;
    return (
      <form name="signupForm" method="POST" className="signup-form">
        <div className="form-row">
          <label>
            <span className="screen-reader-text">Email</span>
          </label>
          <div className="input_container">
            <FaEnvelope />
            <input
              className="email"
              type="email"
              name="username"
              required
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
          Create An Account
        </button>
      </form>
    );
  }
}

export default SignupForm;

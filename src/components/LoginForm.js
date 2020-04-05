import React, { Component } from "react";
import { FaEnvelope, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, navigate } from "gatsby";
import { handleLogin, isLoggedIn } from "../services/auth";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      email: ``,
      password: ``
    };
    this.handleToggler = this.handleToggler.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleToggler() {
    this.setState({
      hide: !this.state.hide
    });
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    navigate("/profile");
  };

  render() {
    const { hide, email, password } = this.state;
    return (
      <form
        onSubmit={event => {
          this.handleSubmit(event);
          navigate(`/app/profile`);
        }}
        name="loginForm"
        method="POST"
        className="login-form"
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
              value={email}
              onChange={this.handleUpdate}
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
              value={password}
              onChange={this.handleUpdate}
              required
            />
            <div onClick={this.handleToggler} className="hider">
              {hide ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="addition_text">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </div>
          <div className="addition_text">
            Forget password? <Link to="/forgetpassword">Reset</Link>
          </div>
        </div>

        <button className="submit-btn" type="submit">
          Sing In
        </button>
      </form>
    );
  }
}

export default LoginForm;

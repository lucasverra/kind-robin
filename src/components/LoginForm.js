import React, { Component } from "react";
import { FaEnvelope, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, navigate } from "gatsby";
import { logIn, isLoggedIn } from "../services/auth";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FaCheck, FaTimes } from "react-icons/fa";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      email: ``,
      password: ``,
      buttonState: "",
    };
    this.handleToggler = this.handleToggler.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    if (isLoggedIn()) {
      navigate("/profile");
    }
  }

  handleToggler() {
    this.setState({
      hide: !this.state.hide,
    });
  }
  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      buttonState: "loading",
    });
    logIn(this.state.email, this.state.password)
      .then(() => {
        this.setState({ buttonState: "success" });
        setTimeout(() => {
          if (typeof window !== `undefined`)
            window.location.replace(`/profile`);
        }, 1500);
      })
      .catch((e) => {
        this.setState({
          buttonState: "error",
        });
        console.log(e);
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
      return "Se connecter";
    }
  };

  render() {
    const { hide, email, password, buttonState } = this.state;
    return (
      <form
        onSubmit={(event) => {
          this.handleSubmit(event);
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
            Vous n'avez pas de compte ?{" "}
            <Link to="/signup">Enregistrez-vous</Link>
          </div>
          <div className="addition_text">
            Forget password? <Link to="/forgetpassword">Reset</Link>
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

export default LoginForm;

import React, { Component } from "react";
import { FaEnvelope, FaLock, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "gatsby";
import { signUp } from "../services/auth";
import { ButtonSubmit } from "../utils/ButtonSubmit"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import "../sass/custom.scss";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      buttonState: "",
      gdpr: false,
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

  handleGdpr = (e) => {
    this.setState({
      gdpr: e.target.checked,
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { hide, buttonState, gdpr } = this.state;
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
          <div className="gdpr_checkbox">
            <input
              name="gdpr"
              id="gdpr"
              type="checkbox"
              onChange={this.handleGdpr}
              checked={gdpr}
            />
            <label htmlFor="gdpr">
            En cochant cette case, je reconnais avoir pris connaissance des <Link to="/conditions">Conditions Générales d'Utilisation.</Link>
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="addition_text">
          Déjà inscrit.e ? <Link to="/login">Connectez-vous ici</Link>
          </div>
        </div>

        <button
          className={`${
            buttonState && `btn-${buttonState}`
          } button secondary btn-submit submit-btn`}
          type="submit"
          disabled={!gdpr}
        >
        <ButtonSubmit text={"S'inscrire"} buttonState={this.state.buttonState}></ButtonSubmit>
        </button>
      </form>
    );
  }
}

export default SignupForm;

import React from "react";
import { Layout } from "../components/index";
import { ResetPaswword } from "../services/auth"
import { FaEnvelope } from "react-icons/fa";
import { ButtonSubmit } from '../utils/ButtonSubmit'

import "../sass/custom.scss";

export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: "",
      email:""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      buttonState: "loading",
    });

    debugger
    ResetPaswword(this.state.email)
      .then((r) =>   this.setState({ buttonState: "success" }))
      .catch(e => this.setState({ buttonState: "error" })

    )
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  } 

  render() {
    const { buttonState } = this.state;
    return (
      <Layout {...this.props}>
        <section className="custom-container">
          <div className="custom-container__left">
            <div className="content">
              <h2>Bonjour</h2>
              <p>Entrez votre adresse électronique pour recevoir le lien de réinitialisation.</p>
            </div>
          </div>
          <div className="custom-container__right">
            <div className="content">
              <h3 className="title"> Mot de passe oublié ?</h3>
              <form
                name="forgetPasswordForm"
                method="POST"
                className="forget-password-form"
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
                      onChange={this.handleChange}
                      value={this.state.email}
                      required
                    />
                  </div>
                </div>

                <button
                  className={`${
                    buttonState && `btn-${buttonState}`
                  } button secondary btn-submit submit-btn`}
                  type="submit"
                >
                  <ButtonSubmit text={"générer un lien"} buttonState={this.state.buttonState}></ButtonSubmit>
                </button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

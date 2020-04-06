import React from "react";
import { Layout } from "../components/index";

import { FaEnvelope } from "react-icons/fa";

import "../sass/custom.scss";

export default class ForgetPassword extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <section className="custom-container">
          <div className="custom-container__left">
            <div className="content">
              <h2>Hello</h2>
              <p>Enter your email to receive reset link.</p>
            </div>
          </div>
          <div className="custom-container__right">
            <div className="content">
              <h3 className="title">Forget Password?</h3>
              <form
                name="forgetPasswordForm"
                method="POST"
                className="forget-password-form"
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
                    />
                  </div>
                </div>

                <button className="submit-btn" type="submit">
                  generate link
                </button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

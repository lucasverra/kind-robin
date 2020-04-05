import React from "react";
import { Layout } from "../components/index";
import LoginForm from "../components/LoginForm";
import "../sass/custom.scss";

export default class Login extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <section className="custom-container">
          <div className="custom-container__left">
            <div className="content">
              <h2>Hello</h2>
              <p>Sign in to your account to continue</p>
            </div>
          </div>
          <div className="custom-container__right">
            <div className="content">
              <h3 className="title">Sign in</h3>
              <LoginForm />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

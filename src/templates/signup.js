import React from "react";

import { Layout } from "../components/index";
// import { logIn } from "../services/auth";
import SignupForm from "../components/SignupForm";

import "../sass/custom.scss";

export default class Signup extends React.Component {
  componentDidMount() {}

  //   handleLogin = () => {
  //     logIn("t@t.com", "123");
  //   };

  render() {
    return (
      <Layout {...this.props}>
        {/* <button onClick={this.handleLogin}>signup</button> */}
        <section className="custom-container">
          <div className="custom-container__left">
            <div className="content">
              <h2>Bonjour</h2>
              <p>Créer un profil pour continuer</p>
            </div>
          </div>
          <div className="custom-container__right">
            <div className="content">
              <h3 className="title">S'inscrire</h3>
              <SignupForm />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

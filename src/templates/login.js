import React from "react";
import LoginForm from "../components/LoginForm";
import {Layout} from '../components/index';

import "../sass/custom.scss";

const Login = (props) => {
  return (
    <Layout {...props}>
    <section className="custom-container">
      <div className="custom-container__left">
        <div className="content">
          <h2>Bonjour</h2>
          <p>Connectez-vous à votre compte pour continuer</p>
        </div>
      </div>
      <div className="custom-container__right">
        <div className="content">
          <h3 className="title">Se connecter</h3>
          <LoginForm />
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default Login;

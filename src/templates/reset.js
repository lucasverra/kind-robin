import React from "react";
import { Layout } from "../components/index";

import "../sass/custom.scss";

export default class Reset extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <section className="custom-container">
          <div className="custom-container__left">
            <div className="content">
              <h2>Bonjour</h2>
              <p>Réinitialisez votre mot de passe ici</p>
            </div>
          </div>
          <div className="custom-container__right">
            <div className="content">
              <h3 className="title">Réinitialisation du mot de passe</h3>
              <form name="resetForm" method="POST" className="reset-form">
                <div className="form-row">
                  <label>
                    <span className="screen-reader-text">Mot de passe</span>
                  </label>
                  <div className="input_container">
                    <input
                      className="password"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <label>
                    <span className="screen-reader-text">Confirmer le mot de passe</span>
                  </label>
                  <div className="input_container">
                    <input
                      className="password"
                      type="password"
                      name="confirm-password"
                      required
                    />
                  </div>
                </div>

                <button className="submit-btn" type="submit">
                Réinitialisation
                </button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}


import React from "react";
import { Layout } from "../components/index";
import ToggleButton from "react-toggle-button";
import { isLoggedIn } from "../services/auth";

import "../sass/custom.scss";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: false,
      content: false,
      emails: false,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
  };
  componentDidMount() {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "2267b1d7-ec2c-4e4e-8ded-ade2a7ff194d",
      });
      OneSignal.setDefaultNotificationUrl(
        "https://kind-robin-60456.netlify.com/profile"
      );
      //OneSignal.setEmail("a@b.com");
      //OneSignal.sendTag("toto", "titi");
    });
  }
  render() {
    const options = [
      "6h",
      "7h",
      "8h",
      "9h",
      "10h",
      "11h",
      "12h",
      "13h",
      "14h",
      "15h",
      "16h",
      "17h",
      "18h",
      "19h",
      "20h",
      "21h",
      "22h",
    ];
    if (!isLoggedIn()) {
      if (typeof window !== `undefined`) window.location.replace(`/Login`);
    } else {
      return (
        <Layout {...this.props}>
          <section className="custom-container-2">
            <form
              name="myprefrences"
              method="POST"
              className="fmyprefrences-form"
              onSubmit={(event) => {
                this.handleSubmit(event);
              }}
            >
              <div className="form-row">
                <label>
                  Nom
                  <span className="screen-reader-text">Nom</span>
                </label>
                <div className="input_container">
                  <input
                    className="name"
                    type="text"
                    name="name"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="form-row">
                <label>
                  A quelle heure souhaiteriez-vous faire de l'exercice chaque
                  jour?
                  <span className="screen-reader-text">
                    A quelle heure souhaiteriez-vous faire de l'exercice chaque
                    jour?
                  </span>
                </label>
                <div className="input_container">
                  <select id="time" name="time" className="time">
                    <option></option>
                    {options.map((value, index) => {
                      return (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <label>
                  Quel est votre objectif d’activité physique?
                  <span className="screen-reader-text">
                    Quel est votre objectif d’activité physique?
                  </span>
                </label>
                <div className="input_container">
                  <select id="goals" name="goals" className="goals">
                    <option></option>
                    <option value="Se musler">Se musler</option>
                    <option value="Se détendre">Se détendre</option>
                    <option value="Se défouler">Se défouler</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <label>
                  Souhaitez vous recevoir des notification push?
                  <span className="screen-reader-text">
                    Souhaitez vous recevoir des notification push?
                  </span>
                </label>
                <div className="input_container">
                  <ToggleButton
                    inactiveLabel="no"
                    activeLabel="yes"
                    value={this.state.notifications || false}
                    onToggle={(value) => {
                      this.setState({
                        notifications: !this.state.notifications,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <label>
                  Souhaitez vous recevoir des contenus adaptés aux enfants?
                  <span className="screen-reader-text">
                    Souhaitez vous recevoir des contenus adaptés aux enfants?
                  </span>
                </label>
                <div className="input_container">
                  <ToggleButton
                    inactiveLabel="no"
                    activeLabel="yes"
                    value={this.state.content || false}
                    onToggle={(value) => {
                      this.setState({
                        content: !this.state.content,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <label>
                  Souhaitez vous recevoir des notification email?
                  <span className="screen-reader-text">
                    Souhaitez vous recevoir des notification email?
                  </span>
                </label>
                <div className="input_container">
                  <ToggleButton
                    inactiveLabel="no"
                    activeLabel="yes"
                    value={this.state.emails || false}
                    onToggle={(value) => {
                      this.setState({
                        emails: !this.state.emails,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="btn-container">
                <button className="cancel-btn" type="submit">
                  annuler
                </button>
                <button className="submit-btn" type="submit">
                  sauvegarder
                </button>
              </div>
            </form>
          </section>
        </Layout>
      );
    }
  }
}

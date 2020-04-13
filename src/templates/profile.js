import React from "react";
import { Layout } from "../components/index";
import ToggleButton from "react-toggle-button";
import { isLoggedIn, logOut } from "../services/auth";
import { setPrefrence, getCurrentUser } from "../services/auth";
import {ButtonSubmit} from "../utils/ButtonSubmit"

import "../sass/custom.scss";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      exerciceHour: "",
      physicalActivityGoal: "",
      timeExerciseEachDay: "",
      hasNotificationsPush: false,
      hasNotificationsEmail: false,
      hasChildFriendlyContent: false,
      buttonState: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      buttonState: "loading",
    });

    setTimeout(() => {
      setPrefrence(this.state);
      this.setState({
        buttonState: "success",
      });
    }, 1500);
    setTimeout(() => {
      this.setState({
        buttonState: "",
      });
    }, 3000);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOptionsChange = (e) => {
    // debugger;
    this.setState({
      [e.target.name]: { key: e.target.key, value: e.target.value },
    });
  };

  handleLogOut = () => {
    logOut();
    if (typeof window !== `undefined`) window.location.replace(`/`);
  };

  componentDidMount() {
    if (getCurrentUser) {
      getCurrentUser()
        .fetch()
        .then((user) => {
          if (user.get("userPreference")) {
            this.setState({ ...user.get("userPreference") });
          }
          this.setState({
            buttonState: "",
          });
        });
    }
  }
  render() {
    const { buttonState } = this.state;
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
      return null;
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
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    value={this.state.name}
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
                  <select
                    value={this.state.timeExerciseEachDay}
                    id="time"
                    name="timeExerciseEachDay"
                    className="time"
                    onChange={this.handleChange}
                  >
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
                  <select
                    value={this.state.physicalActivityGoal.value}
                    onChange={this.handleOptionsChange}
                    id="goals"
                    name="physicalActivityGoal"
                    className="goals"
                  >
                    <option></option>
                    <option key={"buildMuscle"} value="Se muscler">
                      Se muscler
                    </option>
                    <option key={"relax"} value="Se détendre">
                      Se détendre
                    </option>
                    <option key={"letOffSteam"} value="Se défouler">
                      Se défouler
                    </option>
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
                    value={this.state.hasNotificationsPush}
                    onToggle={(value) => {
                      var OneSignal = window.OneSignal || [];
                      OneSignal.push(function () {
                        OneSignal.init({
                          appId: "6936bf61-536c-401e-b409-0f609f670749",
                          allowLocalhostAsSecureOrigin: true,
                        });
                        OneSignal.setDefaultNotificationUrl(
                          "https://bougezchezvous-sprint-client.netlify.com/profile"
                        );
                        //OneSignal.setEmail("a@b.com");
                        //OneSignal.sendTag("toto", "titi");
                      });
                      this.setState({
                        hasNotificationsPush: !this.state.hasNotificationsPush,
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
                    value={this.state.hasChildFriendlyContent}
                    onToggle={(value) => {
                      this.setState({
                        hasChildFriendlyContent: !this.state
                          .hasChildFriendlyContent,
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
                    value={this.state.hasNotificationsEmail}
                    onToggle={(value) => {
                      var OneSignal = window.OneSignal || [];
                      console.log(getCurrentUser().get("email"));
                      OneSignal.setEmail(getCurrentUser().get("email"));
                      this.setState({
                        hasNotificationsEmail: !this.state
                          .hasNotificationsEmail,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="btn-container">
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={this.handleLogOut}
                >
                  Déconnexion
                </button>
                <button
                  className={`${
                    buttonState && `btn-${buttonState}`
                  } button secondary btn-submit submit-btn`}
                  type="submit"
                >
                  <ButtonSubmit text={"sauvegarder"} buttonState={this.state.buttonState}></ButtonSubmit>
                </button>
              </div>
            </form>
          </section>
        </Layout>
      );
    }
  }
}

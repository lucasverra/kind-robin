import React from "react";
import { Link } from "gatsby";
import { Layout } from "../components/index";
import ToggleButton from "react-toggle-button";
import { isLoggedIn, logOut } from "../services/auth";
import { setPrefrence, getCurrentUser } from "../services/auth";
import { ButtonSubmit } from "../utils/ButtonSubmit";
import { FaTimes } from "react-icons/fa";

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
      showPopup: false,
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
        showPopup: true,
      });
    }, 500);
    setTimeout(() => {
      this.setState({
        buttonState: "",
      });
    }, 7000);
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

  handleChangeToogleEmail = () => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: `${process.env.GATSBY_ONE_SIGNAL_APP_ID}`,
        allowLocalhostAsSecureOrigin: true,
      });
      console.log(getCurrentUser().get("email"));
      OneSignal.setEmail(getCurrentUser().get("email"));
    });
    this.setState({
      hasNotificationsEmail: !this.state.hasNotificationsEmail,
    });
  };

  handleChangeTooglePush = () => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: `${process.env.GATSBY_ONE_SIGNAL_APP_ID}`,
        allowLocalhostAsSecureOrigin: true,
      });
      OneSignal.setDefaultNotificationUrl(
        `${process.env.GATSBY_ONE_SIGNAL_URL_START}`
      );
      //OneSignal.setEmail("a@b.com");
      //OneSignal.sendTag("toto", "titi");
    });
    this.setState({
      hasNotificationsPush: !this.state.hasNotificationsPush,
    });
  };

  handleChangeToogleChild = () => {
    this.setState({
      hasChildFriendlyContent: !this.state.hasChildFriendlyContent,
    });
  };

  componentDidMount() {
    if (getCurrentUser) {
      getCurrentUser()
        .fetch()
        .then((user) => {
          if (user.get("userPreference")) {
            this.setState({ ...user.get("userPreference") });
          }
          // debugger;
          this.setState({
            buttonState: "",
          });
        });
    }
  }
  render() {
    const { buttonState, showPopup } = this.state;
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
          <div className={`submit_popup ${!showPopup && "hidden"}`}>
            <div className="popup_inner">
              <div className="popup_header">
                <h2>Votre profil</h2>
                <FaTimes onClick={() => this.setState({ showPopup: false })} />
              </div>
              <div className="popup_body">
                your information has been saved ok.
              </div>
              <div className="popup_footer">
                <button
                  onClick={() => this.setState({ showPopup: false })}
                  className="button button_can"
                >
                  Fermer
                </button>
                <Link className="button button_cus" to="/blog">
                  Accéder aux articles
                </Link>
              </div>
            </div>
          </div>
          <section className="custom-container-2">
            <h4>Mon profil</h4>
            <p className="custom-profile-intro">
              Merci de votre inscription ! Veuillez répondre aux questions
              ci-dessous pour nous permettre de vous envoyer des contenus
              personalisés. Vous pourrez mettre ces informations à jour à tout
              moment.
            </p>
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
                  Prénom
                  <span className="screen-reader-text">Prénom</span>
                </label>
                <div className="input_container">
                  <input
                    className="name"
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    value={this.state.name}
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
                    value={this.state.timeExerciseEachDay.value}
                    id="time"
                    name="timeExerciseEachDay"
                    className="time"
                    onChange={this.handleOptionsChange}
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
                  Souhaitez vous recevoir des contenus adaptés aux enfants ?
                  <span className="screen-reader-text">
                    Souhaitez vous recevoir des contenus adaptés aux enfants ?
                  </span>
                </label>
                <div className="input_container">
                  <div className="radio_values">
                    <div className="radio_values-wrapper">
                      <input
                        type="radio"
                        name="hasChildFriendlyContent"
                        checked={this.state.hasChildFriendlyContent === true}
                        value="oui"
                        onChange={this.handleChangeToogleChild}
                      />{" "}
                      oui
                    </div>
                    <div className="radio_values-wrapper">
                      <input
                        type="radio"
                        name="hasChildFriendlyContent"
                        checked={this.state.hasChildFriendlyContent === false}
                        value="non"
                        onChange={this.handleChangeToogleChild}
                      />{" "}
                      non
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <label>
                  Acceptez-vous de recevoir des notifications par email ?
                  <span className="screen-reader-text">
                    Acceptez-vous de recevoir des notifications par email ?
                  </span>
                </label>
                <div className="input_container">
                  <div className="radio_values">
                    <div className="radio_values-wrapper">
                      <input
                        type="radio"
                        name="hasNotificationsEmail"
                        checked={this.state.hasNotificationsEmail === true}
                        value="oui"
                        onChange={this.handleChangeToogleEmail}
                      />{" "}
                      oui
                    </div>
                    <div className="radio_values-wrapper">
                      <input
                        type="radio"
                        name="hasNotificationsEmail"
                        checked={this.state.hasNotificationsEmail === false}
                        onChange={this.handleChangeToogleEmail}
                      />{" "}
                      non
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <label>
                  Acceptez-vous de recevoir des notifications push ?
                  <span className="screen-reader-text">
                    Acceptez-vous de recevoir des notifications push ?
                  </span>
                </label>
                <div className="input_container">
                  <div className="radio_values">
                    <div className="radio_values-wrapper">
                      <input
                        type="radio"
                        name="hasNotificationsPush"
                        checked={this.state.hasNotificationsPush === true}
                        value="oui"
                        onChange={this.handleChangeTooglePush}
                      />{" "}
                      oui
                    </div>
                    <div className="radio_values-wrapper">
                      <input
                        type="radio"
                        name="hasNotificationsPush"
                        checked={this.state.hasNotificationsPush === false}
                        value="non"
                        onChange={this.handleChangeTooglePush}
                      />{" "}
                      non
                    </div>
                  </div>
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
                  <ButtonSubmit
                    text={"sauvegarder"}
                    buttonState={this.state.buttonState}
                  ></ButtonSubmit>
                </button>
              </div>
            </form>
          </section>
        </Layout>
      );
    }
  }
}

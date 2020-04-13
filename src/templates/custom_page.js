import React from "react";
import _ from "lodash";
import {ButtonSubmit} from "../utils/ButtonSubmit"
import { Layout } from "../components/index";
import { safePrefix, htmlToReact } from "../utils";
import Loader from "react-loader-spinner";

import "../sass/custom.scss";
import { FaCheck, FaTimes } from "react-icons/fa";

export default class CustomPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: "",
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      buttonState: "loading",
    });
    setTimeout(() => this.setState({ buttonState: "success" }), 2000);
    setTimeout(() => this.setState({ buttonState: "" }), 4000);
  };
  conditionalButton = () => {
    let { buttonState } = this.state;
    if (buttonState === "loading") {
      return <Loader type="Oval" color="#fff" />;
    }
    if (buttonState === "success") {
      return <FaCheck />;
    }
    if (buttonState === "error") {
      return <FaTimes />;
    } else {
      return "Enregistrer";
    }
  };

  displayOptions = (optionCount, key, startFrom) => {
    let optionComponents = [] 
    for (let index =  startFrom; index < optionCount; index++) {
      optionComponents.push(
        <div key={key+index} className="radio_values-wrapper">
        <input type="radio" name={index} value={key} /> {index}
      </div>
      )
    }
    return optionComponents
  }

  render() {
    const { buttonState } = this.state;
    return (
      <Layout {...this.props}>
        <div className="outer">
          <div className="inner-medium">
            <article className="post post-full">
              <header className="post-header">
                <h1 className="post-title">
                  {_.get(this.props, "pageContext.frontmatter.title")}
                </h1>
              </header>
              {_.get(this.props, "pageContext.frontmatter.img_path") && (
                <div className="post-thumbnail">
                  <img
                    src={safePrefix(
                      _.get(this.props, "pageContext.frontmatter.img_path")
                    )}
                    alt={_.get(this.props, "pageContext.frontmatter.title")}
                  />
                </div>
              )}
              {_.get(this.props, "pageContext.frontmatter.subtitle") && (
                <div className="post-subtitle">
                  {htmlToReact(
                    _.get(this.props, "pageContext.frontmatter.subtitle")
                  )}
                </div>
              )}
              <div className="post-content">
                <form
                  name="myactualstatus"
                  method="POST"
                  className="myactualstatus-form"
                  onSubmit={(event) => {
                    this.handleSubmit(event);
                  }}
                >
                  <div className="form-row">
                    <label>Sur une échelle de 1 à 10, comment vous sentez-vous aujourd’hui ? Ici, 1 correspond à “je ne me sens pas bien du tout” et 10 à “je me sens en super forme”</label>
                    <div className="radio_values">
                      {this.displayOptions(11, 'howfell', 1)}
                    </div>
                  </div>
                  <div className="form-row">
                    <label>La semaine dernière : combien de jours avez-vous fait une activité physique ? </label>
                    <div className="radio_values">
                      {this.displayOptions(8, 'manydaydidsport', 0)} 
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Cette semaine : combien de jours planifiez-vous de faire une activité physique ?</label>
                    <div className="radio_values">
                      {this.displayOptions(8, 'manydaywillsport', 0)} 
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Quelle(s) activité(s) avez-vous prévu de faire ?</label>
                    <div className="input_container">
                      <input
                          className="01"
                          type="text"
                          name="01"
                          required
                          autoFocus
                        />
                    </div>
                  </div>

                  <div className="btn-container">
                    <button
                      className={`${
                        buttonState && `btn-${buttonState}`
                      } button secondary btn-submit`}
                      type="submit"
                    >
                      <ButtonSubmit text={'Enregister'} buttonState={buttonState}></ButtonSubmit>
                    </button>
                  </div>
                </form>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    );
  }
}

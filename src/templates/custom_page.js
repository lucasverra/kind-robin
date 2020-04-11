import React from "react";
import _ from "lodash";

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
    setTimeout(() => this.setState({ buttonState: "error" }), 4000);
    setTimeout(() => this.setState({ buttonState: "" }), 6000);
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
      return "submit";
    }
  };
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
                    <label>01</label>
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
                  <div className="form-row">
                    <label>02</label>
                    <div className="input_container">
                      <textarea className="01" name="02" rows="3" />
                    </div>
                  </div>

                  <div className="form-row">
                    <label>03</label>
                    <div className="radio_values">
                      <div className="radio_values-wrapper">
                        <input type="radio" name="03" value="a" /> a
                      </div>
                      <div className="radio_values-wrapper">
                        <input type="radio" name="03" value="b" /> b
                      </div>
                      <div className="radio_values-wrapper">
                        <input type="radio" name="03" value="c" /> c
                      </div>
                      <div className="radio_values-wrapper">
                        <input type="radio" name="03" value="d" /> d
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>04</label>
                    <div className="input_container">
                      <select id="05" name="05" className="05">
                        <option></option>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>05</label>
                    <div className="checkbox_values">
                      <div className="checkbox_values-wrapper">
                        <input type="checkbox" id="a" name="a" value="a" />
                        <label>a</label>
                      </div>
                      <div className="checkbox_values-wrapper">
                        <input type="checkbox" id="b" name="b" value="b" />
                        <label>b</label>
                      </div>
                      <div className="checkbox_values-wrapper">
                        <input type="checkbox" id="c" name="c" value="c" />
                        <label>c</label>
                      </div>
                      <div className="checkbox_values-wrapper">
                        <input type="checkbox" id="d" name="d" value="d" />
                        <label>d</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <label>06</label>
                    <div className="input_container">
                      <input type="date" id="06" name="06" />
                    </div>
                  </div>

                  <div className="btn-container">
                    <button
                      className={`${
                        buttonState && `btn-${buttonState}`
                      } button secondary btn-submit`}
                      type="submit"
                    >
                      {this.conditionalButton()}
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

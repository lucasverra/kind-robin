import React from "react";
import { Layout } from "../components/index";

import "../sass/custom.scss";

export default class MyActualStatus extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <Layout {...this.props}>
        <section className="custom-container-2">
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
              <button className="button secondary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </section>
      </Layout>
    );
  }
}

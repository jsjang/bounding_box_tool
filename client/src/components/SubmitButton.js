import React, { Component } from "react";
import axios from "axios";
import appContatiner from '../containers/AppContainer';
var env = process.env.NODE_ENV;
var config = require("../config.json");
const queryString = require("query-string");
var qs = require("qs");
export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.submitTask = this.submitTask.bind(this);
    this.getSubmissionUrl = this.getSubmissionUrl.bind(this);
    this.parsed = queryString.parse(this.props.location.search);
    this.loadImageURL = appContatiner.bind(this);
  }

  hasAcceptedTask() {
    if (this.parsed.assignmentId === undefined)
      return false;
    return this.parsed.assignmentId !== "ASSIGNMENT_ID_NOT_AVAILABLE";
  }

  submitTask(e) {
    var box = null;
    for (var key in this.props.boundingBoxes) {
      box = this.props.boundingBoxes[key].position;
      break; // takes one
    }
    if (box == null) {
      alert("바운딩 작업을 해주세요.");
      return;
    }
    var result_obj = {'box': box, 'tag': {}};
    var not_na = false;
    if (document.getElementById('truncated').checked) {
      result_obj.tag.truncated = 1;
      not_na = true;
    }
    if (document.getElementById('hidden').checked) {
      result_obj.tag.hidden = 1;
      not_na = true;
    }
    if (document.getElementById('light_reflex').checked) {
      result_obj.tag.light_reflex = 1;
      not_na = true;
    }

    if (document.getElementById('na').checked) {
      if (not_na) {
        alert("태그 선택이 잘 못되었습니다.");
        return
      }
      result_obj.tag.na = 1
    }else if (!not_na) {
       alert("태그 중 최소 하나는 선택되어야 합니다.");
       return;
    }

    axios
      .put(`${this.getSubmissionUrl()}`, result_obj)
      .then(res => {
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  createInputElement() {
    if (this.hasAcceptedTask()) {
      if (this.props.hasDrawnBox)
        return (
          <button
            name="boundingBoxes"
            type="submit"
            id="submitButton"
            value={JSON.stringify(this.getNormalizedBox())}
            ref={value => {
              this.value = value;
            }}
          >Submit</button>
        );
      else
        return (
          <button
            name="boundingBoxes"
            type="submit"
            id="submitButton"
            disabled
          >제출!</button>
        );
    } else {
      return (
        <button
          name="boundingBoxes"
          type="submit"
          id="submitButton"
          onClick={this.submitTask}
//          disabled
        >제출</button>
      );
    }
  }

  getSubmissionUrl() {
    const url = config["submit"][env] + this.props.aid + '?format=json';
    console.log(url);
    return url;
  }

  render() {
    const inputElement = this.createInputElement();

    return (
      <div id="Submit">
        
          {inputElement}

      </div>
    );
  }
}

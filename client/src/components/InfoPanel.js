import React, { Component } from "react";
import KeyboardKey from "./KeyboardKey";

export default class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="InfoPanel"><br/><br/>
        <table>
          <tbody>
            <tr>
              <td><KeyboardKey symbol={"Z"} /></td>
              <td>되돌리기(Undo)</td> 
            </tr>
            <tr>
              <td><KeyboardKey symbol={"X"} /></td>
              <td>다시하기(Redo)</td> 
            </tr>
            {/* <tr>
              <td><KeyboardKey symbol={"C"} /></td>
              <td>Toggle cross</td> 
            </tr> */}
          </tbody>
        </table><br/><br/>
      </div>
    );
  }
}


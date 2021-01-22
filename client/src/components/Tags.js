import React, { Component } from "react";
//import Checkbox from './Checkbox';

const items = [
  {label: '대상체가 잘린 경우', value: 'truncated'},
  {label: '대상체가 가려진 경우', value: 'hidden'},
  {label: '햇빛이 비쳐서 반사되어 있는 경우', value: 'light_reflex'},
  {label: '위 3가지 모두 해당하지 않는 경우', value: 'na'}
];

export default class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.props = props;
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }


  toggleCheckbox = label => {
    console.log(label);
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  }

  createCheckbox = (obj) => (
    <div><label>
      <input
        type="checkbox"
        id={obj.value}
        ref={obj.value}
        value={obj.value}
      />

      {obj.label}
    </label>
    </div>
  )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )


  render() {
    return (
        <div className="col-sm-12">
            {this.createCheckboxes()}
        </div>
    );
  }
}

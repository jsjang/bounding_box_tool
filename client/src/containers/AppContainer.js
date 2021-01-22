import React, { Component } from 'react'
import axios from 'axios'
import App from '../components/App'
import config from '../config'
import queryString from 'qs'
//import { Redirect } from "react-router-dom";
var env = process.env.NODE_ENV;
export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.loadImageURL = this.loadImageURL.bind(this);
    this.state = { /*redirect: null,*/ imageURL: null, aid: null };
  }

  componentDidMount() {
    this.loadImageURL();
  }
  
  loadImageURL() {
    // no server specified, use default cat pic
    axios.get(config["get"][env])
      .then(res => {
        if (res.data.length == 0) {
          alert('더 이상 진행할 작업이 없습니다.');
          this.setState({
            imageURL: null,
            aid: null
          });
          return;
        }
        this.setState({
          imageURL: res.data[0].image_url,
          aid: res.data[0].id
        });

      })
      .catch(err => {
          console.log(err);
      });
  }

  render() {
      console.log(this.state.imageURL);
      return <App showHeader={true} showSidePanel={true} imageURL={this.state.imageURL} loadImageURL={this.loadImageURL} aid={this.state.aid} />
  }
}

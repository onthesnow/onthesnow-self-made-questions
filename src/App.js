import React from 'react';
import List from './List.js'

import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      json: []
    };
    this.handleJsonChange = this.handleJsonChange.bind(this);
  }

  handleJsonChange(json) {
    let li = this.state.json.slice();
    li.push(json);
    this.setState({ json: li })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <List json={this.state.json} />
        <Footer />
      </div>
    );
  }

  componentWillMount() {
    this.getJson();
  }

  getJson = () => {
    const json = require("./contents.json");
    this.setState({
      json: json
    });
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="header hero is-info is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">自作問題集</h1>
          </div>
        </div>
      </div>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="content has-text-centered">
          2020 ©snow quartz
          </div>
      </div>
    )
  }
}
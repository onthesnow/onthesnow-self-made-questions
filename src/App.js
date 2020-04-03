import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import firebase from "firebase";

import List from './List.js'
import Control from './Control.js'

import './App.css';

const defaultPath = "/onthesnow-self-made-questions";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <div>
            <Switch>
              <Route path={defaultPath} exact component={List} />
              <Route path={defaultPath + "/control"} component={Control} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
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
          <Link to={defaultPath + "/control"}>
            <button>control</button>
          </Link>
          <Link to={defaultPath}>
            <button>list</button>
          </Link>
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

var firebaseConfig = {
  apiKey: "AIzaSyDOvPrCTOH1q6xwhvQlQpDX4BCgNx6JHD4",
  authDomain: "self-made-questions.firebaseapp.com",
  databaseURL: "https://self-made-questions.firebaseio.com",
  projectId: "self-made-questions",
  storageBucket: "self-made-questions.appspot.com",
  messagingSenderId: "996121708938",
  appId: "1:996121708938:web:a75824951877640f6e6073",
  measurementId: "G-38GKMPYRY3"
};

firebase.initializeApp(firebaseConfig);
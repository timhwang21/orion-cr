import React, { Component } from 'react';
import { Switch, Redirect, Route, NavLink } from 'react-router-dom';
import './App.css';

import DataPage from './features/DataPage';

import LIKERT_ANSWERS from './data/likert_answers.json';
import FREE_RESPONSE from './data/free_response.json';

class App extends Component {
  render() {
    return (
      <div className="App column">
        <header className="App-header column">
          <h1 className="App-title">Orion Code Review Survey Results</h1>
          <nav className="App-nav">
            <NavLink to="/scale">Scale</NavLink>
            <NavLink to="/free-response">Free Response</NavLink>
          </nav>
        </header>
        <article className="App-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/scale" />} />
            <Route
              path="/scale"
              render={() => (
                <DataPage title="Scale" data={LIKERT_ANSWERS} numeric />
              )}
            />
            <Route
              path="/free-response"
              render={() => (
                <DataPage title="Free Response" data={FREE_RESPONSE} />
              )}
            />
          </Switch>
        </article>
      </div>
    );
  }
}

export default App;

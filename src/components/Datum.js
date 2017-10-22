import React, { Component } from 'react';
import P from 'prop-types';

import SubDatum from './SubDatum';

import * as questions from '../questions';

import './Datum.css';

class Datum extends Component {
  static propTypes = {
    question: P.string,
    anchor: P.string,
    type: P.string,
    scale: P.arrayOf(P.string),
    answers: P.arrayOf(P.oneOfType([P.string, P.arrayOf(P.number)])),
    showChart: P.bool,
    numeric: P.bool,
  };

  get subQuestions() {
    const { type, answers, scale, showChart, numeric } = this.props;

    return questions[type].map(({ title, description, example }, idx) => (
      <SubDatum
        key={title}
        title={title}
        description={description}
        example={example}
        answers={numeric ? answers[idx] : answers}
        scale={scale}
        showChart={showChart}
        numeric={numeric}
      />
    ));
  }

  get anchor() {
    const { anchor } = this.props;

    return `#${anchor}`;
  }

  render() {
    const { anchor, question } = this.props;

    return (
      <div className="Datum column">
        <h3>
          <a className="anchor" name={anchor} href={this.anchor}>
            {question}
          </a>
        </h3>
        <div>{this.subQuestions}</div>
      </div>
    );
  }
}

export default Datum;

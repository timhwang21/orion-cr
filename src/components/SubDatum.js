import React, { Component } from 'react';
import P from 'prop-types';

import Histogram from './Histogram';
import Quote from './Quote';

import './SubDatum.css';

const sum = data => data.reduce((sum, val) => sum + val, 0);
const avg = data => sum(data) / data.length;
const unbucketData = data =>
  data.reduce((acc, datum, idx) => {
    for (let i = 0; i < datum; i++) {
      acc.push(idx + 1);
    }

    return acc;
  }, []);

const weightedAvg = data => avg(unbucketData(data));

const variance = data => {
  const unbucketedData = unbucketData(data);

  return avg(unbucketedData.map(val => val ** 2)) - avg(unbucketedData) ** 2;
};

class SubDatum extends Component {
  static propTypes = {
    title: P.string,
    description: P.string,
    example: P.string,
    scale: P.arrayOf(P.string),
    answers: P.arrayOf(P.number),
    showChart: P.bool,
    numeric: P.bool,
  };

  state = {
    open: false,
  };

  get openable() {
    const { description, example } = this.props;

    return description || example;
  }

  handleToggleOpen = () =>
    this.openable && this.setState({ open: !this.state.open });

  get caret() {
    const { open } = this.state;

    if (!this.openable) {
      return null;
    }

    return <i className={`fa fa-caret-${open ? 'down' : 'right'}`} />;
  }

  get description() {
    const { description, example } = this.props;
    const { open } = this.state;

    if (!open) {
      return null;
    }

    return (
      <section className="SubDatum-desc column">
        <div>{description}</div>
        <div>{example}</div>
      </section>
    );
  }

  get numericContent() {
    const { answers, scale, showChart } = this.props;

    return (
      <div className="column">
        <Histogram data={answers} tickValues={scale} hidden={!showChart} />
        <div className="SubDatum-stats row">
          <div className="SubDatum-stat">
            <span>{'N: '}</span>
            <b>{sum(answers)}</b>
          </div>
          <div className="SubDatum-stat">
            <span>{'μ: '}</span>
            <b>{weightedAvg(answers).toFixed(2)}</b>
          </div>
          <div className="SubDatum-stat">
            <span>{'σ²: '}</span>
            <b>{variance(answers).toFixed(2)}</b>
          </div>
        </div>
      </div>
    );
  }

  get categoricalContent() {
    const { answers } = this.props;

    return answers.map((answer, idx) => <Quote key={idx}>{answer}</Quote>);
  }

  get content() {
    const { numeric } = this.props;

    return numeric ? this.numericContent : this.categoricalContent;
  }

  render() {
    const { title } = this.props;

    return (
      <article className="SubDatum column">
        <h4
          className={this.openable ? 'openable' : ''}
          onClick={this.handleToggleOpen}
        >
          {title}
          {this.caret}
        </h4>
        {this.description}
        {this.content}
      </article>
    );
  }
}

export default SubDatum;

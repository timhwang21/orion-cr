import React, { Component } from 'react';
import P from 'prop-types';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTheme } from 'victory';

import './Histogram.css';

class Histogram extends Component {
  static propTypes = {
    data: P.arrayOf(P.number),
    tickValues: P.arrayOf(P.string),
    hidden: P.bool,
  };

  domain = {
    x: [1, this.dataLength],
    y: [0, 15],
  };

  padding = {
    top: 0,
    left: 40,
    right: 40,
    bottom: 50,
  };

  get dataLength() {
    const { data } = this.props;

    return data.length;
  }

  get data() {
    const { data } = this.props;

    return data.map((datum, idx) => ({
      x: idx + 1,
      y: datum,
    }));
  }

  labels = datum => datum.y;

  get className() {
    const { hidden } = this.props;

    return `Histogram ${hidden && 'hidden'}`;
  }

  render() {
    const { tickValues } = this.props;

    return (
      <div className={this.className}>
        <VictoryChart
          theme={VictoryTheme.material}
          domain={this.domain}
          height={300}
          width={500}
          padding={this.padding}
          domainPadding={25}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis tickValues={tickValues} />
          <VictoryBar data={this.data} labels={this.labels} />
        </VictoryChart>
      </div>
    );
  }
}

export default Histogram;

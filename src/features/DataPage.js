import React, { Component } from 'react';
import P from 'prop-types';

import Datum from '../components/Datum';

import './DataPage.css';

class DataPage extends Component {
  static propTypes = {
    data: P.arrayOf(P.object),
    title: P.string,
    numeric: P.bool,
  };

  state = {
    showCharts: true,
  };

  toggleCharts = () => this.setState({ showCharts: !this.state.showCharts });

  get chartButton() {
    const { numeric } = this.props;
    const { showCharts } = this.state;

    if (!numeric) {
      return null;
    }

    return (
      <button type="button" onClick={this.toggleCharts}>
        {`${showCharts ? 'Hide' : 'Show'} charts`}
      </button>
    );
  }

  get data() {
    const { data, numeric } = this.props;
    const { showCharts } = this.state;

    return data.map(datum => {
      const key = datum.question.split(' - ')[0];

      return (
        <Datum
          {...datum}
          key={key}
          anchor={key}
          showChart={showCharts}
          numeric={numeric}
        />
      );
    });
  }

  render() {
    const { title } = this.props;

    return (
      <div className="DataPage column">
        <header className="DataPage-header">
          <h2 className="DataPage-title">{title}</h2>
        </header>
        {this.chartButton}
        {this.data}
      </div>
    );
  }
}

export default DataPage;

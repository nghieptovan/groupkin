import React, { PureComponent } from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};
export default class ChartVisitor extends PureComponent {

  render() {
    return (
      <Doughnut data={data} />

    );
  }
}
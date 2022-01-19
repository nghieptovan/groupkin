import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';

const getRightData = (rawInput) => {
  const data = {
    labels: rawInput.labels,
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: rawInput.datasets
      }
    ]
  };

  return data;
}
export default class ChartLine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataPageviews: {
        labels: [],
        datasets: []
      },
      dataSessions: {
        labels: [],
        datasets: []
      }
    }
  }

  formatNumber(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { report: nextReport } = nextProps;
    if (nextReport) {
      let report = nextReport;
      const dataPageviews = {
        labels: [],
        datasets: []
      };
      const dataSessions = {
        labels: [],
        datasets: []
      };

      report.data.rows.forEach(row => {
        dataSessions.labels.push(row.dimensions);
        dataSessions.datasets.push(row.metrics[0].values[0]);
      });

      report.data.rows.forEach(row => {
        dataPageviews.labels.push(row.dimensions);
        dataPageviews.datasets.push(row.metrics[0].values[1]);
      });

      this.setState({
        dataSessions,
        dataPageviews
      });

    }
  }

  render() {
    const { dataPageviews, dataSessions } = this.state;
    const { type } = this.props;
    let data = {};
    if (type === 'pageviews') {
      data = getRightData(dataPageviews);
    } else if (type === 'sessions') {
      data = getRightData(dataSessions);
    }

    return (
      <Line
        data={data}
        height={300}
        options={
          {
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function (label, index, labels) {
                      return label / 1000 + 'k';
                    }
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    callback: function (label, index, labels) {
                      return label[0].slice(-2);
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Ngày'
                  }
                }
              ]
            }
          }
        }
      />

    );
  }
} 
import React, { Component } from 'react';

export default class RecordRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {}
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { report: nextReport } = nextProps;
    if (nextReport) {
      let report = nextReport;
      this.setState({
        report
      });
    }
  }

  formatNumber(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(",");
  }

  render() {
    const { report, stt } = this.props;

    return (
      <>
        {report &&
          <tr>
            <td style={{ width: "15px" }}>{parseInt(stt) + 1}.</td>
            <td>
              <a> {report.dimensions[0]} </a>
            </td>
            <td className="text-right" style={{ width: "100px" }}>{this.formatNumber(report.metrics[0].values[0])}</td>
          </tr>
        }
      </>
    );
  }
}
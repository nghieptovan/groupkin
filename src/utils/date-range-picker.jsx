import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateRangePickerCustom extends Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    this.setState({
      startDate: this.props.startDate,
      endDate: this.props.endDate
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.startDate !== nextProps.startDate) {
      this.setState({ startDate: nextProps.startDate });
    }
    if (this.state.endDate !== nextProps.endDate) {
      this.setState({ endDate: nextProps.endDate });
    }
  }

  setStartDate = date => {
    this.setState({ startDate: date }, () => this.props.onChange(this.state));
  };

  setEndDate = date => {
    this.setState({ endDate: date }, () => this.props.onChange(this.state));
  };

  render() {
    const { startDate, endDate } = this.state;

    return (
      <>
        <div className="row custom-date-range-picker">
          <div className="col-6">
            <DatePicker
              selected={startDate}
              onChange={date => this.setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="col-6">
            <DatePicker
              selected={endDate}
              onChange={date => this.setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      </>
    );
  }
}

export default DateRangePickerCustom;

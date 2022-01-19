import React, { Component } from "react";
import PropTypes from "prop-types";
import "./input.scss";

class Input extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      value: props.value
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }
  render() {
    return (
      <div className="input-group">
        <input
          ref={this.input}
          type="text"
          disabled={this.props.disabled ? 'disabled' : ''}
          className="form-control"
          placeholder={this.props.placeholder || ""}
          onChange={e => this.onChange(e)}
          value={this.state.value}
          onPaste={e => {
            this.onPaste(e);
          }}
          onKeyUp={e => {
            this.onKeyUp(e);
          }}
          onFocus={e => this.onFocus(e)}
          onBlur={e => this.onBlur(e)}
        />
        {this.renderIcon()}
      </div>
    );
  }

  renderIcon() {
    const { icon = "" } = this.props;
    if (icon === "") {
      return "";
    }
    return (
      <div
        className="input-group-append"
        onClick={e => {
          this.onIconClick(e);
        }}
      >
        <span className="input-group-text">
          <i className={`fas fa-${icon}`} />
        </span>
      </div>
    );
  }

  onKeyUp(e) {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      const value = this.state.value;
      this.onSubmit(value);
    }
  }

  onPaste(e) {
    let value = e.clipboardData.getData('Text');
    this.props.onSubmit(value);
  }

  onChange(e) {
    const value = e.target.value;
    this.setState(
      {
        value: value || ""
      },
      () => {
        this.props.onChange && this.props.onChange(value);
      }
    );
  }

  onIconClick(e) {
    const value = this.state.value;
    this.onSubmit(value);
  }
  onSubmit(value) {
    if (value === "") return;
    this.props.onSubmit && this.props.onSubmit(value);
  }
  onFocus(value) {
    this.props.onFocus && this.props.onFocus(true);
  }
  onBlur(value) {
    this.props.onBlur && this.props.onBlur(false);
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string
};

export default Input;

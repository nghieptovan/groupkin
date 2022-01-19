import React, { Component } from "react";
import "./avatar.css";
import ImageLoader from "../image-loader/ImageLoader";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  render() {
    return (
      <div
        className="avatar-wrapper"
        style={{
          width: `${this.props.width || 60}px`,
          paddingTop: `${this.props.width || 60}px`
        }}
      >
        {this.props.src && (
          <ImageLoader
            src={this.props.src}
            alt={this.props.name || "User avatar"}
            onError={() => {
              this.onError();
            }}
          />
        )}
        {(!this.props.src || this.state.isError) && <span className="text-uppercase">{this.props.name.charAt(0)}</span>}
      </div>
    );
  }
  onError() {
    this.setState({ isError: true });
  }
}

Avatar.propTypes = {};

export default Avatar;

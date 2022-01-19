import React, { Component } from "react";
import "./image-loader.css";

const IMG_SERVER = process.env.REACT_APP_CDN;

class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  render() {
    const { isError } = this.state;
    const { src, width, classImg } = this.props;
    let srcImg = '';
    const resizeWidth = `w${width ? width : 150}`;

    if (src && !(src.includes("http://") || src.includes("https://"))) {
      srcImg = IMG_SERVER + resizeWidth + '/uploads/' + src;
    } else if (src.includes("https://betacms.saostar.vn")) {
      srcImg = src;
    } else {
      // src = https://img.saostar.vn/2020/03/21/7206423/page.jpg

      const w = src.split('/')[3];
      const newWidth = w.includes('w') ? resizeWidth : `${resizeWidth}/${w}`;
      srcImg = src.replace(w, newWidth);

    }

    return (
      <React.Fragment>
        <img
          src={`${srcImg}`}
          className={`lazyload image-loader${isError ? " d-none" : ''} ` + classImg}
          alt={this.props.alt}
          onError={() => {
            this.onError();
          }}
        />
      </React.Fragment>
    );
  }

  onError() {
    this.setState({ isError: true });
    if (this.props.onError) {
      this.props.onError();
    }
  }
}

export default ImageLoader;

import React, { Component } from "react";
import "./image-stack.css";
import ImageLoader from "../image-loader/ImageLoader";

class ImageStack extends Component {
  render() {
    const { data = {} } = this.props;
    if (!data.images) return;
    const images = [
      "http://placekitten.com/300/200",
      "http://placekitten.com/300/200?image=2",
      "http://placekitten.com/300/200?image=3",
      "http://placekitten.com/300/200?image=4",
      "http://placekitten.com/300/200?image=5"
    ];
    return (
      <div className="image-stack-component">
        <div className="photo-stack">
          {images.map((img,index) => {
            return (
              <div className="image-wrapper" key={`stack-image-wrapper-${data.title}-${index}`}>
                <ImageLoader src={img} />
              </div>
            );
          })}
        </div>
        <p className="title">{data.title || "" }</p>
      </div>
    );
  }

  onClick(){
    this.props.onClick && this.props.onClick();
  }
}

export default ImageStack;

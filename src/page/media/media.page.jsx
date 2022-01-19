import React, { Component } from "react";
import Link from "src/components/link";
import ImageStack from "../../components/image-stack/ImageStack";

class MediaPage extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h1 className="d-flex justify-content-between align-items-center">
                  Hình ảnh & Video{" "}
                  <button
                    type="button"
                    className="btn btn-sm bg-green floar-right"
                  >
                    <i className="fas fa-plus"></i> Thêm Ảnh / Video mới
                  </button>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-default color-palette-box">
                  <div className="card-header">
                    <h3 className="card-title">
                      Danh sách ảnh / video theo bài đăng của bạn
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="card-refresh"
                        data-source="/pages/widgets.html"
                        data-source-selector="#card-refresh-content"
                      >
                        <i className="fas fa-sync-alt" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="maximize"
                      >
                        <i className="fas fa-expand" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3">
                        <ImageStack data={{ title: "testing", images: [] }} />
                      </div>
                      <div className="col-md-3">
                        <ImageStack data={{ title: "testing", images: [] }} />
                      </div>
                      <div className="col-md-3">
                        <ImageStack data={{ title: "testing", images: [] }} />
                      </div>
                      <div className="col-md-3">
                        <ImageStack data={{ title: "testing", images: [] }} />
                      </div>
                      <div className="col-md-3">
                        <ImageStack data={{ title: "testing", images: [] }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card card-default color-palette-box">
                  <div className="card-header">
                    <h3 className="card-title">
                      Danh sách tất cả ảnh / video của bạn
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="card-refresh"
                        data-source="/pages/widgets.html"
                        data-source-selector="#card-refresh-content"
                      >
                        <i className="fas fa-sync-alt" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="maximize"
                      >
                        <i className="fas fa-expand" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default MediaPage;

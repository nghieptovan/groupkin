import React, { Component } from "react";
import PropTypes from "prop-types";
import PapaParse from "papaparse";
import ApiService from "../../services/ApiService";
import Pagination from "react-js-pagination";
import Select from "react-select";

class CsvParser extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fullList: [],
      total: 0,
      list: [],
      page: 1,
      limit: 15,
      models: [
        {
          label: "User",
          value: "user"
        },
        {
          label: "Post",
          value: "post"
        },
      ],
      model: null
    };
  }

  componentDidMount() {
    this.getContentCreatorType();
  }
  renderTable(data = []) {
    if (data.length == 0) return "";
    const headers = [];
    for (const key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        headers.push(key);
      }
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            {headers.map(item => {
              return <th key={`header-${item}`}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={`row-value-${index}`}>
                {headers.map((header, idx) => {
                  return (
                    <td key={`value-cell-${item.increment_id}-${idx}`}>
                      {item[header]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  render() {
    const { total, list, limit, page } = this.state;
    return (
      <div className="content-wrapper post-list-container">
        <section className="content-header">
          <div className="container-fluid">
            {/* Header */}
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  Import
                  <button
                    type="button"
                    className="btn btn-sm bg-green"
                    onClick={() => {
                      this.uploadCSVFile();
                    }}
                  >
                    <i className="fas fa-upload"></i> Upload file CSV
                  </button>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={this.fileInput}
                    onChange={e => {
                      this.handleFileUpload(e);
                    }}
                  />
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
                    {this.state.total >= 0 && (
                      <div className="header-conta">
                        <div
                          className="row"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="left">
                            <div className="total">
                              <span>
                                Tổng cộng: <b>{total}</b> dòng /{" "}
                                <b>{Math.ceil(total / limit)}</b> trang
                              </span>
                            </div>
                          </div>

                          <div className="">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="example1_paginate"
                            >
                              <Pagination
                                activePage={page}
                                itemsCountPerPage={limit}
                                totalItemsCount={total}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                                itemClass="paginate_button page-item"
                                activeClass="active"
                                disabledClass="disabled"
                                itemClassPrev="previous"
                                itemClassNext="next"
                                linkClass="page-link"
                                hideFirstLastPages={true}
                                prevPageText="Previous"
                                nextPageText="Next"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row import-area">
                          <div className="col-sm-2">
                            <Select
                              value={this.state.model}
                              options={this.state.models}
                              onChange={value => {
                                this.selectedModel(value);
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm bg-green"
                            onClick={() => {
                              this.importData();
                            }}
                            disabled={!this.state.model}
                          >
                            <i className="fas fa-file-import"></i> Import
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Post List */}
                  <div className="card-body table-responsive p-0">
                    {this.state.list.length > 0 &&
                      this.renderTable(this.state.list)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  getContentCreatorType() {}
  uploadCSVFile() {
    this.fileInput.current.click();
  }

  handleFileUpload(e) {
    const file = e.target.files[0];
    let results = [];
    PapaParse.parse(file, {
      header: true,
      complete: result => {
        console.log("result",result.data.length);
        
        this.setState({
          fullList: [...result.data],
          list: [...result.data.splice(0, this.state.limit)],
          total: result.data.length
        });
      }
    });
  }

  handlePageChange = pageNumber => {
    const curPage = pageNumber;
    const fullList = JSON.parse(JSON.stringify(this.state.fullList));
    const list = fullList.splice(
      (curPage - 1) * this.state.limit,
      this.state.limit
    );
    this.setState({
      page: curPage,
      list: [...list]
    });
  };

  selectedModel(value) {
    this.setState({
      model: value
    });
  }

  importData() {
    if (!this.state.model) return;

    // const data = {
    //   data: this.state.fullList
    // };

    console.log("model: ", this.state.model);
    if (this.state.model.value == "user") {
      const list = this.state.fullList.map(item => {
        let cates = item.category.split(",");

        cates = cates.reduce((unique, cat) => {
          if (cat.trim() != "" && !unique.includes(cat.trim())) {
            return [...unique, cat.trim()];
          }
          return unique;
        }, []);
        item.category = cates;

        delete item.role;
        delete item["mục"];

        return item;
      });
      console.log("List account: ", list);
      const data = {
        data: list
      }
      ApiService.post("/tools/import-users", data).then(result => {
        console.log("import users: ", result);
      });
    } else if (this.state.model.value == "post") {

      const list = this.state.fullList.map(item => {
        
        let cates = (item.category || "").split(">");
        let tags = (item.tags || "").split(',');

        cates = cates.reduce((unique, cat) => {
          if (cat.trim() != "" && !unique.includes(cat.trim())) {
            return [...unique, cat.trim()];
          }
          return unique;
        }, []);
        
        tags = tags.reduce((unique, tag) => {
          if (tag.trim() != "" && !unique.includes(tag.trim())) {
            return [...unique, tag.trim()];
          }
          return unique;
        }, []);

        item.category = cates;
        item.tag = tags;
        
        return item;
      });
      const data = {
        data: list
      }
      ApiService.post("/tools/import-posts", data).then(result => {
        console.log("import post: ", result);
      });
    }
  }
}

CsvParser.propTypes = {};

export default CsvParser;

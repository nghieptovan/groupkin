import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../store/action/post";
import * as configActions from "../../store/action/config";
import moment from "moment";
import Link from "src/components/link";
import Select from "react-select";
import * as _ from "lodash";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "../../components/input/Input";
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import slug from 'slug'
import { filtersToQueryString } from "../../utils/post-filter";
import './export_royalties.scss';
// import * as jsPDF from 'jspdf'

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      valueExport: null,
      listPost: [],
      isLoading: false,
      exportTypes: [
        { value: "pdf", label: "PDF", code: "" },
        { value: "excel", label: "Excel", code: "" }
      ],
      dataExcel: []
    }
  }

  prepareData = () => {

    let { filters } = this.props;

    filters.limit.value = -1;
    let queryString = filtersToQueryString(filters);
    ApiService.get(`/posts/rolyalties?_sort=publishedAt:DESC${queryString}`).then(result => {
      // console.log(result);
      let postList = result.posts;
      let lstTmp = [];
      postList.forEach((post, idx) => {
        const money_editor = post.royalties_editor_value
          ? parseInt(post.royalties_editor_value.value * 1000)
          : 0;
        const money_photo = post.royalties_photo_value
          ? parseInt(post.royalties_photo_value.value * 1000)
          : 0;
        let title = post.title || "";
        let publish = moment(post.publishedAt).format("DD/MM hh:mm");
        let category = this.generateCategory(idx, post.categories)[0];
        let editor = post.royalties_editor ? post.royalties_editor.label : '';
        let photo = post.royalties_photographer ? post.royalties_photographer.label : '';
        let moneye = money_editor
        let moneyp = money_photo
        let money_total = money_editor + money_photo


        let item = [title, publish, category, editor, photo, moneye, moneyp, money_total];
        lstTmp.push(item);
      });
      this.setState({ listPost: result.posts, showModal: true, isLoading: false, dataExcel: lstTmp })
    });


  }
  // closeModal = () => {
  //   this.setState({ showModal: false })
  // }

  // exportPDF = () => {
  //   let { filters } = this.props;
  //   console.log(filters);
  // }

  // selectedExportType = data => {
  //   if (data.value == 'pdf') {
  //     this.setState({ isLoading: true }, () => {
  //       this.openModal();
  //     })

  //   }

  // }

  generateCategory = (idx, category) => {
    category = _.unionBy(category, "_id");
    let stringBuilder = [];
    category.forEach((cat, index) => {
      if (index === 0) {
        let stringBuilder1 = cat.name;
        stringBuilder.push(stringBuilder1);
      }
    });
    return stringBuilder;
  };

  componentDidMount() {
    this.prepareData();

  }

  formatNumber(number) {
    var tier = (Math.log10(number) / 3) | 0;
    if (tier == 0) return number;
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;

    return parseFloat(scaled.toFixed(1)) + suffix;
  }

  render() {


    const { filters } = this.props;

    const category = filters.category.value !== '' ? '-' + filters.category.value : '';
    const editor = filters.editor.value !== '' ? '-' + filters.editor.value : '';
    const editor_type = filters.editor_type.value !== '' ? '-' + filters.editor_type.value : '';
    const start_date = moment(filters.start_date.value).format("DD/MM");
    const end_date = moment(filters.end_date.value).format("DD/MM");

    const filename = `nhuan${editor_type}${category}${editor}-${start_date}-${end_date}`;

    const multiDataSet = [
      {
        columns: ["Tiêu đề", "Ngày xuất bản", "Chuyên mục", "Biên tập", "Phóng viên ảnh", "Nhuận bút", "Nhuận ảnh", "Tổng"],
        data: this.state.dataExcel
      }
    ];
    return (
      <>

        <ExcelFile
          element={
            <button className="btn btn-primary btn-block" onClick={this.prepareData}>
              <i className="fas fa-download mr-2"></i>Export
            </button>
          }
          filename={filename}>
          <ExcelSheet dataSet={multiDataSet} name="Royalties" />
        </ExcelFile>

        {/* 
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>

              <Button className="btn-success" onClick={() => this.export()}>Export PDF</Button>
              <ExcelFile element={<Button className="ml-3 btn-success">Export Excel</Button>} filename="export-royalties">
                <ExcelSheet dataSet={multiDataSet} name="Royalties" />
              </ExcelFile>

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>


            {this.state.isLoading && <i className="fas fa-2x fa-sync fa-spin"></i>}
            <table id="export-royalties" className="table table-bordered mt-3" style={{ fontSize: "11px" }}>
              <thead>
                <tr className="header-export">
                  <th style={{ width: "250px" }}>Tiêu đề</th>
                  <th style={{ width: "180px" }}>Ngày xuất bản</th>
                  <th style={{ width: "150px" }}>Chuyên mục</th>
                  <th style={{ width: "150px" }}>Biên tập</th>
                  <th style={{ width: "180px" }}>Phóng viên ảnh</th>
                  <th style={{ width: "120px" }}>Nhuận bút</th>
                  <th style={{ width: "120px" }}>Nhuận ảnh</th>
                  <th style={{ width: "120px" }}>Tổng</th>
                </tr>
              </thead>
              <tbody>

                {(this.state.listPost && this.state.listPost.length) > 0 && (
                  this.state.listPost.map((post, idx) => {
                    const money_editor = post.royalties_editor_value
                      ? parseInt(post.royalties_editor_value.value * 1000)
                      : 0;
                    const money_photo = post.royalties_photo_value
                      ? parseInt(post.royalties_photo_value.value * 1000)
                      : 0;
                    return (
                      <tr className="body-export" key={`itemsearch-${idx}`}>

                        <td><a href={post.url} target="_blank" rel="noopener noreferrer">{post.title || ""}</a></td>
                        <td>{moment(post.publishedAt).format("DD/MM hh:mm")}</td>
                        <td>{this.generateCategory(idx, post.categories)}</td>
                        <td>{post.royalties_editor ? post.royalties_editor.label : ''}</td>
                        <td>{post.royalties_photographer ? post.royalties_photographer.label : ''}</td>
                        <td>{money_editor.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND"
                        })}
                        </td>
                        <td>{money_photo.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND"
                        })}
                        </td>
                        <td>{(money_editor + money_photo).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND"
                        })}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

          </Modal.Body>

        </Modal> */}

      </>
    );
  }
}

export default connect(
  store => {
    return {
      profile: store.loginInfo.userInfo,
      router: store.router,
      posts: store.post.listRoyalties,
      totalPosts: store.post.totalRoyalties,
      totalMoneyEditor: store.post.totalMoneyEditor,
      totalMoney: store.post.totalMoney,
      totalMoneyPhoto: store.post.totalMoneyPhoto,
      config: store.config
    };
  },
  dispatch => {
    return {
      getListPost: value => {
        dispatch(postActions.getListRoyalties(value));
      }
    };
  }
)(Export);

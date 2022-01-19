import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../store/action/post";
import _ from "lodash";
import Link from "src/components/link";
import Status from "src/components/util/status";
import Date from "src/components/util/date";
import localStore from "src/utils/local-storage";
import ImageLoader from "../image-loader/ImageLoader";
import UserAvatar from "react-user-avatar";
import CreatorItem from "../posts/tab/creator-item/creator-item";
import CreatableSelect from "react-select";
import Select from "react-select";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import slug from 'slug';
import { ToastContainer, toast } from 'react-toastify';
const CONTENT_URL = process.env.REACT_APP_CONTENT;
const SI_SYMBOL = ["", "k", "tr", "tỉ", "T", "P", "E"];

class RoyaltiesReportItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      onHover: false,
      contentcreatortype: [],
      editorRoyalties: props.postItem.royalties_editor_value,
      photoRoyalties: props.postItem.royalties_photo_value,
      editorRoyaltiesName: props.postItem.royalties_editor,
      photoRoyaltiesName: props.postItem.royalties_photographer,
      listRoyaltiesEditor: props.listRoyaltiesEditor,
      listRoyaltiesPhoto: props.listRoyaltiesPhoto,
      showModal: false,
      isLoadingE: false,
      isLoadingP: false,
      filters: {
        page: {
          fieldName: "_start",
          value: "1"
        },
        limit: {
          fieldName: "_limit",
          value: "50"
        },
        search: {
          fieldName: "slug_contains",
          value: ""
        },
      },
      postItem: props.postItem
    };
  }

  generateCategory = (idx, category) => {
    category = _.unionBy(category, "_id");
    let stringBuilder = [];
    category.forEach((cat, index) => {
      if (index === 0) {
        let stringBuilder1 = (
          <a
            key={`item-category${cat._id}${idx}${index}`}
            className="mr-1"
            href={`/posts?category=${cat._id}&page=1&limit=10`}
          >
            {cat.name}
          </a>
        );
        stringBuilder.push(stringBuilder1);
      }
    });
    return stringBuilder;
  };

  formatNumber(number) {
    var tier = (Math.log10(number) / 3) | 0;
    if (tier == 0) return number;
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;

    return parseFloat(scaled.toFixed(1)) + suffix;
  }

  formatThousandNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  handleInputChangeEditor = (inputValue) => {

    if (inputValue && inputValue.length >= 2) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const slugValue = slug(inputValue);
        this.setState({ isLoadingE: true })
      }, 1000);
    }

  };

  handleInputChangePhoto = (inputValue) => {

  };

  componentDidUpdate(prevProps) {
    if (prevProps.postItem !== this.props.postItem) {
      console.log('update');
    }
  }

  render() {
    const { isLoadingE, isLoadingP, editorRoyaltiesName, listRoyaltiesEditor, listRoyaltiesPhoto } = this.state;
    let _user = localStore.get("_user");
    const { idx, isMobile } = this.props;
    const { postItem } = this.state;
    const money_editor = postItem.royalties_editor_value
      ? parseInt(postItem.royalties_editor_value.value)
      : 0;
    const money_photo = postItem.royalties_photo_value
      ? parseInt(postItem.royalties_photo_value.value)
      : 0;

    const time = moment(postItem.updatedAt).format("DD/MM hh:mm");

    if (isMobile) {
      return (
        <>
          <tr key={`post-${idx}`} className="royalties-report-item">
            <td onClick={this.openModal}>
              <div className="d-flex p-2">
                <div className="avatar">
                  {(postItem.img_ver && (
                    <ImageLoader
                      className="lazyload img-circle"
                      src={postItem.img_ver}
                      width="100"
                    />
                  )) || (
                      <img src={process.env.PUBLIC_URL + "assets/images/100x160.png"} />
                    )}
                </div>
                <div className="right">
                  <h6 className="title">
                    {postItem.title || "Chưa đặt tên"}
                    {!this.state.showEdit && postItem.editing && (
                      <i className="ml-2 fas fa-lock"></i>
                    )}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className=""
                      style={{ fontSize: "0.8em", color: "#1179d7" }}
                    >
                      {(postItem.contentpenname &&
                        postItem.contentpenname.label) ||
                        "-"}
                    </span>
                    <span className="time text-dark">
                      {postItem.posttype && time}
                    </span>
                  </div>

                  <div className="py-1 d-flex justify-content-between align-items-center">
                    <span className="cate-name">
                      {this.generateCategory(idx, postItem.categories)}
                    </span>

                    <span
                      className="btn bg-gradient-primary btn-xs"
                      style={{
                        fontSize: "0.8em",
                        padding: "0.25em 0.4em",
                        lineHeight: "1"
                      }}
                    >
                      Tổng nhuận: <span> </span>
                      {this.formatNumber(
                        (this.state.editorRoyalties
                          ? parseInt(this.state.editorRoyalties.value * 1000)
                          : 0) +
                        (this.state.photoRoyalties
                          ? parseInt(this.state.photoRoyalties.value * 1000)
                          : 0)
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <Modal
            show={this.state.showModal}
            onHide={this.closeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div className="row">
                <div className="col-8">
                  <strong>Biên tập</strong>
                </div>
                <div className="col-4">
                  <strong>Nhuận bút</strong>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-8">
                  <Select
                    value={this.state.editorRoyaltiesName}
                    options={listRoyaltiesEditor}
                    onChange={value => this.updateRoyaltiesEditor(value)}
                    menuPosition="fixed"
                    onInputChange={this.handleInputChangeEditor}
                    isLoading={isLoadingE}
                  />
                </div>
                <div className="col-4">
                  {!_user.can_set_royalties ? (
                    money_editor.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND"
                    })
                  ) : (
                      <Select
                        value={this.state.editorRoyalties}
                        options={this.props.royalties_list}
                        onChange={value => this.onEditorRoyaltiesSelected(value)}
                        isSearchable={true}
                        placeholder=""
                        menuPosition="fixed"
                      />
                    )}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-8">
                  <strong>Phóng viên ảnh</strong>
                </div>
                <div className="col-4">
                  <strong>Nhuận ảnh</strong>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-8">
                  <Select
                    value={this.state.photoRoyaltiesName}
                    options={listRoyaltiesPhoto}
                    onChange={value => this.updateRoyaltiesPhotographer(value)}
                    menuPosition="fixed"
                    onInputChange={this.handleInputChangePhoto}
                    isLoading={isLoadingP}
                    isClearable={true}
                  />
                </div>
                <div className="col-4">
                  {!_user.can_set_royalties ? (
                    money_photo.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND"
                    })
                  ) : (
                      <Select
                        value={this.state.photoRoyalties}
                        options={this.props.royalties_list}
                        onChange={value =>
                          this.onPhotographerRoyaltiesSelected(value)
                        }
                        isSearchable={true}
                        placeholder=""
                        menuPosition="fixed"
                      />
                    )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Đóng</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

    return (
      <tr key={`post-${idx}`} className="" style={{ height: "63px" }}>
        <td className="title" >
          <a href={`/posts/edit/${postItem._id}`} target="_blank" rel="noopener noreferrer" >
            {postItem.title + " " + postItem.posttype.type_code || "Chưa đặt tên"}{" "}
            {postItem.editing && <i className="fas fa-lock"></i>}
            {(postItem.editor_type &&
              // && (postItem.editor_type === 'normal' && <button type="button" className="btn btn-sm btn-outline-primary ml-2">Bài thường</button>)
              postItem.editor_type === "mini" && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger ml-2"
                >
                  Bài Mini
                </button>
              )) ||
              (postItem.editor_type === "special" && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning ml-2"
                >
                  Bài Special
                </button>
              )) ||
              (postItem.editor_type === "video" && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark ml-2"
                >
                  Bài Video
                </button>
              ))}
            {postItem.is_pr && (
              <button type="button" className="btn btn-sm btn-outline-info ml-2">
                PR
              </button>
            )}
            <div
              className={
                "tools tools-posts" + (this.state.onHover ? " active" : "")
              }
            >
              {this.state.showEdit && (
                <>
                  {postItem.editing && (
                    <Link
                      to={`/posts/edit/${postItem._id}`}
                      className="btn btn-warning btn-sm ml-2"
                    >
                      <i className="fas fa-lock"></i>{" "}
                      {postItem.editing.fullname || postItem.editing.email}
                    </Link>
                  )}
                </>
              )}
            </div>
          </a>
        </td>

        <td style={{ width: "120px" }}>
          {postItem.posttype && (
            <>
              <span>{moment(postItem.publishedAt).format("DD/MM hh:mm")}</span>
            </>
          )}
        </td>

        <td style={{ width: "150px" }}>
          <span className="tag tag-success">
            {this.generateCategory(idx, postItem.categories)}
          </span>
        </td>

        <td style={{ width: "240px" }}>
          <CreatableSelect
            value={this.state.editorRoyaltiesName}
            options={listRoyaltiesEditor}
            onChange={value => this.updateRoyaltiesEditor(value)}
            menuPosition="fixed"
            onInputChange={this.handleInputChangeEditor}
            isLoading={isLoadingE}
          />
        </td>

        <td style={{ width: "150px" }}>
          <CreatableSelect
            value={this.state.photoRoyaltiesName}
            options={listRoyaltiesPhoto}
            onChange={value => this.updateRoyaltiesPhotographer(value)}
            menuPosition="fixed"
            onInputChange={this.handleInputChangePhoto}
            isLoading={isLoadingP}
            isClearable={true}
          />
        </td>

        <td
          style={{ width: "110px" }}
          className="royalties-editor-value text-right"
        >
          {!_user.can_set_royalties ? (
            money_editor.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND"
            })
          ) : (
              <Select
                value={this.state.editorRoyalties}
                options={this.props.royalties_list}
                onChange={value => this.onEditorRoyaltiesSelected(value)}
                isSearchable={true}
                placeholder=""
                menuPosition="fixed"
                isDisabled={this.state.editorRoyaltiesName ? false : true}
              />
            )}
        </td>

        <td
          style={{ width: "110px" }}
          className="royalties-editor-value text-right"
        >
          {!_user.can_set_royalties ? (
            money_photo.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND"
            })
          ) : (
              <Select
                value={this.state.photoRoyalties}
                options={this.props.royalties_list}
                onChange={value => this.onPhotographerRoyaltiesSelected(value)}
                isSearchable={true}
                placeholder=""
                menuPosition="fixed"
                isDisabled={this.state.photoRoyaltiesName ? false : true}
              />
            )}
        </td>

        <td style={{ width: "60px" }} className="text-right">
          {this.formatNumber(
            (this.state.editorRoyalties
              ? parseInt(this.state.editorRoyalties.value * 1000)
              : 0) +
            (this.state.photoRoyalties
              ? parseInt(this.state.photoRoyalties.value * 1000)
              : 0)
          )}
        </td>

        <td style={{ width: "100px" }} className="view-count text-right">
          {postItem.pageviews ? this.formatThousandNumber(postItem.pageviews) : 0}
        </td>
      </tr>
    );
  }

  updateRoyaltiesEditor(value) {
    this.setState({ editorRoyaltiesName: value }, () => {
      delete value.value;
    });
  }

  updateRoyaltiesPhotographer(value) {
    this.setState({ photoRoyaltiesName: value }, () => {
      console.log(value);
      if (value) { delete value.value }
      else {
        this.onPhotographerRoyaltiesSelected(null)
      }


    });
  }

  onEditorRoyaltiesSelected(value) {
    const updateValue = parseInt(
      (value ? value.value : 0) -
      (this.state.editorRoyalties ? this.state.editorRoyalties.value : 0)
    );
    this.props.updateTotal(updateValue, "editor");

    this.setState({ editorRoyalties: value });
  }

  onPhotographerRoyaltiesSelected(value) {
    const updateValue = parseInt(
      (value ? value.value : 0) -
      (this.state.photoRoyalties ? this.state.photoRoyalties.value : 0)
    );
    this.props.updateTotal(updateValue, "photo");

    this.setState({ photoRoyalties: value });
  }
}
export default connect(
  store => {
    return {
      login: store.loginInfo,
      config: store.config,
      royalties_list: store.config.royalties_list || []
    };
  },
  dispatch => {
    return {
      setCurrentPost: value => {
        dispatch(postActions.setCurrentPost(value));
      },
      deletePost: value => {
        dispatch(postActions.deletePost(value));
      }
    };
  }
)(RoyaltiesReportItem);

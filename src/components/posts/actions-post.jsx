import React, { Component } from "react";
import { connect } from "react-redux";
import * as configActions from "../../store/action/config";
import * as postActions from "../../store/action/post";
import * as _ from "lodash";
import localStorage from "../../utils/local-storage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ExampleCustomInput } from "./action/draft";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OverlayTrigger, Popover } from "react-bootstrap";
import RequireChecklist from "src/components/posts/tab/require-checklist";
import ScreenSize from "src/services/screenSize";
import { udpateLogPost } from "../../utils/common"
import moment from 'moment';
let clickingButton = false;
class ActionsPost extends Component {
  isMobile = false;
  constructor() {
    super();
    this.state = {
      valueInput: "",
      onHover: false,
      updateStatus: false,
      startDate: null,
      scheduledPost: false
    };

    this.isMobile = ScreenSize.isMobile;
  }

  componentDidMount() {
    if (this.props.scheduleDate) {
      this.setState({ scheduledPost: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { post: nextPost, listTab } = nextProps;
    const { listTab: prevListTab } = this.props;
    if (nextPost.updatePostStatus === 2 && this.state.updateStatus) {
      window.location.href = "/posts";
    }

    this.setState({ listTab });
  }

  confirmAction(dataUpdate) {

    const options = {
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => (
        <div className="custom-ui-alert">
          <h1>Bạn thực hiện thao tác?</h1>
          <div className="box">
            <div className="bg-d9534f" onClick={onClose}>
              Không, cần xem lại
            </div>
            <div
              className="bg-c7c6c5"
              onClick={() => {
                this.actionSendButton(dataUpdate);
                onClose();
              }}
            >
              Có, tiếp tục
            </div>
          </div>
        </div>
      ),
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => { },
      onClickOutside: () => { },
      onKeypressEscape: () => { }
    };

    confirmAlert(options);
  }

  actionBeforeConfirm(type) {
    const options = {
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => (
        <div className="custom-ui-alert">
          <h1>Bạn thực hiện thao tác?</h1>
          <div className="box">
            <div className="bg-d9534f" onClick={onClose}>
              Không, cần xem lại
            </div>
            <div
              className="bg-c7c6c5"
              onClick={() => {
                this.savePost(type);
                onClose();
              }}
            >
              Có, tiếp tục
            </div>
          </div>
        </div>
      ),
      closeOnEscape: false,
      closeOnClickOutside: false
    };

    confirmAlert(options);
  }

  savePost(status) {
    if (this.clickingButton) {
      return;
    }

    const _user = localStorage.get("_user");
    const {
      post: { currentPost },
      config: { listPosttyle }
    } = this.props;
    // macdinh la check condition
    let should_check_condition = "yes";
    //neu bai post da dang => co 2 action (go xuong  = waiting, bo rac = trash) => khong can xet dieu kien
    if (currentPost.posttype.type_code == "ready") {
      should_check_condition = "yes";
    }
    // neu bai post dang review => 1 action (tra bai viet = draft )=> khong can xet dieu kien
    // neu bai post dang review => 2 action (len lich, dang bai )=> can xet dieu kien
    if (currentPost.posttype.type_code == "waiting") {
      if (status == "draft") {
        should_check_condition = "no";
      }
      // if (status == "ready") {
      //   should_check_condition = "yes"
      // }
    }

    if (currentPost.posttype.type_code == "draft" && status == "draft") {
      this.clickingButton = false;
    } else {
      if(!currentPost.is_live){
        this.clickingButton = true;
      }
    }

    const posttype = _.find(listPosttyle, { type_code: status });
    const dataUpdate = {
      posttype: posttype,
      should_check_condition: should_check_condition
    };
    this.actionBeforeSendButton(dataUpdate);
    if (status == "draft") {
      toast.success("Đã lưu");
    }
  }

  setStartDate(date) {
    const {
      post: { currentPost },
      config: { listPosttyle }
    } = this.props;
    let should_check_condition = "yes";
    const posttype = _.find(listPosttyle, { type_code: "schedule" });
    if (date > new Date()) {
      const dataUpdate = {
        posttype: posttype,
        time: date,
        should_check_condition: should_check_condition
      };
      this.actionBeforeSendButton(dataUpdate);
    } else {
      toast.error("Chọn ngày lớn hơn hiện tại.");
    }
    this.setState({ startDate: date });
  }

  actionBeforeSendButton(dataUpdate) {
    if (dataUpdate.should_check_condition == "no") {
      this.confirmAction(dataUpdate);
    } else {
      // this.generateLogAction(dataUpdate);
      this.actionSendButton(dataUpdate);
    }
  }

  
  generateLogAction(posttype){
    // set action post
    const { post: { currentPost } } = this.props;

    let logAction = "";
    if(posttype.type_code == "draft"){
      if(currentPost.posttype.type_code == "draft"){
        logAction = udpateLogPost('lưu nháp');
      }else{
        logAction = udpateLogPost('hạ');
      }
    }
    if(posttype.type_code == "waiting"){
      logAction = udpateLogPost('gửi duyệt');
    }
    if(posttype.type_code == "schedule"){
      let scheduleTime = moment(currentPost.scheduleAt).format('HH:mm DD/MM/YYYY');
      logAction = udpateLogPost(`hẹn giờ ${scheduleTime}`);
    }
    if(posttype.type_code == "ready"){
      logAction = udpateLogPost('đăng');
    }
    if(posttype.type_code == "trash"){
      logAction = udpateLogPost('bỏ rác');
    }
    return logAction;
  }


  actionSendButton(dataUpdate) {
    dataUpdate.new_action = this.generateLogAction(dataUpdate.posttype);
    this.props.handleUpdateStatus(dataUpdate);
  }

  savePreviewPost = () => {
    const { post: { currentPost }, config: { listPosttyle } } = this.props;
    const dataUpdate = {
      posttype: currentPost.posttype.type_code,
      should_check_condition: 'yes'
    };


  }

  generateAction(status) {
    const _user = localStorage.get("_user");
    const { postdata, scheduleDate } = this.props;

    const canEdit = (postdata.permission && postdata.permission.can_edit) || true;
    // nhap thi bo rac dc
    // co publish thi bo rac
    // tra bai va bo rac ko check condition
    const isDraft = postdata.posttype.type_code === "draft";
    const goPreview = postdata.posttype.type_code === "draft";
    const canTakedown = _user.can_takedown || false;
    const canTrash = _user.can_publish || false;
    const canPublish = _user.can_publish || false;
    const canEditPublish = _user.can_edit_publish || false;
    const canReject = _user.can_reject || false;
    if (status == "draft") {
      return (
        <div className="action-div">
          {canPublish && this.props.condition && scheduleDate && (
            <button
              className={
                "btn btn-custom ml10 bg-f0ad4e " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("schedule")}
            >
              <i className="fas fa-calendar-day"></i>
              Lên lịch
            </button>
          )}
          {canPublish && this.props.condition && !scheduleDate && (
            <button
              className={
                "btn btn-custom ml10 bg-428bca " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("ready")}
            >
              <i className="fas fa-external-link-square-alt"></i>
              Đăng bài
            </button>
          )}
          {goPreview && this.props.condition && (
            <button
              className={
                "btn btn-custom ml10 bg-12BF6D " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("waiting")}
            >
              <i className="fas fa-paper-plane"></i>
              Gửi Duyệt
            </button>
          )}

          {isDraft && (
            <button
              className="btn btn-custom ml10 bg-FFA52A"
              onClick={() => this.savePost("draft")}
            >
              <i className="fas fa-save"></i>
              Lưu Nháp
            </button>
          )}
          {canTrash && (
            <button
              className="btn btn-custom ml10"
              onClick={() => this.actionBeforeConfirm("trash")}
            >
              Bỏ rác
            </button>
          )}

          {true && (
            <button className="btn btn-custom ml10 bg-17a2b8">
              <a
                onClick={this.savePreviewPost}
                href={`/preview/${postdata._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-eye"></i> Xem thử
              </a>
            </button>
          )}
        </div>
      );
    } else if (status == "waiting") {
      const dataUpdateTraBaiWaiting = {
        posttype: {
          type_code: "draft",
          _id: "5e80d4c7c38ec834dcbd98d2",
          title: "Nháp",
          color: "#ffffff",
          createdAt: "2020-03-29T17:03:03.004Z",
          updatedAt: "2020-03-29T17:03:03.004Z",
          __v: 0,
          id: "5e80d4c7c38ec834dcbd98d2",
          value: "5e80d4c7c38ec834dcbd98d2"
        }, should_check_condition: "no"
      }
      return (
        <div className="action-div">
          {canPublish && (
            <button
              className="btn btn-custom ml10 bg-d9534f"
              onClick={() => this.confirmAction(dataUpdateTraBaiWaiting)}
            >
              <i className="fas fa-times"></i>
              Trả bài
            </button>
          )}
          {canTrash && (
            <button
              className="btn btn-custom ml10"
              onClick={() => this.actionBeforeConfirm("trash")}
            >
              Bỏ rác
            </button>
          )}
          {canPublish && this.props.condition && scheduleDate && (
            <button
              className={
                "btn btn-custom ml10 bg-f0ad4e " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("schedule")}
            >
              <i className="fas fa-calendar-day"></i>
              Lên lịch
            </button>
          )}

          {(canPublish || canEdit) && (
            <button
              className={
                "btn btn-custom ml10 bg-428bca " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("waiting")}
            >
              <i className="fas fa-external-link-square-alt"></i>
              Lưu
            </button>
          )}

          {canPublish && this.props.condition && !scheduleDate && (
            <button
              className={
                "btn btn-custom ml10 bg-428bca " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("ready")}
            >
              <i className="fas fa-external-link-square-alt"></i>
              Đăng bài
            </button>
          )}
          {true && (
            <button className="btn btn-custom ml10 bg-17a2b8">
              <a
                onClick={this.savePreviewPost}
                href={`/preview/${postdata._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-eye"></i> Xem thử
              </a>
            </button>
          )}
        </div>
      );
    } else if (status == "ready") {
      return (
        <div className="action-div">
          {(canPublish || canEditPublish) && (
            <button
              className={
                "btn btn-custom ml10 bg-428bca " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("ready")}
            >
              <i className="fas fa-external-link-square-alt"></i>
              Lưu
            </button>
          )}
          {canTakedown && canPublish && (
            <button
              className="btn btn-custom ml10"
              onClick={() => this.savePost("draft")}
            >
              Gỡ xuống
            </button>
          )}
          {canTrash && (
            <button
              className="btn btn-custom ml10"
              onClick={() => this.actionBeforeConfirm("trash")}
            >
              Bỏ rác
            </button>
          )}
          {true && (
            <button className="btn btn-custom ml10 bg-17a2b8">
              <a
                onClick={this.savePreviewPost}
                href={`/preview/${postdata._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-eye"></i> Xem thử
              </a>
            </button>
          )}
        </div>
      );
    } else if (status == "schedule") {
      return (
        <div className="action-div">
          {canPublish && (
            <button
              className={
                "btn btn-custom ml10 bg-428bca " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("schedule")}
            >
              <i className="fas fa-external-link-square-alt"></i>
              Lưu
            </button>
          )}
          {canPublish && this.props.condition && !scheduleDate && (
            <button
              className={
                "btn btn-custom ml10 bg-428bca " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("ready")}
            >
              <i className="fas fa-external-link-square-alt"></i>
              Đăng bài
            </button>
          )}

          {canPublish && this.props.condition && scheduleDate && (
            <button
              className={
                "btn btn-custom ml10 bg-f0ad4e " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("schedule")}
            >
              <i className="fas fa-calendar-day"></i>
              Lên lịch
            </button>
          )}

          {canPublish && (
            <button
              className="btn btn-custom ml10 bg-d9534f"
              onClick={() => this.actionBeforeConfirm("draft")}
            >
              <i className="fas fa-times"></i>
              Trả bài
            </button>
          )}
          {true && (
            <button className="btn btn-custom ml10 bg-17a2b8">
              <a
                onClick={this.savePreviewPost}
                href={`/preview/${postdata._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-eye"></i> Xem thử
              </a>
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className="action-div">
          {/* {canPublish && (
            <button
              className="btn btn-custom ml10 bg-428bca"
              onClick={() => this.savePost("ready")}
            >
              <i className="fas fa-external-link-square-alt"></i>
              Đăng bài
            </button>
          )} */}
          {canReject && (
            <button
              className="btn btn-custom ml10 bg-d9534f"
              onClick={() => this.actionBeforeConfirm("draft")}
            >
              <i className="fas fa-times"></i>
              Trả bài
            </button>
          )}
          {goPreview && this.props.condition && this.props.condition && (
            <button
              className={
                "btn btn-custom ml10 bg-12BF6D " +
                (this.props.condition
                  ? "require-status-success"
                  : "require-status-error")
              }
              onClick={() => this.savePost("waiting")}
            >
              <i className="fas fa-paper-plane"></i>
              Gửi Duyệt
            </button>
          )}
          {isDraft && (
            <button
              className="btn btn-custom ml10 bg-FFA52A"
              onClick={() => this.savePost("draft")}
            >
              <i className="fas fa-save"></i>
              Lưu Nháp
            </button>
          )}
          {true && (
            <button className="btn btn-custom ml10 bg-17a2b8">
              <a
                onClick={this.savePreviewPost}
                href={`/preview/${postdata._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-eye"></i> Xem thử
              </a>
            </button>
          )}
        </div>
      );
    }
  }

  render() {
    const { postdata, layoutName, condition } = this.props;
    const { listTab } = this.state;
    const popover = (
      <Popover>
        <RequireChecklist listTab={listTab} layoutName={layoutName} />
        <div className="layout-mobile" style={{ marginTop: "-10px", width: "230px" }}>
          {!this.clickingButton &&
            this.generateAction(postdata.posttype.type_code)}
        </div>
      </Popover>
    );

    // console.log('listTab', listTab);
    const passCondition = _.filter(listTab, { error: false }).length;
    // console.log(passCondition === 9);

    return (
      <>
        {
          listTab &&
          <OverlayTrigger
            trigger="click"
            overlay={popover}
            placement="top"
            rootClose={true}
          >
            <button
              className={
                "btn btn-lg rounded-circle text-white fixed-bottom-right " +
                (passCondition === 11 ? "bg-success" : "bg-FFA52A")
              }
              style={{
                width: "50px",
                height: "50px"
              }}
            >
              <i className="fas fa-save"></i>
            </button>
          </OverlayTrigger>
        }

      </>
    );
  }
}
export default connect(
  store => {
    return {
      post: store.post,
      config: store.config
    };
  },
  dispatch => {
    return {};
  }
)(ActionsPost);

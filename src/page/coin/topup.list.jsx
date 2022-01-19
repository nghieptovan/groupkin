import React, { Component } from "react";
import { connect } from "react-redux";
import * as coinActions from "../../store/action/coin";
import Link from "src/components/link";
import PaymentItem from "../../components/payment/item";
import Select from "react-select";
import * as _ from "lodash";
import localStorage from "../../utils/local-storage";
import Input from "../../components/input/Input";
import { filtersToUlr } from "../../utils/post-filter";
import '../posts/post.scss';
import Pagination from "react-js-pagination"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from './../../utils/moment-range';
import slug from 'slug'
// import { addNPlayer, emitLockToAllUsers } from '../../Api'
import { toast } from 'react-toastify'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import HeaderMobileComponent from "src/components/layout/header-mobile";


const initialStart = moment().startOf('day');
const initialEnd = moment().endOf('day');

class TopupList extends Component {
  isMobile = false;
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      filters: {
        start_date: {
          fieldName: "start_date",
          value: initialStart.format()
        },
        end_date: {
          fieldName: "end_date",
          value: initialEnd.format()
        }
      },
      topups: [],
      totalTopup: -1,
      date: [initialStart.format(),initialEnd.format()],
      totalItemCount: 0,
      update: 'no',
      showSuggestTagsOnMobile: false
    };

    this.handleOnFocus = this.handleOnFocus.bind(this)
  }

  componentDidMount() {
    const { user, router } = this.props;
    
    let filters = this.getFiltersFromQuery(router.location.query);
   

    this.props.getListTopup(filters);
    
    window.addEventListener('resize', this.chooseLayout);
    this.chooseLayout();
  }

  
  UNSAFE_componentWillReceiveProps(nextProps) {
      if (!_.isEqual(this.props.payments.sort(), nextProps.payments.sort()) || !_.isEqual(this.props.totalPayment, nextProps.totalPayment)) {
        if (JSON.stringify(this.state.payments) != JSON.stringify(nextProps.payments) || !_.isEqual(this.props.totalPayment, nextProps.totalPayment)) {
        let paymentSet = _.sortBy(nextProps.payments, [(o) => { return !o.trans_dts; }]);
        this.setState({
          payments: paymentSet,
          totalPayment: nextProps.totalPayment
        }, () => {
          // this.getViewPublicPosts(this.state.posts);
        });
      }
    }
  }


  componentWillUnmount() {
    this.setState({ payments: [] })
  }

  addFilter(filter, value, execute = true) {
    let filters = this.resetFilters(filter);
    filters[filter].value = value;
    this.setState(
      {
        filters: filters,
        payments: []
      },
      () => {
        // update filter and execute immediately
        if (execute) {
          let queryString = filtersToUlr(this.state.filters);

          if (queryString != "") {
            queryString = queryString.substr(1, queryString.length - 1);
            this.props.history.push(`/coin/topup?${queryString}`);
          } 
          else {
            this.props.history.push(`/coin/topup`);
          }
          this.props.getListTopup(this.state.filters);
        }

      }
    );
  }

  resetFilters(filter) {
    let { filters } = this.state;

    return filters;
  }


  onChangeDate = dateChange => {

    let start_date = "";
    let end_date = "";
    if(!dateChange)
    {
      dateChange = [initialStart.format(),initialEnd.format()];
    }

    this.setState({ date : dateChange })
    start_date = moment(dateChange[0]).format();
    end_date = moment(dateChange[1]).format();

    this.addFilter("start_date", start_date, false);
    this.addFilter("end_date", end_date, true);
    
  }

  chooseLayout() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
  handleOnFocus(value) {
    if (this.isMobile) {
      this.setState({ showSuggestTagsOnMobile: value });
    }
  }

  handleShowList = value => {
    this.setState({ showSuggestTagsOnMobile: value });
  }


  getFiltersFromQuery(query) {
    let filtersQuery = {};
    let { filters } = this.state;

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        if (value && value != "") {
          filtersQuery[key] = {
            ...this.state.filters[key],
            value: value
          };
        }
      }
    }
    filters = _.merge(filters, filtersQuery);
    this.setState({ filters });
    return filters;
  }

  getSelectedItemOfDate() {
    let { date } = this.state
    if (this.state.filters.start_date.value !== "" && this.state.filters.end_date.value !== "") {
      date = [moment(this.state.filters.start_date.value).format(), moment(this.state.filters.end_date.value).format()]
    }
    return date;
  }


  render() {
    const _user = localStorage.get("_user");
    const { payment_types = [], totalPayment, date, payment_type, payments = [] } = this.state;
    return (
      <div className={"content-wrapper post-list-container" + (this.isMobile ? ' mobile' : '')}>
        <section className="content-header">
          <div className="container-fluid">

            <HeaderMobileComponent showList={this.handleShowList} />

            <div className="row mx-2 mb-2">
   
              <div className="col-12 col-lg-2 my-2">
                <DateRangePicker
                  onChange={this.onChangeDate}
                  value={this.getSelectedItemOfDate()}
                  calendarIcon={<i className="far fa-calendar-alt"></i>}
                  maxDate={new Date()}
                  className="bg-white"
                />
              </div>
            </div>


          </div>
        </section>

        {/* Post List */}
        <section className={"content" + (this.isMobile ? ' list-mobile' : '')}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-default color-palette-box">

                  {/* Post List */}
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover">
                      {!this.isMobile ? (
                        <thead >
                          <tr>
                            <th>Req No</th>
                            <th>Lotte TransNo</th>
                            <th>Settle Amount</th>
                            <th>Partner Ref</th>
                            <th>Seats</th>
                            <th>Cinema ID</th>                           
                            <th>Username</th>
                            <th>Phone number</th>
                            <th className="ipad-dis-none">Email</th>
                            <th className="user ipad-dis-none">Note</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                      ) : (<thead></thead>)}
                      <tbody>
                        {payments.length > 0 ? (
                          payments.map((post, idx) => {
                            return (
                              <PaymentItem
                                item={post}
                                payment_type={payment_type}
                                key={`post-${idx}`}
                                idx={`post-${idx}`}
                              />
                            );
                          })
                        ) : (
                            <tr className="odd" style={{ height: "500px", position: 'relative', backgroundColor: "unset" }}>
                              <td
                                valign="top"
                                colSpan="8"
                                className="dataTables_empty text-center"
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  width: '100%',
                                  borderTop: '0'
                                }}
                              >
                                {
                                  totalPayment == 0 ? (<p>No item found.</p>) : (
                                    <>
                                    <Spinner animation="grow" variant="primary" />
                                    <Spinner animation="grow" variant="secondary" />
                                    <Spinner animation="grow" variant="success" />
                                    <Spinner animation="grow" variant="danger" />
                                    <Spinner animation="grow" variant="warning" />
                                    <Spinner animation="grow" variant="info" />
                                    <Spinner animation="grow" variant="light" />
                                    <Spinner animation="grow" variant="dark" />
                                    </>
                                  )
                                }
                                
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* {this.state.totalPayment > 0 &&
              <div className="row">
                <div className="col-sm-12 col-md-7">
                  <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                    <Pagination
                      activePage={parseInt(this.state.filters.page.value)}
                      itemsCountPerPage={parseInt(this.state.filters.limit.value)}
                      totalItemsCount={parseInt(this.state.totalItemCount)}
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
            } */}

          </div>
        </section>

        <a href="/posts/new" className="dis-none mobi-dis-block">
          <button type="button" className="btn btn-lg rounded-circle bg-saostar fixed-bottom-right"><i className="fas fa-plus"></i></button>
        </a>
      </div >
    );
  }

  

}

export default connect(store => {
  return {
    profile: store.loginInfo.userInfo,
    router: store.router,
    topup: store.payment.listPayemnt,
    topupTopup: store.payment.totalPayment
  };
}, dispatch => {
  return {
    getListTopup: (value) => { dispatch(coinActions.getListTopup(value)) },
  }
})(TopupList)


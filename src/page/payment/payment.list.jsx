import React, { Component } from "react";
import { connect } from "react-redux";
import * as paymentActions from "../../store/action/payment";
import Link from "src/components/link";
import PaymentItem from "../../components/payment/item";
import Select from "react-select";
import * as _ from "lodash";
import localStorage from "../../utils/local-storage";
import Input from "../../components/input/Input";
import { filtersToUlr, queryStringToObject } from "../../utils/post-filter";
import Pagination from "react-js-pagination"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from './../../utils/moment-range';
import { toast } from 'react-toastify'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import HeaderMobileComponent from "src/components/layout/header-mobile";
import Loading from '../../components/loading';
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const paymentTypes = [
  { value: '10179', label: 'Momo API', code: 'momoapi', selected: false },
  { value: '10180', label: 'Shopee API', code: 'shopeeapi', selected: false },
  { value: '10213', label: 'TIX API', code: 'tixeapi', selected: false },
];
const initialStart = moment(new Date()).startOf('day').format();
const initialEnd = moment(new Date()).endOf('day').format();

class PaymentList extends Component {
  isMobile = false;
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      filters: {       
        settle_code: {
          fieldName: "settle_code",
          value: "10179"
        },
        start_date: {
          fieldName: "start_date",
          value: initialStart
        },
        end_date: {
          fieldName: "end_date",
          value: initialEnd
        },
        page: {
          fieldName: "page",
          value: "1"
        },
        total: {
          fieldName: "total",
          value: "20"
        },
        aprv_no: {
          fieldName: "aprv_no",
          value: "0"
        }
      },
      payments: [],
      reports: [],
      totalPayment: -1,
      currentDate: [initialStart,initialEnd],
      totalItemCount: 0,
      payment_types: paymentTypes,
      payment_type: paymentTypes[0],
      update: 'no',
      showSuggestTagsOnMobile: false
    };

    this.handleOnFocus = this.handleOnFocus.bind(this)
  }

  componentDidMount() {
    const { user, router } = this.props;
    let {payment_type, payment_types} = this.state;      

    let filters = this.getFiltersFromQuery(router.location.query);
    payment_type = payment_types.find(
      item => item.value == filters.settle_code.value
    );
    this.setState({payment_type, currentDate: [ moment(filters.start_date.value).startOf('day').format(), moment(filters.end_date.value).startOf('day').format()]});
    this.getListPayment(filters);  

    window.addEventListener('resize', this.chooseLayout);
    this.chooseLayout();
  }

  getListPayment(filters){
    // change query string to object
    let objectPost = queryStringToObject(filters);
    this.props.getListPayment(objectPost);
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
            this.props.history.push(`/payment?${queryString}`);
          } 
          else {
            this.props.history.push(`/payment`);
          }
          this.getListPayment(filters);
        }

      }
    );
  }

  resetFilters(filter) {
    let { filters } = this.state;
    // console.log(filters);
    // if (filter == "aprv_no") {
    //   for (const key in filters) {
    //     if (filters.hasOwnProperty(key)) {
    //       filters[key].value = "";
    //     }
    //   }
    // } else {
    //   filters.page.value = 1;
    //   filters.aprv_no.value = "0";
    // }
    // console.log(filters);
    return filters;
  }

  // date handle

  onChangeDate = dateChange => {
    if(!dateChange || !dateChange[0] || !dateChange[1])
    {
      dateChange = [
        initialStart,
        initialEnd
      ];
    }
    this.setState({ currentDate : dateChange }, () => {

      this.addFilter("start_date", moment(dateChange[0]).startOf('day').format(), false);
      this.addFilter("end_date", moment(dateChange[1]).endOf('day').format(), false);
      this.addFilter("aprv_no", "0", true);
    })  
    
    
  }

  getSelectedItemOfDate() {
    
    let {currentDate, filters} = this.state;
    if (!filters.start_date.value || !filters.end_date.value) {
      currentDate = [
        moment(this.state.filters.start_date.value).format(), 
        moment(this.state.filters.end_date.value).format()
      ]
    }
    return currentDate;
  }
  // end date handle

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

  handleInputChange = (inputValue) => {
    if (inputValue && inputValue.length >= 3) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let filters = {
          label: {
            fieldName: "label_contains",
            value: inputValue
          },
        }
        this.props.getPennames(filters);
      }, 1000);
    }

  };

  handlePageChange = (pageNumber) => {
    this.addFilter('page', pageNumber);
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
    this.getSelectedItemOfDate();
    this.setState({ filters });
    return filters;
  }

 
  selectedFilterPaymentType = selected => {
    let {payment_type, payment_types} = this.state;  

    let v = selected.value;
    payment_type = payment_types.find(
      item => item.value == v
    );
    this.setState({payment_type});
    this.addFilter("aprv_no", "0", false);
    this.addFilter("settle_code", v);   
    
  };

  getSelectedItemOfPaymentType() {    
    if (this.state.filters.settle_code.value == "") {
      return this.state.payment_types.length > 0 && this.state.payment_types[0];
    }
    let payment_type = this.state.payment_types.find(
      item => item.value == this.state.filters.settle_code.value
    );
    return payment_type;
  }



  searchPayment(keyword) {
    this.addFilter("aprv_no", keyword);
  }

  render() {
    const _user = localStorage.get("_user");
    const { payment_types = [], totalPayment, payment_type, payments = [], currentDate } = this.state;  
    return (
      <div className={"content-wrapper post-list-container" + (this.isMobile ? ' mobile' : '')}>
        <section className="content-header">
          <div className="container-fluid">

            <HeaderMobileComponent showList={this.handleShowList} />

            <div className="row mb-2">
              <div className="col-6 col-lg-2 my-2">
                <Select
                  value={this.getSelectedItemOfPaymentType()}
                  options={payment_types}
                  placeholder="Chọn loại payment"
                  onChange={this.selectedFilterPaymentType}
                />
              </div>

              <div className="col-12 col-lg-2 my-2">
                <DateRangePicker
                  onChange={this.onChangeDate}
                  value={currentDate}
                  calendarIcon={<i className="far fa-calendar-alt"></i>}
                  maxDate={new Date()}
                  className="bg-white"
                />
              </div>
              <div className="col-12 col-lg-2 my-2">
                <Input
                  icon="search"
                  placeholder="Tìm kiếm"
                  value={this.state.filters.aprv_no.value}
                  onSubmit={value => {
                    this.searchPayment(value);
                  }}
                />
              </div>
              <div className="col-12 col-lg-2 my-2">
                <ExcelFile element={<button className="btn btn-success btn-block">Export Excel</button>}>
                  <ExcelSheet data={payments} name={payment_type.label}>
                      <ExcelColumn label="Booking No" value="booking_no"/>
                      <ExcelColumn label="Lotte Trans" value="trans_no"/>
                      <ExcelColumn label={payment_type.label + ` Trans`} value="partner_id"/>
                      <ExcelColumn label="Total Amount" value="total_amount"/>                    
                      <ExcelColumn label="Seats" value={(col) => col.detail.seats}/>
                      <ExcelColumn label="Film" value="film_name"/>
                      <ExcelColumn label="Trans Date" value="trans_dts"/>
                      <ExcelColumn label="Phone Number" value={(col) => col.detail.user_phone}/>                    
                      <ExcelColumn label="Cinema ID" value="cinema_id"/>                   
                  </ExcelSheet>
                </ExcelFile>
            
              </div>


            </div>
           

          </div>
        </section>
        

        
        {/* Payment List */}
        <section className={"content" + (this.isMobile ? ' list-mobile' : '')}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-default color-palette-box">

                  {/* Payment List */}
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover">
                      {!this.isMobile ? (
                        <thead >
                          <tr>
                            <th>Req No</th>
                            <th>Lotte TransNo</th>
                            <th>Partner Ref</th>
                            <th>Settle Amount</th>
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
                                  totalPayment == 0 ? (<p>No item found.</p>) :  (
                                   <Loading />
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
            {totalPayment > 0 &&
              <div className="row">
                <div className="col-sm-12 col-md-7">
                  <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                    <Pagination
                      activePage={parseInt(this.state.filters.page.value)}
                      itemsCountPerPage={parseInt(this.state.filters.total.value)}
                      totalItemsCount={totalPayment}
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
            }

          </div>
        </section>

      </div >
    );
  }

  

}

export default connect(store => {
  return {
    profile: store.loginInfo.userInfo,
    router: store.router,
    payments: store.payment.listPayemnt,
    totalPayment: store.payment.totalPayment
  };
}, dispatch => {
  return {
    getListPayment: (value) => { dispatch(paymentActions.getListPayment(value)) },
  }
})(PaymentList)


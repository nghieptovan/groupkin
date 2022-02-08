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
import moment from '../../utils/moment-range';
import { toast } from 'react-toastify'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ReactExport from "react-export-excel";
const paymentTypes = [
  { value: '10179', label: 'Momo API', code: 'momoapi', selected: false },
  { value: '10180', label: 'Shopee API', code: 'shopeeapi', selected: false },
  { value: '10213', label: 'TIX API', code: 'tixeapi', selected: false },
];
const initialStart = moment(new Date()).startOf('day').format();
const initialEnd = moment(new Date()).endOf('day').format();

class InvestorList extends Component {
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
    //   htmlFor (const key in filters) {
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
      <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
          <div className="post d-flex flex-column-fluid" id="kt_post">
							{/*<!--begin::Container-->*/}
							<div id="kt_content_container" className="container-xxl">
								{/*<!--begin::Card-->*/}
								<div className="card">
									{/*<!--begin::Card header-->*/}
									<div className="card-header border-0 pt-6">
										{/*<!--begin::Card title-->*/}
										<div className="card-title">
											{/*<!--begin::Search-->*/}
											<div className="d-flex align-items-center position-relative my-1">
												{/*<!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->*/}
												<span className="svg-icon svg-icon-1 position-absolute ms-6">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
														<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
														<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
													</svg>
												</span>
												{/*<!--end::Svg Icon-->*/}
												<input type="text" data-kt-user-table-filter="search" className="form-control form-control-solid w-250px ps-14" placeholder="Search user" />
											</div>
											{/*<!--end::Search-->*/}
										</div>
										{/*<!--begin::Card title-->*/}
										{/*<!--begin::Card toolbar-->*/}
										<div className="card-toolbar">
											{/*<!--begin::Toolbar-->*/}
											<div className="d-flex justify-content-end" data-kt-user-table-toolbar="base">
												{/*<!--begin::Filter-->*/}
												<button type="button" className="btn btn-light-primary me-3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
												{/*<!--begin::Svg Icon | path: icons/duotune/general/gen031.svg-->*/}
												<span className="svg-icon svg-icon-2">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
														<path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="black"></path>
													</svg>
												</span>
												{/*<!--end::Svg Icon-->*/}Filter</button>
												{/*<!--begin::Menu 1-->*/}
												<div className="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true" >
													{/*<!--begin::Header-->*/}
													<div className="px-7 py-5">
														<div className="fs-5 text-dark fw-bolder">Filter Options</div>
													</div>
													{/*<!--end::Header-->*/}
													{/*<!--begin::Separator-->*/}
													<div className="separator border-gray-200"></div>
													{/*<!--end::Separator-->*/}
													{/*<!--begin::Content-->*/}
													<div className="px-7 py-5" data-kt-user-table-filter="form">
														{/*<!--begin::Input group-->*/}
														<div className="mb-10">
															<label className="form-label fs-6 fw-bold">Role:</label>
															<select className="form-select form-select-solid fw-bolder select2-hidden-accessible" data-kt-select2="true" data-placeholder="Select option" data-allow-clear="true" data-kt-user-table-filter="role" data-hide-search="true" data-select2-id="select2-data-10-3n0l" tabIndex="-1" aria-hidden="true">
																<option data-select2-id="select2-data-12-7ppq"></option>
																<option value="Administrator">Administrator</option>
																<option value="Analyst">Analyst</option>
																<option value="Developer">Developer</option>
																<option value="Support">Support</option>
																<option value="Trial">Trial</option>
															</select><span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-11-5mce" style={{width: '100%'}}><span className="selection"><span className="select2-selection select2-selection--single form-select form-select-solid fw-bolder" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-0hxz-container" aria-controls="select2-0hxz-container"><span className="select2-selection__rendered" id="select2-0hxz-container" role="textbox" aria-readonly="true" title="Select option"><span className="select2-selection__placeholder">Select option</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
														</div>
														{/*<!--end::Input group-->*/}
														{/*<!--begin::Input group-->*/}
														<div className="mb-10">
															<label className="form-label fs-6 fw-bold">Two Step Verification:</label>
															<select className="form-select form-select-solid fw-bolder select2-hidden-accessible" data-kt-select2="true" data-placeholder="Select option" data-allow-clear="true" data-kt-user-table-filter="two-step" data-hide-search="true" data-select2-id="select2-data-13-odrb" tabIndex="-1" aria-hidden="true">
																<option data-select2-id="select2-data-15-v3zf"></option>
																<option value="Enabled">Enabled</option>
															</select><span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-14-wj9j" style={{width: '100%'}}><span className="selection"><span className="select2-selection select2-selection--single form-select form-select-solid fw-bolder" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-898z-container" aria-controls="select2-898z-container"><span className="select2-selection__rendered" id="select2-898z-container" role="textbox" aria-readonly="true" title="Select option"><span className="select2-selection__placeholder">Select option</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
														</div>
														{/*<!--end::Input group-->*/}
														{/*<!--begin::Actions-->*/}
														<div className="d-flex justify-content-end">
															<button type="reset" className="btn btn-light btn-active-light-primary fw-bold me-2 px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="reset">Reset</button>
															<button type="submit" className="btn btn-primary fw-bold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">Apply</button>
														</div>
														{/*<!--end::Actions-->*/}
													</div>
													{/*<!--end::Content-->*/}
												</div>
												{/*<!--end::Menu 1-->*/}
												{/*<!--end::Filter-->*/}
												{/*<!--begin::Export-->*/}
												<button type="button" className="btn btn-light-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_export_users">
												{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr078.svg-->*/}
												<span className="svg-icon svg-icon-2">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
														<rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="black"></rect>
														<path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="black"></path>
														<path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4"></path>
													</svg>
												</span>
												{/*<!--end::Svg Icon-->*/}Export</button>
												{/*<!--end::Export-->*/}
												{/*<!--begin::Add user-->*/}
												<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_user">
												{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->*/}
												<span className="svg-icon svg-icon-2">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
														<rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="black"></rect>
														<rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="black"></rect>
													</svg>
												</span>
												{/*<!--end::Svg Icon-->*/}Add User</button>
												{/*<!--end::Add user-->*/}
											</div>
											{/*<!--end::Toolbar-->*/}
											{/*<!--begin::Group actions-->*/}
											<div className="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
												<div className="fw-bolder me-5">
												<span className="me-2" data-kt-user-table-select="selected_count"></span>Selected</div>
												<button type="button" className="btn btn-danger" data-kt-user-table-select="delete_selected">Delete Selected</button>
											</div>
											{/*<!--end::Group actions-->*/}
											{/*<!--begin::Modal - Adjust Balance-->*/}
											<div className="modal fade" id="kt_modal_export_users" tabIndex="-1" aria-hidden="true">
												{/*<!--begin::Modal dialog-->*/}
												<div className="modal-dialog modal-dialog-centered mw-650px">
													{/*<!--begin::Modal content-->*/}
													<div className="modal-content">
														{/*<!--begin::Modal header-->*/}
														<div className="modal-header">
															{/*<!--begin::Modal title-->*/}
															<h2 className="fw-bolder">Export Users</h2>
															{/*<!--end::Modal title-->*/}
															{/*<!--begin::Close-->*/}
															<div className="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
																{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->*/}
																<span className="svg-icon svg-icon-1">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																		<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
																		<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
																	</svg>
																</span>
																{/*<!--end::Svg Icon-->*/}
															</div>
															{/*<!--end::Close-->*/}
														</div>
														{/*<!--end::Modal header-->*/}
														{/*<!--begin::Modal body-->*/}
														<div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
															{/*<!--begin::Form-->*/}
															<form id="kt_modal_export_users_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
																{/*<!--begin::Input group-->*/}
																<div className="fv-row mb-10">
																	{/*<!--begin::Label-->*/}
																	<label className="fs-6 fw-bold form-label mb-2">Select Roles:</label>
																	{/*<!--end::Label-->*/}
																	{/*<!--begin::Input-->*/}
																	<select name="role" data-control="select2" data-placeholder="Select a role" data-hide-search="true" className="form-select form-select-solid fw-bolder select2-hidden-accessible" data-select2-id="select2-data-16-erzp" tabIndex="-1" aria-hidden="true">
																		<option data-select2-id="select2-data-18-uww4"></option>
																		<option value="Administrator">Administrator</option>
																		<option value="Analyst">Analyst</option>
																		<option value="Developer">Developer</option>
																		<option value="Support">Support</option>
																		<option value="Trial">Trial</option>
																	</select><span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-17-8p74" style={{width: '100%'}}><span className="selection"><span className="select2-selection select2-selection--single form-select form-select-solid fw-bolder" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-role-6c-container" aria-controls="select2-role-6c-container"><span className="select2-selection__rendered" id="select2-role-6c-container" role="textbox" aria-readonly="true" title="Select a role"><span className="select2-selection__placeholder">Select a role</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
																	{/*<!--end::Input-->*/}
																</div>
																{/*<!--end::Input group-->*/}
																{/*<!--begin::Input group-->*/}
																<div className="fv-row mb-10 fv-plugins-icon-container">
																	{/*<!--begin::Label-->*/}
																	<label className="required fs-6 fw-bold form-label mb-2">Select Export Format:</label>
																	{/*<!--end::Label-->*/}
																	{/*<!--begin::Input-->*/}
																	<select name="format" data-control="select2" data-placeholder="Select a format" data-hide-search="true" className="form-select form-select-solid fw-bolder select2-hidden-accessible" data-select2-id="select2-data-19-7jaa" tabIndex="-1" aria-hidden="true">
																		<option data-select2-id="select2-data-21-ordu"></option>
																		<option value="excel">Excel</option>
																		<option value="pdf">PDF</option>
																		<option value="cvs">CVS</option>
																		<option value="zip">ZIP</option>
																	</select><span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-20-6sqb" style={{width: '100%'}}><span className="selection"><span className="select2-selection select2-selection--single form-select form-select-solid fw-bolder" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-format-af-container" aria-controls="select2-format-af-container"><span className="select2-selection__rendered" id="select2-format-af-container" role="textbox" aria-readonly="true" title="Select a format"><span className="select2-selection__placeholder">Select a format</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
																	{/*<!--end::Input-->*/}
																<div className="fv-plugins-message-container invalid-feedback"></div></div>
																{/*<!--end::Input group-->*/}
																{/*<!--begin::Actions-->*/}
																<div className="text-center">
																	<button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">Discard</button>
																	<button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
																		<span className="indicator-label">Submit</span>
																		<span className="indicator-progress">Please wait...
																		<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
																	</button>
																</div>
																{/*<!--end::Actions-->*/}
															<div></div></form>
															{/*<!--end::Form-->*/}
														</div>
														{/*<!--end::Modal body-->*/}
													</div>
													{/*<!--end::Modal content-->*/}
												</div>
												{/*<!--end::Modal dialog-->*/}
											</div>
											{/*<!--end::Modal - New Card-->*/}
											{/*<!--begin::Modal - Add task-->*/}
											<div className="modal fade" id="kt_modal_add_user" tabIndex="-1" aria-hidden="true">
												{/*<!--begin::Modal dialog-->*/}
												<div className="modal-dialog modal-dialog-centered mw-650px">
													{/*<!--begin::Modal content-->*/}
													<div className="modal-content">
														{/*<!--begin::Modal header-->*/}
														<div className="modal-header" id="kt_modal_add_user_header">
															{/*<!--begin::Modal title-->*/}
															<h2 className="fw-bolder">Add User</h2>
															{/*<!--end::Modal title-->*/}
															{/*<!--begin::Close-->*/}
															<div className="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
																{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->*/}
																<span className="svg-icon svg-icon-1">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																		<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
																		<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
																	</svg>
																</span>
																{/*<!--end::Svg Icon-->*/}
															</div>
															{/*<!--end::Close-->*/}
														</div>
														{/*<!--end::Modal header-->*/}
														{/*<!--begin::Modal body-->*/}
														<div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
															{/*<!--begin::Form-->*/}
															<form id="kt_modal_add_user_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
																{/*<!--begin::Scroll-->*/}
																<div className="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px" style={{maxHeight: '637px%'}}>
																	{/*<!--begin::Input group-->*/}
																	<div className="fv-row mb-7">
																		{/*<!--begin::Label-->*/}
																		<label className="d-block fw-bold fs-6 mb-5">Avatar</label>
																		{/*<!--end::Label-->*/}
																		{/*<!--begin::Image input-->*/}
																		<div className="image-input image-input-outline" data-kt-image-input="true"  style={{backgroundImage: 'assets/media/avatars/blank.pn'}}>
																			{/*<!--begin::Preview existing avatar-->*/}
																			<div className="image-input-wrapper w-125px h-125px" style={{backgroundImage: 'assets/media/avatars/150-1.jpg'}}></div>
																			{/*<!--end::Preview existing avatar-->*/}
																			{/*<!--begin::Label-->*/}
																			<label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="" data-bs-original-title="Change avatar">
																				<i className="bi bi-pencil-fill fs-7"></i>
																				{/*<!--begin::Inputs-->*/}
																				<input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
																				<input type="hidden" name="avatar_remove" />
																				{/*<!--end::Inputs-->*/}
																			</label>
																			{/*<!--end::Label-->*/}
																			{/*<!--begin::Cancel-->*/}
																			<span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="" data-bs-original-title="Cancel avatar">
																				<i className="bi bi-x fs-2"></i>
																			</span>
																			{/*<!--end::Cancel-->*/}
																			{/*<!--begin::Remove-->*/}
																			<span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="" data-bs-original-title="Remove avatar">
																				<i className="bi bi-x fs-2"></i>
																			</span>
																			{/*<!--end::Remove-->*/}
																		</div>
																		{/*<!--end::Image input-->*/}
																		{/*<!--begin::Hint-->*/}
																		<div className="form-text">Allowed file types: png, jpg, jpeg.</div>
																		{/*<!--end::Hint-->*/}
																	</div>
																	{/*<!--end::Input group-->*/}
																	{/*<!--begin::Input group-->*/}
																	<div className="fv-row mb-7 fv-plugins-icon-container">
																		{/*<!--begin::Label-->*/}
																		<label className="required fw-bold fs-6 mb-2">Full Name</label>
																		{/*<!--end::Label-->*/}
																		{/*<!--begin::Input-->*/}
																		<input type="text" name="user_name" className="form-control form-control-solid mb-3 mb-lg-0" placeholder="Full name" value="Emma Smith" />
																		{/*<!--end::Input-->*/}
																	<div className="fv-plugins-message-container invalid-feedback"></div></div>
																	{/*<!--end::Input group-->*/}
																	{/*<!--begin::Input group-->*/}
																	<div className="fv-row mb-7 fv-plugins-icon-container">
																		{/*<!--begin::Label-->*/}
																		<label className="required fw-bold fs-6 mb-2">Email</label>
																		{/*<!--end::Label-->*/}
																		{/*<!--begin::Input-->*/}
																		<input type="email" name="user_email" className="form-control form-control-solid mb-3 mb-lg-0" placeholder="example@domain.com" value="e.smith@kpmg.com.au" />
																		{/*<!--end::Input-->*/}
																	<div className="fv-plugins-message-container invalid-feedback"></div></div>
																	{/*<!--end::Input group-->*/}
																	{/*<!--begin::Input group-->*/}
																	<div className="mb-7">
																		{/*<!--begin::Label-->*/}
																		<label className="required fw-bold fs-6 mb-5">Role</label>
																		{/*<!--end::Label-->*/}
																		{/*<!--begin::Roles-->*/}
																		{/*<!--begin::Input row-->*/}
																		<div className="d-flex fv-row">
																			{/*<!--begin::Radio-->*/}
																			<div className="form-check form-check-custom form-check-solid">
																				{/*<!--begin::Input-->*/}
																				<input className="form-check-input me-3" name="user_role" type="radio" value="0" id="kt_modal_update_role_option_0" checked="checked" />
																				{/*<!--end::Input-->*/}
																				{/*<!--begin::Label-->*/}
																				<label className="form-check-label" htmlFor="kt_modal_update_role_option_0">
																					<div className="fw-bolder text-gray-800">Administrator</div>
																					<div className="text-gray-600">Best htmlFor business owners and company administrators</div>
																				</label>
																				{/*<!--end::Label-->*/}
																			</div>
																			{/*<!--end::Radio-->*/}
																		</div>
																		{/*<!--end::Input row-->*/}
																		<div className="separator separator-dashed my-5"></div>
																		{/*<!--begin::Input row-->*/}
																		<div className="d-flex fv-row">
																			{/*<!--begin::Radio-->*/}
																			<div className="form-check form-check-custom form-check-solid">
																				{/*<!--begin::Input-->*/}
																				<input className="form-check-input me-3" name="user_role" type="radio" value="1" id="kt_modal_update_role_option_1" />
																				{/*<!--end::Input-->*/}
																				{/*<!--begin::Label-->*/}
																				<label className="form-check-label" htmlFor="kt_modal_update_role_option_1">
																					<div className="fw-bolder text-gray-800">Developer</div>
																					<div className="text-gray-600">Best htmlFor developers or people primarily using the API</div>
																				</label>
																				{/*<!--end::Label-->*/}
																			</div>
																			{/*<!--end::Radio-->*/}
																		</div>
																		{/*<!--end::Input row-->*/}
																		<div className="separator separator-dashed my-5"></div>
																		{/*<!--begin::Input row-->*/}
																		<div className="d-flex fv-row">
																			{/*<!--begin::Radio-->*/}
																			<div className="form-check form-check-custom form-check-solid">
																				{/*<!--begin::Input-->*/}
																				<input className="form-check-input me-3" name="user_role" type="radio" value="2" id="kt_modal_update_role_option_2" />
																				{/*<!--end::Input-->*/}
																				{/*<!--begin::Label-->*/}
																				<label className="form-check-label" htmlFor="kt_modal_update_role_option_2">
																					<div className="fw-bolder text-gray-800">Analyst</div>
																					<div className="text-gray-600">Best htmlFor people who need full access to analytics data, but don't need to update business settings</div>
																				</label>
																				{/*<!--end::Label-->*/}
																			</div>
																			{/*<!--end::Radio-->*/}
																		</div>
																		{/*<!--end::Input row-->*/}
																		<div className="separator separator-dashed my-5"></div>
																		{/*<!--begin::Input row-->*/}
																		<div className="d-flex fv-row">
																			{/*<!--begin::Radio-->*/}
																			<div className="form-check form-check-custom form-check-solid">
																				{/*<!--begin::Input-->*/}
																				<input className="form-check-input me-3" name="user_role" type="radio" value="3" id="kt_modal_update_role_option_3" />
																				{/*<!--end::Input-->*/}
																				{/*<!--begin::Label-->*/}
																				<label className="form-check-label" htmlFor="kt_modal_update_role_option_3">
																					<div className="fw-bolder text-gray-800">Support</div>
																					<div className="text-gray-600">Best htmlFor employees who regularly refund payments and respond to disputes</div>
																				</label>
																				{/*<!--end::Label-->*/}
																			</div>
																			{/*<!--end::Radio-->*/}
																		</div>
																		{/*<!--end::Input row-->*/}
																		<div className="separator separator-dashed my-5"></div>
																		{/*<!--begin::Input row-->*/}
																		<div className="d-flex fv-row">
																			{/*<!--begin::Radio-->*/}
																			<div className="form-check form-check-custom form-check-solid">
																				{/*<!--begin::Input-->*/}
																				<input className="form-check-input me-3" name="user_role" type="radio" value="4" id="kt_modal_update_role_option_4" />
																				{/*<!--end::Input-->*/}
																				{/*<!--begin::Label-->*/}
																				<label className="form-check-label" htmlFor="kt_modal_update_role_option_4">
																					<div className="fw-bolder text-gray-800">Trial</div>
																					<div className="text-gray-600">Best htmlFor people who need to preview content data, but don't need to make any updates</div>
																				</label>
																				{/*<!--end::Label-->*/}
																			</div>
																			{/*<!--end::Radio-->*/}
																		</div>
																		{/*<!--end::Input row-->*/}
																		{/*<!--end::Roles-->*/}
																	</div>
																	{/*<!--end::Input group-->*/}
																</div>
																{/*<!--end::Scroll-->*/}
																{/*<!--begin::Actions-->*/}
																<div className="text-center pt-15">
																	<button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">Discard</button>
																	<button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
																		<span className="indicator-label">Submit</span>
																		<span className="indicator-progress">Please wait...
																		<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
																	</button>
																</div>
																{/*<!--end::Actions-->*/}
															<div></div></form>
															{/*<!--end::Form-->*/}
														</div>
														{/*<!--end::Modal body-->*/}
													</div>
													{/*<!--end::Modal content-->*/}
												</div>
												{/*<!--end::Modal dialog-->*/}
											</div>
											{/*<!--end::Modal - Add task-->*/}
										</div>
										{/*<!--end::Card toolbar-->*/}
									</div>
									{/*<!--end::Card header-->*/}
									{/*<!--begin::Card body-->*/}
									<div className="card-body pt-0">
										{/*<!--begin::Table-->*/}
										<div id="kt_table_users_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="table-responsive"><table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="kt_table_users">
											{/*<!--begin::Table head-->*/}
											<thead>
												{/*<!--begin::Table row-->*/}
												<tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0"><th className="w-10px pe-2 sorting_disabled" rowSpan="1" colSpan="1" aria-label="" style={{width: '29.25px'}}>
														<div className="form-check form-check-sm form-check-custom form-check-solid me-3">
															<input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_users .form-check-input" value="1" />
														</div>
													</th><th className="min-w-125px sorting" tabIndex="0" aria-controls="kt_table_users" rowSpan="1" colSpan="1" aria-label="User: activate to sort column ascending" style={{width: '256.344px'}}>User</th><th className="min-w-125px sorting" tabIndex="0" aria-controls="kt_table_users" rowSpan="1" colSpan="1" aria-label="Role: activate to sort column ascending" style={{width: '144.531px'}}>Role</th><th className="min-w-125px sorting" tabIndex="0" aria-controls="kt_table_users" rowSpan="1" colSpan="1" aria-label="Last login: activate to sort column ascending" style={{width: '144.531px'}}>Last login</th><th className="min-w-125px sorting" tabIndex="0" aria-controls="kt_table_users" rowSpan="1" colSpan="1" aria-label="Two-step: activate to sort column ascending" style={{width: '144.531px'}}>Two-step</th><th className="min-w-125px sorting" tabIndex="0" aria-controls="kt_table_users" rowSpan="1" colSpan="1" aria-label="Joined Date: activate to sort column ascending" style={{width: '154.266px'}}>Joined Date</th><th className="text-end min-w-100px sorting_disabled" rowSpan="1" colSpan="1" aria-label="Actions" style={{width: '113.047px'}}>Actions</th></tr>
												{/*<!--end::Table row-->*/}
											</thead>
											{/*<!--end::Table head-->*/}
											{/*<!--begin::Table body-->*/}
											<tbody className="text-gray-600 fw-bold">
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
												{/*<!--begin::Table row-->*/}
												
												{/*<!--end::Table row-->*/}
											<tr className="odd">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label fs-3 bg-light-danger text-danger">E</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Emma Bold</a>
															<span>emma@intenso.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Support</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-21T12:32:47+07:00">
														<div className="badge badge-light fw-bolder">5 hours ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td>
														<div className="badge badge-light-success fw-bolder">Enabled</div>
													</td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-08-19T14:40:00+07:00">19 Aug 2021, 2:40 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="even">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label">
																	<img src="assets/media/avatars/150-7.jpg" alt="Ana Crown" className="w-100" />
																</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Ana Crown</a>
															<span>ana.cf@limtel.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Developer</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-19T17:32:47+07:00">
														<div className="badge badge-light fw-bolder">2 days ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td>
														<div className="badge badge-light-success fw-bolder">Enabled</div>
													</td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-05-05T22:10:00+07:00">05 May 2021, 10:10 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="odd">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label fs-3 bg-light-info text-info">A</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Robert Doe</a>
															<span>robert@benko.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Administrator</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-16T17:32:47+07:00">
														<div className="badge badge-light fw-bolder">5 days ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td></td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-12-20T14:40:00+07:00">20 Dec 2021, 2:40 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="even">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label">
																	<img src="assets/media/avatars/150-17.jpg" alt="John Miller" className="w-100" />
																</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">John Miller</a>
															<span>miller@mapple.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Trial</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2021-12-31T17:32:47+07:00">
														<div className="badge badge-light fw-bolder">3 weeks ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td></td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-06-20T21:23:00+07:00">20 Jun 2021, 9:23 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="odd">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label fs-3 bg-light-success text-success">L</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Lucy Kunic</a>
															<span>lucy.m@fentech.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Administrator</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-20T17:32:47+07:00">
														<div className="badge badge-light fw-bolder">Yesterday</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td></td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-06-24T11:05:00+07:00">24 Jun 2021, 11:05 am</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="even">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label fs-3 bg-light-danger text-danger">M</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Melody Macy</a>
															<span>melody@altbox.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Analyst</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-21T17:12:47+07:00">
														<div className="badge badge-light fw-bolder">20 mins ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td>
														<div className="badge badge-light-success fw-bolder">Enabled</div>
													</td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-04-15T21:23:00+07:00">15 Apr 2021, 9:23 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="odd">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label">
																	<img src="assets/media/avatars/150-26.jpg" alt="Max Smith" className="w-100" />
																</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Max Smith</a>
															<span>max@kt.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Developer</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-18T17:32:47+07:00">
														<div className="badge badge-light fw-bolder">3 days ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td></td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-08-19T11:05:00+07:00">19 Aug 2021, 11:05 am</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="even">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label">
																	<img src="assets/media/avatars/150-4.jpg" alt="Sean Bean" className="w-100" />
																</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Sean Bean</a>
															<span>sean@dellito.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Support</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-21T12:32:47+07:00">
														<div className="badge badge-light fw-bolder">5 hours ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td>
														<div className="badge badge-light-success fw-bolder">Enabled</div>
													</td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-12-20T17:30:00+07:00">20 Dec 2021, 5:30 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="odd">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label">
																	<img src="assets/media/avatars/150-15.jpg" alt="Brian Cox" className="w-100" />
																</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Brian Cox</a>
															<span>brian@exchange.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Developer</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-19T17:32:47+07:00">
														<div className="badge badge-light fw-bolder">2 days ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td>
														<div className="badge badge-light-success fw-bolder">Enabled</div>
													</td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-09-22T14:40:00+07:00">22 Sep 2021, 2:40 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr><tr className="even">
													{/*<!--begin::Checkbox-->*/}
													<td>
														<div className="form-check form-check-sm form-check-custom form-check-solid">
															<input className="form-check-input" type="checkbox" value="1" />
														</div>
													</td>
													{/*<!--end::Checkbox-->*/}
													{/*<!--begin::User=-->*/}
													<td className="d-flex align-items-center">
														{/*<!--begin:: Avatar -->*/}
														<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
															<a href="../../demo13/dist/apps/user-management/users/view.html">
																<div className="symbol-label fs-3 bg-light-warning text-warning">M</div>
															</a>
														</div>
														{/*<!--end::Avatar-->*/}
														{/*<!--begin::User details-->*/}
														<div className="d-flex flex-column">
															<a href="../../demo13/dist/apps/user-management/users/view.html" className="text-gray-800 text-hover-primary mb-1">Mikaela Collins</a>
															<span>mikaela@pexcom.com</span>
														</div>
														{/*<!--begin::User details-->*/}
													</td>
													{/*<!--end::User=-->*/}
													{/*<!--begin::Role=-->*/}
													<td>Administrator</td>
													{/*<!--end::Role=-->*/}
													{/*<!--begin::Last login=-->*/}
													<td data-order="2022-01-16T17:32:47+07:00">
														<div className="badge badge-light fw-bolder">5 days ago</div>
													</td>
													{/*<!--end::Last login=-->*/}
													{/*<!--begin::Two step=-->*/}
													<td></td>
													{/*<!--end::Two step=-->*/}
													{/*<!--begin::Joined-->*/}
													<td data-order="2021-05-05T17:20:00+07:00">05 May 2021, 5:20 pm</td>
													{/*<!--begin::Joined-->*/}
													{/*<!--begin::Action=-->*/}
													<td className="text-end">
														<a href="#" className="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">Actions
														{/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->*/}
														<span className="svg-icon svg-icon-5 m-0">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
																<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black"></path>
															</svg>
														</span>
														{/*<!--end::Svg Icon-->*/}</a>
														{/*<!--begin::Menu-->*/}
														<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="../../demo13/dist/apps/user-management/users/view.html" className="menu-link px-3">Edit</a>
															</div>
															{/*<!--end::Menu item-->*/}
															{/*<!--begin::Menu item-->*/}
															<div className="menu-item px-3">
																<a href="#" className="menu-link px-3" data-kt-users-table-filter="delete_row">Delete</a>
															</div>
															{/*<!--end::Menu item-->*/}
														</div>
														{/*<!--end::Menu-->*/}
													</td>
													{/*<!--end::Action=-->*/}
												</tr></tbody>
											{/*<!--end::Table body-->*/}
										</table></div><div className="row"><div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div><div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"><div className="dataTables_paginate paging_simple_numbers" id="kt_table_users_paginate"><ul className="pagination"><li className="paginate_button page-item previous" id="kt_table_users_previous"><a href="#" aria-controls="kt_table_users" data-dt-idx="0" tabIndex="0" className="page-link"><i className="previous"></i></a></li><li className="paginate_button page-item "><a href="#" aria-controls="kt_table_users" data-dt-idx="1" tabIndex="0" className="page-link">1</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="kt_table_users" data-dt-idx="2" tabIndex="0" className="page-link">2</a></li><li className="paginate_button page-item "><a href="#" aria-controls="kt_table_users" data-dt-idx="3" tabIndex="0" className="page-link">3</a></li><li className="paginate_button page-item next" id="kt_table_users_next"><a href="#" aria-controls="kt_table_users" data-dt-idx="4" tabIndex="0" className="page-link"><i className="next"></i></a></li></ul></div></div></div></div>
										{/*<!--end::Table-->*/}
									</div>
									{/*<!--end::Card body-->*/}
								</div>
								{/*<!--end::Card-->*/}
							</div>
							{/*<!--end::Container-->*/}
						</div>
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
})(InvestorList)


import React, { Component } from "react";
import { connect } from "react-redux";
import * as coinActions from "../../store/action/coin";
import Link from "src/components/link";
import CoinItem from "../../components/coin/item";
import * as _ from "lodash";
import localStorage from "../../utils/local-storage";
import Input from "../../components/input/Input";
import { filtersToUlr, buildCategoryDropDown } from "../../utils/post-filter";
import moment from './../../utils/moment-range';
import { toast } from 'react-toastify'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import HeaderMobileComponent from "src/components/layout/header-mobile";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import CookiesService from '../../services/CookiesService';
import { CONSTS } from '../../config/Constant';
import Load from '../../components/load';
class CoinList extends Component {
  isMobile = false;
  constructor(props) {
    super(props);

    this.state = {
      user: CookiesService.get(CONSTS.STORE_KEYS.USER.PROFILE, true),
      coinList: [],
      totalCoin: 0,
      getListCoinStatus: 0,
      update: 'no',
      showSuggestTagsOnMobile: true,
      canAccess: false
    };

    this.handleOnFocus = this.handleOnFocus.bind(this)
  }

  componentDidMount() {
    document.title = "Coin List";
    const { user } = this.state;
    if (user.role.name === "production") {
      this.confirmAction();
    }
    else
    {
      this.setState({canAccess: true})
    }

    this.props.getListCoin({});    
    window.addEventListener('resize', this.chooseLayout);
    this.chooseLayout();
  }

  confirmAction() {
    const options = {
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => (
        <div className="custom-ui-alert">
          <h1>Bạn không có quyền truy cập mục này.</h1>
          <div
            className="bg-c7c6c5 bg-c7c6c5 txt-center pt-3 pb-3"
            onClick={() => {
              onClose();
              this.props.history.push("/");
            }}
          >
            Trở lại
          </div>
        </div>
      ),
      closeOnEscape: false,
      closeOnClickOutside: false
    };

    confirmAlert(options);
  }

  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.getListCoinStatus != nextProps.getListCoinStatus){
      this.setState({
          coinList: nextProps.coinList,
          totalCoin: nextProps.totalCoin,
          getListCoinStatus: nextProps.getListCoinStatus
        }, () => {
      });
    }
    
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



  render() {
    const { coinList = [], totalCoin = 0, canAccess, getListCoinStatus = 0 } = this.state;

    return (
      <div className={"content-wrapper post-list-container" + (this.isMobile ? ' mobile' : '')}>
        <section className="content-header">
          <div className="container-fluid">
            <HeaderMobileComponent showList={this.handleShowList} />
          </div>
        </section>

        {/* Post List */}

        {(canAccess) && 
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
                          <th>Coin ID</th>
                          <th>Coin Name</th>
                          <th>Coin Price</th>
                          <th>Coin Value</th>
                          <th>Promotion</th>                         
                          <th className="ipad-dis-none">Enable</th>
                          <th>Modify Dts</th>
                        </tr>
                      </thead>
                    ) : (<thead></thead>)}
                    <tbody>
                      {coinList.length > 0 ? (
                        coinList.map((coin, idx) => {
                          return (
                            <CoinItem
                              item={coin}
                              key={`coin-${idx}`}
                              idx={`coin-${idx}`}
                            />
                          );
                        })
                      ) : <Load statusLoad={getListCoinStatus} totalItem={totalCoin} />
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
        }
        

        <a href="/posts/new" className="dis-none mobi-dis-block">
          <button type="button" className="btn btn-lg rounded-circle bg-saostar fixed-bottom-right"><i className="fas fa-plus"></i></button>
        </a>
      </div >
    );
  }

  

}

export default connect(store => {
  return {
    router: store.router,
    coinList: store.coin.coinList,
    getListCoinStatus: store.coin.getListCoinStatus,
    totalCoin: store.coin.totalCoin
  };
}, dispatch => {
  return {
    getListCoin: (value) => { dispatch(coinActions.getListCoin(value)) },
  }
})(CoinList)


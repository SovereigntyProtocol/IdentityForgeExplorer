import qs from 'querystring';
import React, { Component } from 'react';
import { HTTP } from "meteor/http";
import { RxCross2 } from "react-icons/rx";
import {
  Badge,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // Input,
  // InputGroup,
  // InputGroupAddon,
  // Button,
  UncontrolledDropdown,
  UncontrolledPopover,
  PopoverBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import i18n from "meteor/universe:i18n";
import SearchBar from "./SearchBar.jsx";
import LedgerModal from "../ledger/LedgerModal.jsx";
import Account from "./Account.jsx";
import Headero from "./Headero.jsx";

const T = i18n.createComponent();

// Firefox does not support named group yet
// const SendPath = new RegExp('/account/(?<address>\\w+)/(?<action>send)')
// const DelegatePath = new RegExp('/validators?/(?<address>\\w+)/(?<action>delegate)')
// const WithdrawPath = new RegExp('/account/(?<action>withdraw)')

const SendPath = new RegExp("/account/(\\w+)/(send)");
const DelegatePath = new RegExp("/validators?/(\\w+)/(delegate)");
const WithdrawPath = new RegExp("/account/(withdraw)");

const getUser = () => localStorage.getItem(CURRENTUSERADDR);

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      networks: "",
      version: "-",
    };
  }

  toggle() {
    this.setState(
      {
        isOpen: !this.state.isOpen,
      },
      () => {
        // console.log(this.state.isOpen);
      }
    );
  }

  toggleSignIn = (value) => {
    this.setState((prevState) => ({
      isSignInOpen: value != undefined ? value : !prevState.isSignInOpen,
    }));
  };

  handleLanguageSwitch(lang, e) {
    i18n.setLocale(lang);
  }

  componentDidMount() {
    const url = Meteor.settings.public.networks;
    if (url) {
      try {
        HTTP.get(url, null, (error, result) => {
          if (result.statusCode == 200) {
            const networks = JSON.parse(result.content);
            if (networks.length > 0) {
              this.setState({
                networks: (
                  <DropdownMenu>
                    {networks.map((network, i) => (
                      <span key={i}>
                        <DropdownItem className="bcw" header>
                          <img src={network.logo} /> {network.name}
                        </DropdownItem>
                        {network.links.map((link, k) => (
                          <DropdownItem
                            className="bcw"
                            key={k}
                            disabled={
                              link.chain_id == Meteor.settings.public.chainId
                            }
                          >
                            <a href={link.url} target="_blank" rel="noreferrer">
                              {link.chain_id}{" "}
                              <Badge size="xs" color="secondary">
                                {link.name}
                              </Badge>
                            </a>
                          </DropdownItem>
                        ))}
                        {i < networks.length - 1 ? (
                          <DropdownItem className="bcw" divider />
                        ) : (
                          ""
                        )}
                      </span>
                    ))}
                  </DropdownMenu>
                ),
              });
            }
          }
        });
      } catch (e) {
        console.warn(e);
      }
    }

    Meteor.call("getVersion", (error, result) => {
      if (result) {
        this.setState({
          version: result,
        });
      }
    });
  }

  signOut = () => {
    localStorage.removeItem(CURRENTUSERADDR);
    localStorage.removeItem(CURRENTUSERPUBKEY);
    this.props.refreshApp();
  };

  shouldLogin = () => {
    const { pathname } = this.props.location;
    let groups;
    const match =
      pathname.match(SendPath) ||
      pathname.match(DelegatePath) ||
      pathname.match(WithdrawPath);
    if (match) {
      if (match[0] === "/account/withdraw") {
        groups = { action: "withdraw" };
      } else {
        groups = { address: match[1], action: match[2] };
      }
    }
    const params = qs.parse(this.props.location.search.substr(1));
    return groups || params.signin != undefined;
  };

  handleLoginConfirmed = (success) => {
    const groups = this.shouldLogin();
    if (!groups) return;
    let redirectUrl;
    let params;
    if (groups) {
      const { action, address } = groups;
      params = { action };
      switch (groups.action) {
        case "send":
          params.transferTarget = address;
          redirectUrl = `/account/${address}`;
          break;
        case "withdraw":
          redirectUrl = `/account/${getUser()}`;
          break;
        case "delegate":
          redirectUrl = `/validators/${address}`;
          break;
      }
    } else {
      const { location } = this.props;
      params = qs.parse(location.search.substr(1));
      redirectUrl = params.redirect ? params.redirect : location.pathname;
      delete params.redirectUrl;
      delete params.signin;
    }

    const query = success ? `?${qs.stringify(params)}` : "";
    this.props.history.push(redirectUrl + query);
  };

  toggleAAADiv = () => {
    this.setState((prevState) => ({
      isAAAToggle: !prevState.isAAAToggle,
    }));
  };

  render() {
    const signedInAddress = getUser();
    return (
      <div className="mb7">
        <div className="df aic jcsb g5 px1 py1 fw600">
          <div className="df aic g1">
            <img src="/img/logo-v3.png" className="w3 br50" alt="logo" />
            <Link to="/">
              {" "}
              <div className="fs15  wsnw"> Identity Forge</div>
            </Link>
          </div>

          <div className="df aic g2 m-q-b-d-n">
            <Link to="/">
              {" "}
              <div className="">Home</div>
            </Link>{" "}
            <Link to="/validators">
              {" "}
              <div className="">
                {" "}
                <T>navbar.validators</T>
              </div>
            </Link>{" "}
            <Link to="/blocks">
              {" "}
              <div className="">
                {" "}
                <T>navbar.blocks</T>
              </div>
            </Link>{" "}
            <Link to="/transactions">
              {" "}
              <div className="">
                {" "}
                <T>navbar.transactions</T>
              </div>
            </Link>{" "}
            <Link to="/proposals">
              {" "}
              <div className="">
                {" "}
                <T>navbar.proposals</T>
              </div>
            </Link>{" "}
            <Link to="/voting-power-distribution">
              {" "}
              <div className="wsnw">
                {" "}
                <T>navbar.votingPower</T>
              </div>
            </Link>
            <UncontrolledDropdown inNavbar className="bcw">
              <DropdownToggle nav caret className="pa0 ma0">
                <T>navbar.lang</T>
              </DropdownToggle>
              <DropdownMenu right className="bcw">
                <DropdownItem
                  className="bcw"
                  onClick={(e) => this.handleLanguageSwitch("en-US", e)}
                >
                  <T>navbar.english</T>
                </DropdownItem>
                <DropdownItem
                  className="bcw"
                  onClick={(e) => this.handleLanguageSwitch("es-ES", e)}
                >
                  <T>navbar.spanish</T>
                </DropdownItem>
                {/* <DropdownItem className='bcw' onClick={(e) => this.handleLanguageSwitch('it-IT', e)}><T>navbar.italian</T></DropdownItem> */}
                <DropdownItem
                  className="bcw"
                  onClick={(e) => this.handleLanguageSwitch("pl-PL", e)}
                >
                  <T>navbar.polish</T>
                </DropdownItem>
                <DropdownItem
                  className="bcw"
                  onClick={(e) => this.handleLanguageSwitch("ru-RU", e)}
                >
                  <T>navbar.russian</T>
                </DropdownItem>
                <DropdownItem
                  className="bcw"
                  onClick={(e) => this.handleLanguageSwitch("zh-Hant", e)}
                >
                  <T>navbar.chinese</T>
                </DropdownItem>
                <DropdownItem
                  className="bcw"
                  onClick={(e) => this.handleLanguageSwitch("zh-Hans", e)}
                >
                  <T>navbar.simChinese</T>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="m-q-a-d-n">
            <IoReorderThree className="fs2" onClick={this.toggleAAADiv} />
          </div>
        </div>
        <div className="">
          <div className="pt6 pb4 bgb px1 backimage cw">
            <div className="fw600 fs15 mb05">
              The Sovereign-T Identity Forge Blockchain Explorer
            </div>
            <SearchBar id="header-search" history={this.props.history} />
            <div className="mt05 fw600 pb7">
              Sponsored: contact us at{" "}
              <a
                href="mailto:social@sovereignty.one"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                social@sovereignty.one
              </a>{" "}
              to put your ad here.
            </div>
          </div>
        </div>
        {this.state.isAAAToggle && (
          <div className="w100 bcw h100 psa t0 zi999">
            <div className="pa1 df aic  jcsb fs15 fw600 ">
              <div className="df aic g1">
                {" "}
                <img src="/img/logo-v3.png" className="w3 br50" alt="" />
                Identity Forge
              </div>
              <div className="">
                <RxCross2 onClick={this.toggleAAADiv} />
              </div>
            </div>
            <div className="df fdc pa2 fw600 g2">
              <a href="/">
                {" "}
                <div className="">Home</div>
              </a>{" "}
              <a href="/validators">
                {" "}
                <div className="">
                  {" "}
                  <T>navbar.validators</T>
                </div>
              </a>{" "}
              <a href="/blocks">
                {" "}
                <div className="">
                  {" "}
                  <T>navbar.blocks</T>
                </div>
              </a>{" "}
              <a href="/transactions">
                {" "}
                <div className="">
                  {" "}
                  <T>navbar.transactions</T>
                </div>
              </a>{" "}
              <a href="/proposals">
                {" "}
                <div className="">
                  {" "}
                  <T>navbar.proposals</T>
                </div>
              </a>{" "}
              <a href="/voting-power-distribution">
                {" "}
                <div className="wsnw">
                  {" "}
                  <T>navbar.votingPower</T>
                </div>
              </a>
              <UncontrolledDropdown inNavbar className="bcw">
                <DropdownToggle nav caret className="pa0 ma0">
                  <T>navbar.lang</T>
                </DropdownToggle>
                <DropdownMenu right className="bcw">
                  <DropdownItem
                    className="bcw"
                    onClick={(e) => this.handleLanguageSwitch("en-US", e)}
                  >
                    <T>navbar.english</T>
                  </DropdownItem>
                  <DropdownItem
                    className="bcw"
                    onClick={(e) => this.handleLanguageSwitch("es-ES", e)}
                  >
                    <T>navbar.spanish</T>
                  </DropdownItem>
                  {/* <DropdownItem className='bcw' onClick={(e) => this.handleLanguageSwitch('it-IT', e)}><T>navbar.italian</T></DropdownItem> */}
                  <DropdownItem
                    className="bcw"
                    onClick={(e) => this.handleLanguageSwitch("pl-PL", e)}
                  >
                    <T>navbar.polish</T>
                  </DropdownItem>
                  <DropdownItem
                    className="bcw"
                    onClick={(e) => this.handleLanguageSwitch("ru-RU", e)}
                  >
                    <T>navbar.russian</T>
                  </DropdownItem>
                  <DropdownItem
                    className="bcw"
                    onClick={(e) => this.handleLanguageSwitch("zh-Hant", e)}
                  >
                    <T>navbar.chinese</T>
                  </DropdownItem>
                  <DropdownItem
                    className="bcw"
                    onClick={(e) => this.handleLanguageSwitch("zh-Hans", e)}
                  >
                    <T>navbar.simChinese</T>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        )}
      </div>
    );
  }
}






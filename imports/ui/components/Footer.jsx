import React from "react";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";

import { Link } from "react-router-dom";
import moment from "moment";
import i18n from "meteor/universe:i18n";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaFacebook,
  FaInstagram,
  FaMedium,
  FaRedditAlien,
} from "react-icons/fa";

const T = i18n.createComponent();

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt7">
        <div className="bgg pa2">
          <div className="df aic g1 fs15 ">
            <div className="bgdg br50 w3 h3 df aic jcc pa05 ">
              <a
                href="https://www.twitter.com/sovereign_t3"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaXTwitter />
              </a>{" "}
            </div>
            <div className="bgdg br50 w3 h3 df aic jcc pa05 ">
              <a
                href="https://medium.com/@SovereigntyProtocol"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaMedium />
              </a>{" "}
            </div>{" "}
            <div className="bgdg br50 w3 h3 df aic jcc pa05 ">
              <a
                href="https://www.instagram.com/sovereigntyprotocol/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaInstagram />
              </a>
            </div>{" "}
            <div className="bgdg br50 w3 h3 df aic jcc pa05 ">
              <a
                href="https://www.reddit.com/user/sovereigntyprotocol"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaRedditAlien />
              </a>{" "}
            </div>
          </div>
          <hr />
          <div className="df g3 mt3 flex-wrap jcsb">
            <div className="maxw30">
              <div className="df g1 aic mb1 fs15 fw600">
                <img src="/img/logo-v3.png" alt="" className="w3 " />
                Powered by SovereignT Labs
              </div>
              <div className="mb1">
                Identity Forge is a Block Explorer and Analytics Platform for
                SovereignT Labs Identity Forge testnet, a decentralized smart
                contracts platform.
              </div>
              <img
                src="https://res.cloudinary.com/dd3vn1vfc/image/upload/v1714828252/cfjmepcqmkrucg7lmlwg.png"
                className="w100"
                alt=""
              />
            </div>
            <div className="">
              <div className="fs125 fw600 mb1">Company</div>
              <div className="mb1">About Us</div>
              <div className="mb1">Brand Assets</div>
              <div className="mb1">Contact Us</div>
              <div className="mb1">Careers We're Hiring!</div>
              <div className="mb1">Terms & Privacy</div>
              <div className="mb1">Bug Bounty</div>
            </div>
            <div className="">
              <div className="fs125 fw600 mb1">Community</div>
              <a
                href="https://develop.sovereignty.one/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mb1">API Documentation</div>
              </a>
              <a
                href="https://docs.sovereignty.one/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mb1">White Paper</div>
              </a>
              <div className="mb1">Network Status</div>
              <div className="mb1">Newsletters</div>
            </div>
            <div className="">
              <div className="fs125 fw600 mb1">Product & Services</div>
              <div className="mb1">Advertise</div>
              <div className="mb1">Explorer-as-a-Service (EaaS)</div>
            </div>
          </div>
          <hr />
          <div className="df aic jcsb">
            <div className="">SovereignT Labs © 2024 (F1)</div>
            <div className="">
              <span className="fw600">Donations : </span>
              <a
                href="
              https://etherscan.io/address/0xe34010A5cb2F412B4D17d034B4aEa9A29Ba9E024"
                target="_blank"
                className="lstu"
              >
                0xe34010....Ba9E024
              </a>
              &nbsp; 💗
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div>
//   <Navbar color="light" light expand="md" fixed="bottom" id="footer" className="d-none d-md-flex">
//     <span className="text-muted">
//       <a href="https://raw.githubusercontent.com/fetchai/big-dipper-block-explorer/master/LICENSE" target="_blank">
//         <T>&copy; 2024 SovereignT Labs Protocol | All Rights Reserved</T>
//       </a>
//     </span>
//     <Nav className="ml-auto" navbar>
//       <NavItem>
//         <NavLink href="https://github.com/harrybite/cosmos-explorer-" target="_blank">
//           <i className="fab fa-github" />
//           {' '}
//           <T>navbar.forkMe</T>
//         </NavLink>
//       </NavItem>
//     </Nav>
//   </Navbar>
//   <Navbar color="light" light fixed="bottom" className="d-block d-md-none mobile-menu">
//     <Nav>
//       <NavItem>
//         <NavLink tag={Link} to="/">
//           <i className="material-icons">home</i>
//         </NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink tag={Link} to="/validators">
//           <i className="material-icons">perm_contact_calendar</i>
//         </NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink tag={Link} to="/blocks">
//           <i className="fas fa-square" />
//         </NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink tag={Link} to="/transactions">
//           <i className="fas fa-sync" />
//         </NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink tag={Link} to="/proposals">
//           <i className="material-icons">insert_drive_file</i>
//         </NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink tag={Link} to="/voting-power-distribution">
//           <i className="material-icons">power_on</i>
//         </NavLink>
//       </NavItem>
//     </Nav>
//   </Navbar>
// </div>

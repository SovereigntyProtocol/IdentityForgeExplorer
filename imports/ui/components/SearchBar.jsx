import React, { Component } from 'react';
import {
  Button, Input, InputGroup, InputGroupAddon,
} from 'reactstrap';
import { IoIosSearch } from "react-icons/io";
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: "",
    };
  }

  redirectSearchResult = (query) => {
    const hashRegEx = new RegExp(/[0-9A-F]{64}$/, "igm");
    const validatorRegEx = new RegExp(
      `${Meteor.settings.public.bech32PrefixValAddr}.*$`,
      "igm"
    );
    const accountRegEx = new RegExp(
      `${Meteor.settings.public.bech32PrefixAccAddr}.*$`,
      "igm"
    );
    if (query != "") {
      if (!isNaN(query)) {
        this.props.history.push(`/blocks/${query}`);
      } else if (query.match(hashRegEx)) {
        this.props.history.push(`/transactions/${query}`);
      } else if (query.match(validatorRegEx)) {
        this.props.history.push(`/validator/${query}`);
      } else if (query.match(accountRegEx)) {
        this.props.history.push(`/account/${query}`);
      } else {
        // handle not found
      }
    }
  };

  handleInput = (e) => {
    this.setState({
      queryString: e.target.value,
    });
  };

  handleMobileSearch = (e) => {
    this.redirectSearchResult(this.state.queryString);
    this.setState({
      queryString: "",
    });
  };

  handleSearch = (e) => {
    if (e.key === "Enter") {
      this.redirectSearchResult(e.target.value);
      this.setState({
        queryString: "",
      });
    }
  };

  render() {
    return (
      <div
      // className={this.props.mobile ? "d-lg-none" : "d-none d-lg-flex"}
      // id={this.props.id}
      >
        <div className="maxw60">
          <div className="df aic jcsb bcw  br10 ">
            <input
              id="queryString"
              value={this.state.queryString}
              onChange={this.handleInput}
              placeholder={i18n.__("common.searchPlaceholder")}
              onKeyDown={this.handleSearch}
              className=" cb pa15 fs125  w100 bn  "
              id="inputtxt"
            />
            <button className="pa1 bn bglb br10 mr1">
              <IoIosSearch className="cw fw fs15 " />
            </button>
          </div>
        </div>

        {/* {this.props.mobile ? (
            <InputGroupAddon addonType="append">
              <Button>
                <i className="material-icons" onClick={this.handleMobileSearch}>
                  search
                </i>
              </Button>
            </InputGroupAddon>
          ) : (
            ""
          )} */}
      </div>
    );
  }
}

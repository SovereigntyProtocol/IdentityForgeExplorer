import React from "react";

function Headern() {
  return (
    <div>
      {" "}
      <div className="df aic jcsb g5 px2 py1 fw600">
        <div className="df aic g1">
          <img src="/img/logo-v3.png" className="w3 br50" alt="logo" />
          <div className="fs15  wsnw"> Identity Forge</div>
        </div>
        <div className="w100">
          <SearchBar id="header-search" history={this.props.history} />
        </div>
        <div className="df aic g2">
          <Link to="/validators">
            {" "}
            <div className="">Validators</div>
          </Link>{" "}
          <Link to="/blocks">
            {" "}
            <div className="">Blocks</div>
          </Link>{" "}
          <Link to="/transactions">
            {" "}
            <div className="">Transactions</div>
          </Link>{" "}
          <Link to="/proposals">
            {" "}
            <div className="">Proposals</div>
          </Link>{" "}
          <Link to="/voting-power-distribution">
            {" "}
            <div className="wsnw">Voting Power</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Headern;

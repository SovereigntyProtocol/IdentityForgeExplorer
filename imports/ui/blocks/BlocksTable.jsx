import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import HeaderRecord from './HeaderRecord.jsx';
import Blocks from "/imports/ui/blocks/ListContainer.js";
import { LoadMore } from "../components/LoadMore.jsx";
import { Route, Switch } from "react-router-dom";
import Sidebar from "react-sidebar";
import { FaLongArrowAltRight } from "react-icons/fa";
import Block from "./BlockContainer.js";
import ChainStates from "../components/ChainStatesContainer.js";
import { Helmet } from "react-helmet";
import i18n from "meteor/universe:i18n";
import { Table, Row, Col, Card, CardBody, Container } from "reactstrap";

const T = i18n.createComponent();

export default class BlocksTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: props.homepage ? 10 : Meteor.settings.public.initialPageSize,
      sidebarOpen: props?.location?.pathname.split("/blocks/").length == 2,
      loadmore: false, // Initial state for loading more
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.loadMore = this.loadMore.bind(this); // Binding the new method
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.limit !== prevState.limit) {
      // Load more data when limit changes
      this.setState({ loadmore: false });
    }
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open }, () => {
      let timer = Meteor.setTimeout(() => {
        if (!open) {
          this.props.history.push("/blocks");
        }
        Meteor.clearTimeout(timer);
      }, 500);
    });
  }

  loadMore() {
    this.setState((prevState) => ({
      limit: prevState.limit + 10, // Increase limit by 10
      loadmore: true, // Set loading more to true
    }));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Latest Blocks | Big Dipper</title>
          <meta
            name="description"
            content="Latest blocks committed by validators"
          />
        </Helmet>
        <Switch>
          <Route
            path="/blocks/:blockId"
            render={(props) => (
              <Sidebar
                sidebar={<Block {...props} />}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{
                  sidebar: {
                    background: "white",
                    position: "fixed",
                    width: "85%",
                    zIndex: 4,
                  },
                  overlay: {
                    zIndex: 3,
                  },
                }}
              />
            )}
          />
        </Switch>
        <div className="border bcw br10">
          <div className="pa1 fs15 fw600">
            <T>blocks.latestBlocks</T>
          </div>
          <Container fluid id="block-table">
            <HeaderRecord />
            <Blocks limit={this.state.limit} />
            <div className="w100">
              {" "}
              <div
                onClick={this.loadMore}
                style={{ margin: "20px 0" }}
                className="br5 bct  tac aic jcc g05 cp mt2 px2 py05 bn"
              >
                VIEW ALL BLOCKS &nbsp;
                <FaLongArrowAltRight />
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

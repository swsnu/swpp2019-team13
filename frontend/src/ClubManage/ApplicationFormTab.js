import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactDragList from "react-drag-list";
// import * as actionCreators from "../store/actions/index";

class ApplicationFormTab extends Component {
  render() {
    return (
      <div>
        <ReactDragList
          dataSource={["row1", "row2", "row3"]}
          row={(record, index) => (
            <div>
              {index} + {record}
            </div>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicationFormTab));

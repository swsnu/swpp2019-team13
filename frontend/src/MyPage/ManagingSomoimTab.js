import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card } from "react-bootstrap";
import SomoimDetail from "../components/SomoimDetail";

class ManagingSomoimTab extends Component {
  state = { somoimDetailShow: false, selectedSomoimID: null };

  render() {
    let list = null;
    if (this.props.managingSomoims) {
      list = this.props.managingSomoims.map((item, idx) => {
        return (
          <Card
            size="lg"
            key={idx}
            border="primary"
            style={{
              textAlign: "left",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          >
            <Card.Body
              onClick={e => {
                if (e.target.className === "card-body") {
                  this.setState({
                    ...this.state,
                    somoimDetailShow: true,
                    selectedSomoimID: item.id
                  });
                }
              }}
            >
              <h1>{item.title}</h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {item.summary}
            </Card.Body>
          </Card>
        );
      });
    }
    return (
      <div>
        {list}
        <SomoimDetail
          show={this.state.somoimDetailShow}
          somoim={
            this.props.somoims.filter(
              a => a.id === this.state.selectedSomoimID
            )[0]
          }
          closeHandler={() => {
            this.setState({
              ...this.state,
              somoimDetailShow: false
            });
          }}
          forceRender={Math.random()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    somoims: state.somoim.somoims,
    managingSomoims: state.user.managingSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManagingSomoimTab));

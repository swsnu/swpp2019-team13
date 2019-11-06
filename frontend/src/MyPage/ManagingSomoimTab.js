import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import SomoimDetail from "../components/SomoimDetail";
import * as userActions from "../store/actions/user";

class ManagingSomoimTab extends Component {
  state = { somoimDetailShow: false, selectedSomoim: null };

  componentDidMount() {
    if (this.props.loggedUser) {
      this.props.onGetManagingSomoims(this.props.loggedUser);
    }
  }

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
                    selectedSomoim: item
                  });
                }
              }}
            >
              {item.title}
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
          somoim={this.state.selectedSomoim}
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
    managingSomoims: state.user.managingSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetManagingSomoims: user => dispatch(userActions.getManagingSomoims(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManagingSomoimTab));

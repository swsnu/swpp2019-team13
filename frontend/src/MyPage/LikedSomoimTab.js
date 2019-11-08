import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import SomoimDetail from "../components/SomoimDetail";
import * as actionCreators from "../store/actions/index";

class LikedSomoimTab extends Component {
  state = { somoimDetailShow: false, selectedSomoimID: null };

  componentDidMount() {
    if (this.props.loggedUser) {
      this.props.onGetLikedSomoims(this.props.loggedUser);
    }
  }

  render() {
    let list = null;
    if (this.props.likedSomoims) {
      list = this.props.likedSomoims.map((item, idx) => {
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
              {item.title} <Button onClick={() => {}}>Unlike</Button>
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
    likedSomoims: state.user.likedSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLikedSomoims: user => dispatch(actionCreators.getLikedSomoims(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikedSomoimTab));

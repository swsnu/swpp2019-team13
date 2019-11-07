import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import SomoimDetail from "../components/SomoimDetail";
import * as userActions from "../store/actions/user";

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
              <h1>{item.title}</h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {item.summary}{" "}
              <Button
                onClick={() => {
                  this.props.addLikedSomoim(item, this.props.loggedUser);
                }}
              >
                Unlike
              </Button>
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
          somoim={this.props.somoims[this.state.selectedSomoimID - 1]}
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
    onGetLikedSomoims: user => dispatch(userActions.getLikedSomoims(user)),
    addLikedSomoim: (somoim, user) =>
      dispatch(userActions.addLikedSomoim(somoim, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikedSomoimTab));

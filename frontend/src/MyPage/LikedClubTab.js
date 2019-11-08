import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import ClubDetail from "../components/ClubDetail";
import * as actionCreators from "../store/actions/index";

class LikedClubTab extends Component {
  state = { clubDetailShow: false, selectedClubID: null };

  componentDidMount() {
    if (this.props.loggedUser) {
      this.props.onGetLikedClubs(this.props.loggedUser);
    }
  }

  render() {
    let list = null;
    if (this.props.likedClubs) {
      list = this.props.likedClubs.map((item, idx) => {
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
                    clubDetailShow: true,
                    selectedClubID: item.id
                  });
                }
              }}
            >
              {item.name} <Button onClick={() => {}}>Unlike</Button>
            </Card.Body>
          </Card>
        );
      });
    }
    return (
      <div>
        {list}
        <ClubDetail
          show={this.state.clubDetailShow}
          club={
            this.props.clubs.filter(a => a.id === this.state.selectedClubID)[0]
          }
          closeHandler={() => {
            this.setState({
              ...this.state,
              clubDetailShow: false
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
    clubs: state.club.clubs,
    likedClubs: state.user.likedClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLikedClubs: user => dispatch(actionCreators.getLikedClubs(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikedClubTab));

import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import ClubDetail from "../Club/ClubDetail";

class ManagingClubTab extends Component {
  state = { clubDetailShow: false, selectedClubID: null };

  render() {
    let list = null;
    if (this.props.managingClubs) {
      list = this.props.managingClubs.map((item, idx) => {
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
              id="list-item-body"
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
              <h1>{item.name}</h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {item.summary}
              <Button
                id="manage-club-button"
                onClick={() => {
                  this.props.history.push("/club/manage/" + item.id);
                }}
              >
                동아리 관리
              </Button>
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
    managingClubs: state.user.managingClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManagingClubTab));

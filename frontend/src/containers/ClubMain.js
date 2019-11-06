import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../components/Header";
import ClubCard from "../components/ClubCard";
import ClubDetail from "../components/ClubDetail";
import ClubRegister from "../components/ClubRegister";
import * as actionCreators from "../store/actions/index";

class ClubMain extends React.Component {
  state = {
    ClubDetailShow: false,
    ClubRegisterShow: false,
    selectedClub: null,
    selected_category: 0
  };
  componentDidMount() {
    this.props.getClubList();
    this.props.getCategoryList();
  }
  ClubCardClickHandler = id => {
    this.setState({
      ...this.state,
      ClubDetailShow: true,
      selectedClub: this.props.Clubs[id - 1]
    });
  };

  ClubDetailCloseHandler = () => {
    this.setState({
      ...this.state,
      ClubDetailShow: false
    });
  };

  ClubRegisterClickHandler = () => {
    this.setState({
      ...this.state,
      ClubRegisterShow: true
    });
  };

  ClubRegisterCloseHandler = () => {
    this.setState({
      ...this.state,
      ClubRegisterShow: false
    });
  };

  render() {
    let categoryList, RegisterButton;
    if (this.props.categories) {
      RegisterButton = (
        <ClubRegister
          show={this.state.ClubRegisterShow}
          closeHandler={this.ClubRegisterCloseHandler}
        />
      );
      categoryList = this.props.categories.map(item => (
        <Button
          className="category-button"
          key={item.id}
          variant="outline-secondary"
          onClick={() =>
            this.setState({ ...this.state, selected_category: item.id })
          }
        >
          {item.name}
        </Button>
      ));
    }
    let recommendedList, allList;
    if (this.props.Clubs) {
      recommendedList = this.props.Clubs.map(item => (
        <Col sm="4" key={item.pk} style={{ paddingLeft: 1, paddingRight: 1 }}>
          <ClubCard clickHandler={this.ClubCardClickHandler} club={item} />
        </Col>
      ));

      if (this.state.selected_category === 0) {
        allList = this.props.Clubs.map(item => (
          <Col sm="5" key={item.pk} style={{ paddingLeft: 1, paddingRight: 1 }}>
            <ClubCard clickHandler={this.ClubCardClickHandler} club={item} />
          </Col>
        ));
      } else {
        allList = this.props.Clubs.filter(
          item => item.selected_category === this.state.selected_category
        ).map(item => (
          <Col sm="5" key={item.pk} style={{ paddingLeft: 1, paddingRight: 1 }}>
            <ClubCard clickHandler={this.ClubCardClickHandler} club={item} />
          </Col>
        ));
      }
    }

    return (
      <div>
        <Header />
        <Container>
          <Row>
            <h2>Recommended Clubs</h2>
          </Row>
          <Row>
            <div
              style={{
                display: "flex",
                overflowX: "scroll"
              }}
            >
              {recommendedList}
            </div>
          </Row>
          <br />
          <br />
          <Row>
            <h2>All Clubs</h2>
          </Row>
          <Row>
            <Button
              className="all-club-button"
              variant="outline-secondary"
              onClick={() =>
                this.setState({ ...this.state, selected_category: 0 })
              }
            >
              전체
            </Button>
            {categoryList}
            <Col>
              {this.props.loggedUser && (
                <Button
                  className="club-create-button"
                  variant="outline-primary"
                  size="lg"
                  onClick={this.ClubRegisterClickHandler}
                >
                  Can't find your club?
                </Button>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs="10" style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div
                style={{
                  display: "flex",
                  overflowX: "scroll",
                  marginLeft: 0,
                  marginRight: 0
                }}
              >
                {allList}
              </div>
            </Col>
          </Row>
        </Container>

        <ClubDetail
          show={this.state.ClubDetailShow}
          club={this.state.selectedClub}
          closeHandler={this.ClubDetailCloseHandler}
        />

        {RegisterButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Clubs: state.club.clubs,
    categories: state.category.categories,
    loggedUser: state.user.loggedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubList: () => dispatch(actionCreators.getClubList()),
    getCategoryList: () => dispatch(actionCreators.getCategoryList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubMain));

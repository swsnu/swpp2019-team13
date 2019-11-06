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
    clubDetailShow: false,
    clubRegisterShow: false,
    selectedClubID: null,
    selected_category: 0
  };
  componentDidMount() {
    this.props.getClubList();
    this.props.getCategoryList();
  }
  clubCardClickHandler = id => {
    this.setState({
      ...this.state,
      clubDetailShow: true,
      selectedClubID: id
    });
  };

  clubDetailCloseHandler = () => {
    this.setState({
      ...this.state,
      clubDetailShow: false
    });
  };

  clubRegisterClickHandler = () => {
    this.setState({
      ...this.state,
      clubRegisterShow: true
    });
  };

  clubRegisterCloseHandler = () => {
    this.setState({
      ...this.state,
      clubRegisterShow: false
    });
  };

  render() {
    let categoryList, RegisterButton;
    if (this.props.categories) {
      RegisterButton = (
        <ClubRegister
          show={this.state.clubRegisterShow}
          closeHandler={this.clubRegisterCloseHandler}
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
    if (this.props.clubs) {
      recommendedList = this.props.clubs.map(item => (
        <Col sm="4" key={item.id} style={{ paddingLeft: 1, paddingRight: 1 }}>
          <ClubCard
            clickHandler={this.clubCardClickHandler}
            club={item}
            forceRender={Math.random()}
          />
        </Col>
      ));

      if (this.state.selected_category === 0) {
        allList = this.props.clubs.map(item => (
          <Col sm="4" key={item.id} style={{ paddingLeft: 1, paddingRight: 1 }}>
            <ClubCard
              clickHandler={this.clubCardClickHandler}
              club={item}
              forceRender={Math.random()}
            />
          </Col>
        ));
      } else {
        allList = this.props.clubs
          .filter(item => item.category === this.state.selected_category)
          .map(item => (
            <Col
              sm="4"
              key={item.id}
              style={{ paddingLeft: 1, paddingRight: 1 }}
            >
              <ClubCard
                clickHandler={this.clubCardClickHandler}
                club={item}
                forceRender={Math.random()}
              />
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
                  onClick={this.clubRegisterClickHandler}
                >
                  Can't find your club?
                </Button>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <div
              style={{
                display: "flex",
                overflowX: "scroll",
                width: "1500px",
                marginLeft: 0,
                marginRight: 0
              }}
            >
              {allList}
            </div>
          </Row>
        </Container>

        <ClubDetail
          show={this.state.clubDetailShow}
          club={this.props.clubs[this.state.selectedClubID - 1]}
          closeHandler={this.clubDetailCloseHandler}
          forceRender={Math.random()}
        />

        {RegisterButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clubs: state.club.clubs,
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

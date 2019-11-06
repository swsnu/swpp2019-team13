import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../components/Header";
import ClubCard from "../components/ClubCard";
import ClubDetail from "../components/ClubDetail";
import ClubRegister from "../components/ClubRegister";
import * as actionCreators from "../store/actions/index";

import "./ClubMain.css";

class ClubMain extends React.Component {
  componentDidMount() {
    this.props.getClubList();
    this.props.getCategoryList();
  }

  state = {
    clubDetailShow: false,
    clubRegisterShow: false,
    selectedClub: null,
    selected_category: 0,
    recommendedListPageNum: 0
  };

  clubCardClickHandler = id => {
    this.setState({
      ...this.state,
      clubDetailShow: true,
      selectedClub: this.props.clubs[id - 1]
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
        <ClubCard
          key={item.id}
          clickHandler={this.clubCardClickHandler}
          club={item}
          forceRender={Math.random()}
        />
      ));

      if (this.state.selected_category === 0) {
        allList = this.props.clubs.map(item => (
          <ClubCard
            key={item.id}
            clickHandler={this.clubCardClickHandler}
            club={item}
            forceRender={Math.random()}
          />
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
      <div className="ClubMain">
        <Header />
        <div className="ClubList">
          <div>
            <h2
              style={{
                fontWeight: "bold",
                display: "inline-block",
                marginRight: "1%"
              }}
            >
              추천 동아리
            </h2>
            <div>
              <div className="ClubCard">
                {this.state.recommendedListPageNum * 4 + 0 <
                recommendedList.length
                  ? recommendedList[this.state.recommendedListPageNum * 4 + 0]
                  : ""}
              </div>
              <div className="ClubCard">
                {this.state.recommendedListPageNum * 4 + 1 <
                recommendedList.length
                  ? recommendedList[this.state.recommendedListPageNum * 4 + 1]
                  : ""}
              </div>
            </div>
            <div>
              <div className="ClubCard">
                {this.state.recommendedListPageNum * 4 + 2 <
                recommendedList.length
                  ? recommendedList[this.state.recommendedListPageNum * 4 + 2]
                  : ""}
              </div>
              <div className="ClubCard">
                {this.state.recommendedListPageNum * 4 + 3 <
                recommendedList.length
                  ? recommendedList[this.state.recommendedListPageNum * 4 + 3]
                  : ""}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                className="changePage"
                onClick={() => {
                  if (this.state.recommendedListPageNum > 0)
                    this.setState({
                      ...this.state,
                      recommendedListPageNum:
                        this.state.recommendedListPageNum - 1
                    });
                }}
              >
                &laquo; 이전
              </div>
              <div className="bar">|</div>
              <div
                className="changePage"
                onClick={() => {
                  if (
                    this.state.recommendedListPageNum <
                    Math.ceil(recommendedList.length / 4) - 1
                  )
                    this.setState({
                      ...this.state,
                      recommendedListPageNum:
                        this.state.recommendedListPageNum + 1
                    });
                  console.log(recommendedList.length);
                }}
              >
                다음 &raquo;
              </div>
            </div>
          </div>
        </div>
        <Container>
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
          club={this.state.selectedClub}
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

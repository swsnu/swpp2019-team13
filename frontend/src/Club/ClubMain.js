import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

import Header from "../Header/Header";
import ClubCard from "../Club/ClubCard";
import ClubDetail from "../Club/ClubDetail";
import ClubRegister from "../Club/ClubRegister";
import ClubTitleSearchBar from "./ClubTitleSearchBar";
import * as actionCreators from "../store/actions/index";

import "./ClubMain.css";

class ClubMain extends React.Component {
  state = {
    clubDetailShow: false,
    clubRegisterShow: false,
    selectedClubID: null,
    selected_category: 0,
    recommendedListPageNum: 0,
    allListPageNum: 0,
    isUserInfoLoaded: false,
    isEmptyUserRecommendationLoaded: false
  };

  componentDidMount() {
    this.props.getClubList();
    this.props.getCategoryList();
    this.props.getTagList();
    this.props.getDeptList();
    this.props.getMajorList();
  }

  componentDidUpdate = () => {
    if (this.props.loggedUser) {
      if (!this.state.isUserInfoLoaded) {
        this.setState({
          ...this.state,
          isUserInfoLoaded: true,
          isEmptyUserRecommendationLoaded: false
        });
        this.props.onGetRecommendedClubs(this.props.loggedUser);
      }
    } else {
      if (!this.state.isEmptyUserRecommendationLoaded) {
        this.props.onGetRecommendedClubs({ id: 0 });
        this.setState({
          ...this.state,
          isEmptyUserRecommendationLoaded: true
        });
      }
    }
  };

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

  clubCardGenerator = (list, index) => {
    return (
      <div className="ClubCard">{index < list.length ? list[index] : ""}</div>
    );
  };

  listPageChangeBarGenerator = (page, list) => {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          className="changePage"
          onClick={() => {
            if (page === 0) {
              if (this.state.recommendedListPageNum > 0)
                this.setState({
                  ...this.state,
                  recommendedListPageNum: this.state.recommendedListPageNum - 1
                });
            } else {
              if (this.state.allListPageNum > 0)
                this.setState({
                  ...this.state,
                  allListPageNum: this.state.allListPageNum - 1
                });
            }
          }}
        >
          &laquo; 이전
        </div>
        <div className="bar">|</div>
        <div
          className="changePage"
          onClick={() => {
            if (page === 0) {
              if (
                this.state.recommendedListPageNum <
                Math.ceil(list.length / 4) - 1
              )
                this.setState({
                  ...this.state,
                  recommendedListPageNum: this.state.recommendedListPageNum + 1
                });
            } else {
              if (this.state.allListPageNum < Math.ceil(list.length / 4) - 1)
                this.setState({
                  ...this.state,
                  allListPageNum: this.state.allListPageNum + 1
                });
            }
          }}
        >
          다음 &raquo;
        </div>
      </div>
    );
  };

  render() {
    let categoryList, RegisterButton, selected_club;
    if (this.props.clubs) {
      selected_club = this.props.clubs.filter(
        a => a.id === this.state.selectedClubID
      )[0];
    }
    if (this.props.categories) {
      RegisterButton = (
        <ClubRegister
          show={this.state.clubRegisterShow}
          closeHandler={this.clubRegisterCloseHandler}
        />
      );
      categoryList = this.props.categories.map(item => (
        <Button
          className={`category-button ${
            this.state.selected_category === item.id ? "active" : ""
          }`}
          key={item.id}
          variant="light"
          style={{ display: "inline-block", marginLeft: "5px" }}
          onClick={() =>
            this.setState({
              ...this.state,
              selected_category: item.id,
              allListPageNum: 0
            })
          }
        >
          {item.name}
        </Button>
      ));
    }

    let recommendedList = [],
      allList = [];
    if (this.props.recommendedClubs) {
      recommendedList = this.props.recommendedClubs.map(item => (
        <ClubCard
          className="recommended-club-card"
          key={item.id}
          clickHandler={this.clubCardClickHandler}
          club={item}
          forceRender={Math.random()}
        />
      ));
    }
    if (this.props.clubs) {
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
            <ClubCard
              key={item.id}
              clickHandler={this.clubCardClickHandler}
              club={item}
              forceRender={Math.random()}
            />
          ));
      }
    }

    return (
      <div className="ClubMain">
        <Header />
        <ClubTitleSearchBar />
        <div className="ClubList">
          <h1
            style={{
              fontWeight: "bold"
            }}
          >
            추천 동아리
          </h1>
          <div>
            <div className="card-flex-container">
              {this.clubCardGenerator(
                recommendedList,
                this.state.recommendedListPageNum * 4 + 0
              )}
              {this.clubCardGenerator(
                recommendedList,
                this.state.recommendedListPageNum * 4 + 1
              )}
              {this.clubCardGenerator(
                recommendedList,
                this.state.recommendedListPageNum * 4 + 2
              )}
              {this.clubCardGenerator(
                recommendedList,
                this.state.recommendedListPageNum * 4 + 3
              )}
            </div>

            {this.listPageChangeBarGenerator(0, recommendedList)}
          </div>
        </div>
        <br />
        <div className="ClubList" style={{ marginBottom: "25px" }}>
          <div>
            <h1
              style={{
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              모든 동아리
            </h1>
            {this.props.loggedUser && (
              <Button
                className="club-create-button"
                variant="outline-primary"
                size="lg"
                style={{ display: "inline-block", float: "right" }}
                onClick={this.clubRegisterClickHandler}
              >
                Can&apos;t find your club?
              </Button>
            )}
          </div>
          <div>
            <Button
              className={`category-button ${
                this.state.selected_category === 0 ? "active" : ""
              }`}
              variant="light"
              style={{ display: "inline-block" }}
              onClick={() =>
                this.setState({ ...this.state, selected_category: 0 })
              }
            >
              전체
            </Button>
            {categoryList}
          </div>
          <br />
          <div>
            <div className="card-flex-container">
              {this.clubCardGenerator(
                allList,
                this.state.allListPageNum * 4 + 0
              )}
              {this.clubCardGenerator(
                allList,
                this.state.allListPageNum * 4 + 1
              )}
              {this.clubCardGenerator(
                allList,
                this.state.allListPageNum * 4 + 2
              )}
              {this.clubCardGenerator(
                allList,
                this.state.allListPageNum * 4 + 3
              )}
            </div>
            {this.listPageChangeBarGenerator(1, allList)}
          </div>
        </div>

        <ClubDetail
          show={this.state.clubDetailShow}
          club={selected_club}
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
    loggedUser: state.user.loggedUser,
    recommendedClubs: state.user.recommendedClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubList: () => dispatch(actionCreators.getClubList()),
    getCategoryList: () => dispatch(actionCreators.getCategoryList()),
    getTagList: () => dispatch(actionCreators.getTagList()),
    getDeptList: () => dispatch(actionCreators.getDeptList()),
    getMajorList: () => dispatch(actionCreators.getMajorList()),
    onGetRecommendedClubs: user =>
      dispatch(actionCreators.getRecommendedClubs(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubMain));

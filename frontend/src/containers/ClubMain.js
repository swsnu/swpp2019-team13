import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import ClubCard from "../components/ClubCard";
import ClubDetail from "../components/ClubDetail";
import ClubRegister from "../components/ClubRegister";
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
    isUserInfoLoaded: false
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
        this.setState({ ...this.state, isUserInfoLoaded: true });
        this.props.onGetRecommendedClubs(this.props.loggedUser);
      }
    } else {
      this.props.onGetRecommendedClubs({ id: 0 });
      if (this.state.isUserInfoLoaded) {
        this.setState({ ...this.state, isUserInfoLoaded: false });
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

    // let displayRecommendedClubs = null;
    // if (window.innerWidth > 1400) {
    //   displayRecommendedClubs = (
    //     <div className="card-flex-container">
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 4 + 0 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 4 + 0]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 4 + 1 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 4 + 1]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 4 + 2 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 4 + 2]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 4 + 3 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 4 + 3]
    //           : ""}
    //       </div>
    //     </div>
    //   );
    // } else if (window.innerWidth > 1000) {
    //   displayRecommendedClubs = (
    //     <div className="card-flex-container">
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 3 + 0 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 3 + 0]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 3 + 1 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 3 + 1]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 3 + 2 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 3 + 2]
    //           : ""}
    //       </div>
    //     </div>
    //   );
    // } else {
    //   displayRecommendedClubs = (
    //     <div className="card-flex-container">
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 2 + 0 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 2 + 0]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.recommendedListPageNum * 2 + 1 < recommendedList.length
    //           ? recommendedList[this.state.recommendedListPageNum * 2 + 1]
    //           : ""}
    //       </div>
    //     </div>
    //   );
    // }

    // let displayAllClubs = null;
    // if (window.innerWidth > 1400) {
    //   displayAllClubs = (
    //     <div className="card-flex-container">
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 4 + 0 < allList.length
    //           ? allList[this.state.allListPageNum * 4 + 0]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 4 + 1 < allList.length
    //           ? allList[this.state.allListPageNum * 4 + 1]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 4 + 2 < allList.length
    //           ? allList[this.state.allListPageNum * 4 + 2]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 4 + 3 < allList.length
    //           ? allList[this.state.allListPageNum * 4 + 3]
    //           : ""}
    //       </div>
    //     </div>
    //   );
    // } else if (window.innerWidth > 1000) {
    //   displayAllClubs = (
    //     <div className="card-flex-container">
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 3 + 0 < allList.length
    //           ? allList[this.state.allListPageNum * 3 + 0]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 3 + 1 < allList.length
    //           ? allList[this.state.allListPageNum * 3 + 1]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 3 + 2 < allList.length
    //           ? allList[this.state.allListPageNum * 3 + 2]
    //           : ""}
    //       </div>
    //     </div>
    //   );
    // } else {
    //   displayAllClubs = (
    //     <div className="card-flex-container">
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 2 + 0 < allList.length
    //           ? allList[this.state.allListPageNum * 2 + 0]
    //           : ""}
    //       </div>
    //       <div className="ClubCard">
    //         {this.state.allListPageNum * 2 + 1 < allList.length
    //           ? allList[this.state.allListPageNum * 2 + 1]
    //           : ""}
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className="ClubMain">
        <Header />
        <div className="ClubList">
          <h1
            style={{
              fontWeight: "bold"
            }}
          >
            추천 동아리
          </h1>
          <div>
            {/* {displayRecommendedClubs} */}
            {/* {console.log(window.innerWidth)} */}
            <div className="card-flex-container">
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
                }}
              >
                다음 &raquo;
              </div>
            </div>
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
            {/* {displayAllClubs} */}
            <div className="card-flex-container">
              <div className="ClubCard">
                {this.state.allListPageNum * 4 + 0 < allList.length
                  ? allList[this.state.allListPageNum * 4 + 0]
                  : ""}
              </div>
              <div className="ClubCard">
                {this.state.allListPageNum * 4 + 1 < allList.length
                  ? allList[this.state.allListPageNum * 4 + 1]
                  : ""}
              </div>
              <div className="ClubCard">
                {this.state.allListPageNum * 4 + 2 < allList.length
                  ? allList[this.state.allListPageNum * 4 + 2]
                  : ""}
              </div>
              <div className="ClubCard">
                {this.state.allListPageNum * 4 + 3 < allList.length
                  ? allList[this.state.allListPageNum * 4 + 3]
                  : ""}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                className="changePage"
                onClick={() => {
                  if (this.state.allListPageNum > 0)
                    this.setState({
                      ...this.state,
                      allListPageNum: this.state.allListPageNum - 1
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
                    this.state.allListPageNum <
                    Math.ceil(allList.length / 4) - 1
                  )
                    this.setState({
                      ...this.state,
                      allListPageNum: this.state.allListPageNum + 1
                    });
                }}
              >
                다음 &raquo;
              </div>
            </div>
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

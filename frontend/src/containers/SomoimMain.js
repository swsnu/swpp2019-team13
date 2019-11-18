import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

import Header from "../components/Header";
import SomoimCard from "../components/SomoimCard";
import SomoimDetail from "../components/SomoimDetail";
import SomoimCreate from "../components/SomoimCreate";
import * as actionCreators from "../store/actions/index";

import "./SomoimMain.css";

class SomoimMain extends React.Component {
  state = {
    somoimDetailShow: false,
    somoimCreateShow: false,
    selectedSomoimID: null,
    selected_category: 0,
    recommendedListPageNum: 0,
    allListPageNum: 0,
    isUserInfoLoaded: false
  };

  componentDidMount() {
    this.props.getSomoimList();

    this.props.getCategoryList();
    this.props.getTagList();
    this.props.getDeptList();
    this.props.getMajorList();
  }

  componentDidUpdate = () => {
    if (this.props.loggedUser) {
      if (!this.state.isUserInfoLoaded) {
        this.setState({ ...this.state, isUserInfoLoaded: true });
        this.props.onGetRecommendedSomoims(this.props.loggedUser);
      }
    } else {
      this.props.onGetRecommendedSomoims({ id: 0 });
      if (this.state.isUserInfoLoaded) {
        this.setState({ ...this.state, isUserInfoLoaded: false });
      }
    }
  };

  somoimCardClickHandler = id => {
    this.setState({
      ...this.state,
      somoimDetailShow: true,
      selectedSomoimID: id
    });
  };

  somoimDetailCloseHandler = () => {
    this.setState({
      ...this.state,
      somoimDetailShow: false
    });
  };

  somoimCreateClickHandler = () => {
    this.setState({
      ...this.state,
      somoimCreateShow: true
    });
  };

  somoimCreateCloseHandler = () => {
    this.setState({
      ...this.state,
      somoimCreateShow: false
    });
  };

  render() {
    let categoryList, somoim_create, selectedSomoim;
    if (this.props.somoims) {
      selectedSomoim = this.props.somoims.filter(
        a => a.id === this.state.selectedSomoimID
      )[0];
    }
    if (this.props.categories) {
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
      somoim_create = (
        <SomoimCreate
          show={this.state.somoimCreateShow}
          closeHandler={this.somoimCreateCloseHandler}
        />
      );
    }

    let recommendedList = [],
      allList = [];
    if (this.props.recommendedSomoims) {
      recommendedList = this.props.recommendedSomoims.map(item => (
        <SomoimCard
          className="recommended-somoim-card"
          key={item.id}
          clickHandler={this.somoimCardClickHandler}
          somoim={item}
          forceRender={Math.random()}
        />
      ));
    }
    if (this.props.somoims) {
      if (this.state.selected_category === 0) {
        allList = this.props.somoims.map(item => (
          <SomoimCard
            key={item.id}
            clickHandler={this.somoimCardClickHandler}
            somoim={item}
            forceRender={Math.random()}
          />
        ));
      } else {
        allList = this.props.somoims
          .filter(item => item.category === this.state.selected_category)
          .map(item => (
            <SomoimCard
              key={item.id}
              clickHandler={this.somoimCardClickHandler}
              somoim={item}
              forceRender={Math.random()}
            />
          ));
      }
    }

    return (
      <div className="SomoimMain">
        <Header />
        <div className="SomoimList">
          <h1
            style={{
              fontWeight: "bold"
            }}
          >
            추천 소모임
          </h1>
          <div>
            <div className="card-flex-container">
              <div className="SomoimCard">
                {this.state.recommendedListPageNum * 4 + 0 <
                recommendedList.length
                  ? recommendedList[this.state.recommendedListPageNum * 4 + 0]
                  : ""}
              </div>
              <div className="SomoimCard">
                {this.state.recommendedListPageNum * 4 + 1 <
                recommendedList.length
                  ? recommendedList[this.state.recommendedListPageNum * 4 + 1]
                  : ""}
              </div>
              <div className="SomoimCard">
                {this.state.recommendedListPageNum * 4 + 2 <
                recommendedList.length
                  ? recommendedList[this.state.recommendedListPageNum * 4 + 2]
                  : ""}
              </div>
              <div className="SomoimCard">
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
        <div className="SomoimList" style={{ marginBottom: "25px" }}>
          <div>
            <h1
              style={{
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              모든 소모임
            </h1>
            {this.props.loggedUser && (
              <Button
                className="somoim-create-button"
                variant="outline-primary"
                size="lg"
                style={{ display: "inline-block", float: "right" }}
                onClick={this.somoimCreateClickHandler}
              >
                Do you want make your own somoim?
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
              <div className="SomoimCard">
                {this.state.allListPageNum * 4 + 0 < allList.length
                  ? allList[this.state.allListPageNum * 4 + 0]
                  : ""}
              </div>
              <div className="SomoimCard">
                {this.state.allListPageNum * 4 + 1 < allList.length
                  ? allList[this.state.allListPageNum * 4 + 1]
                  : ""}
              </div>
              <div className="SomoimCard">
                {this.state.allListPageNum * 4 + 2 < allList.length
                  ? allList[this.state.allListPageNum * 4 + 2]
                  : ""}
              </div>
              <div className="SomoimCard">
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

        <SomoimDetail
          show={this.state.somoimDetailShow}
          somoim={selectedSomoim}
          closeHandler={this.somoimDetailCloseHandler}
          forceRender={Math.random()}
        />

        {somoim_create}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    somoims: state.somoim.somoims,
    categories: state.category.categories,
    loggedUser: state.user.loggedUser,
    recommendedSomoims: state.user.recommendedSomoims,
    likedSomoims: state.user.likedSomoims,
    joinedSomoims: state.user.joinedSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSomoimList: () => dispatch(actionCreators.getSomoimList()),

    getCategoryList: () => dispatch(actionCreators.getCategoryList()),
    getTagList: () => dispatch(actionCreators.getTagList()),
    getDeptList: () => dispatch(actionCreators.getDeptList()),
    getMajorList: () => dispatch(actionCreators.getMajorList()),

    onGetRecommendedSomoims: user =>
      dispatch(actionCreators.getRecommendedSomoims(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimMain));

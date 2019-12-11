import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../Header/Header";
import SomoimTitleSearchBar from "./SomoimTitleSearchBar";
import SomoimCard from "../Somoim/SomoimCard";
import SomoimDetail from "../Somoim/SomoimDetail";

import "./SomoimTitleSearch.css";

class SomoimTitleSearch extends React.Component {
  state = {
    selectedSomoimID: null,
    somoimDetailShow: false
  };

  somoimDetailCloseHandler = () => {
    this.setState({
      ...this.state,
      somoimDetailShow: false
    });
  };

  somoimCardClickHandler = id => {
    this.setState({
      ...this.state,
      selectedSomoimID: id,
      somoimDetailShow: true
    });
  };

  render() {
    let selectedSomoim;
    if (this.props.somoims) {
      selectedSomoim = this.props.somoims.filter(
        a => a.id === this.state.selectedSomoimID
      )[0];
    }

    let somoimTitleSearchResultList = [];
    if (this.props.somoims) {
      somoimTitleSearchResultList = this.props.somoims
        .filter(item => item.title === this.props.match.params.search_key)
        .map(item => (
          <SomoimCard
            key={item.id}
            forceRender={Math.random()}
            somoim={item}
            clickHandler={this.somoimCardClickHandler}
          />
        ));
    }

    return (
      <div className="SomoimTitleSearch">
        <Header />
        <SomoimTitleSearchBar />
        <div className="SomoimList" style={{ marginBottom: "25px" }}>
          <div>
            <h1
              style={{
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              &apos;
              {this.props.match.params.search_key}
              &apos; 소모임명 검색 결과:
            </h1>
          </div>
          {somoimTitleSearchResultList.length === 0 ? (
            <div>검색하신 소모임이 없습니다.</div>
          ) : (
            <div>
              <div className="card-flex-container">
                <div className="SomoimCard">
                  {somoimTitleSearchResultList[0]}
                </div>
                <div className="SomoimCard"></div>
                <div className="SomoimCard"></div>
                <div className="SomoimCard"></div>
              </div>
            </div>
          )}
        </div>

        <SomoimDetail
          show={this.state.somoimDetailShow}
          forceRender={Math.random()}
          closeHandler={this.somoimDetailCloseHandler}
          somoim={selectedSomoim}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    somoims: state.somoim.somoims
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimTitleSearch));

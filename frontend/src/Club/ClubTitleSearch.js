import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../Header/Header";
import ClubCard from "../Club/ClubCard";
import ClubDetail from "../Club/ClubDetail";
import ClubTitleSearchBar from "./ClubTitleSearchBar";

import "./ClubTitleSearch.css";

class ClubTitleSearch extends React.Component {
  state = {
    clubDetailShow: false,
    selectedClubID: null
  };

  clubDetailCloseHandler = () => {
    this.setState({
      ...this.state,
      clubDetailShow: false
    });
  };

  clubCardClickHandler = id => {
    this.setState({
      ...this.state,
      selectedClubID: id,
      clubDetailShow: true
    });
  };

  render() {
    let clubTitleSearchResultList = [];
    if (this.props.clubs) {
      clubTitleSearchResultList = this.props.clubs
        .filter(
          item =>
            String(item.name) === String(this.props.match.params.search_key)
        )
        .map(item => (
          <ClubCard
            className="clubcard"
            forceRender={Math.random()}
            key={item.id}
            club={item}
            clickHandler={this.clubCardClickHandler}
          />
        ));
    }

    let selected_club;
    if (this.props.clubs) {
      selected_club = this.props.clubs.filter(
        a => a.id === this.state.selectedClubID
      )[0];
    }

    return (
      <div className="ClubTitleSearch">
        <Header />
        <ClubTitleSearchBar />
        <div className="ClubTitleSearchResult" style={{ marginBottom: "25px" }}>
          <div>
            <h1
              style={{
                display: "inline-block",
                fontWeight: "bold"
              }}
            >
              &apos;
              {this.props.match.params.search_key}
              &apos; 동아리명 검색 결과:
            </h1>
          </div>
          {clubTitleSearchResultList.length === 0 ? (
            <div>검색하신 동아리가 없습니다.</div>
          ) : (
            <div>
              <div className="card-flex-container">
                <div className="ClubCard">{clubTitleSearchResultList[0]}</div>
                <div className="ClubCard"></div>
                <div className="ClubCard"></div>
                <div className="ClubCard"></div>
              </div>
            </div>
          )}
        </div>

        <ClubDetail
          forceRender={Math.random()}
          show={this.state.clubDetailShow}
          closeHandler={this.clubDetailCloseHandler}
          club={selected_club}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clubs: state.club.clubs
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubTitleSearch));

import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../Header/Header";
import ClubCard from "../Club/ClubCard";
import ClubDetail from "../Club/ClubDetail";
import * as actionCreators from "../store/actions/index";

import "./ClubTagSearch.css";

class ClubTagSearch extends React.Component {
  state = {
    clubDetailShow: false,
    selectedClubID: null,
    clubTagSearchResultListPageNum: 0
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

  clubCardGenerator = (list, index) => {
    return (
      <div className="ClubCard">{index < list.length ? list[index] : ""}</div>
    );
  };

  listPageChangeBarGenerator = list => {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          className="changePage"
          onClick={() => {
            if (this.state.clubTagSearchResultListPageNum > 0)
              this.setState({
                ...this.state,
                clubTagSearchResultListPageNum:
                  this.state.clubTagSearchResultListPageNum - 1
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
              this.state.clubTagSearchResultListPageNum <
              Math.ceil(list.length / 4) - 1
            )
              this.setState({
                ...this.state,
                clubTagSearchResultListPageNum:
                  this.state.clubTagSearchResultListPageNum + 1
              });
          }}
        >
          다음 &raquo;
        </div>
      </div>
    );
  };

  render() {
    let selected_club;
    if (this.props.clubs) {
      selected_club = this.props.clubs.filter(
        a => a.id === this.state.selectedClubID
      )[0];
    }

    let clubTagSearchResultList = [];
    if (this.props.clubs) {
      clubTagSearchResultList = this.props.clubs
        .filter(item =>
          item.tags.includes(parseInt(this.props.match.params.search_key))
        )
        .map(item => (
          <ClubCard
            key={item.id}
            clickHandler={this.clubCardClickHandler}
            club={item}
            forceRender={Math.random()}
          />
        ));
    }

    return (
      <div className="ClubTagSearch">
        <Header />
        <div className="ClubTagSearchResult" style={{ marginBottom: "25px" }}>
          <div>
            <h1
              style={{
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              &apos;
              {this.props.tags[this.props.match.params.search_key - 1].name}
              &apos; 태그 검색 결과:
            </h1>
          </div>
          <div>
            <div className="card-flex-container">
              {this.clubCardGenerator(
                clubTagSearchResultList,
                this.state.clubTagSearchResultListPageNum * 4 + 0
              )}
              {this.clubCardGenerator(
                clubTagSearchResultList,
                this.state.clubTagSearchResultListPageNum * 4 + 1
              )}
              {this.clubCardGenerator(
                clubTagSearchResultList,
                this.state.clubTagSearchResultListPageNum * 4 + 2
              )}
              {this.clubCardGenerator(
                clubTagSearchResultList,
                this.state.clubTagSearchResultListPageNum * 4 + 3
              )}
            </div>
            {this.listPageChangeBarGenerator(clubTagSearchResultList)}
          </div>
        </div>

        <ClubDetail
          show={this.state.clubDetailShow}
          club={selected_club}
          closeHandler={this.clubDetailCloseHandler}
          forceRender={Math.random()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clubs: state.club.clubs,
    tags: state.tag.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubTagSearch));

import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../Header/Header";
import ClubCard from "../Club/ClubCard";
import ClubDetail from "../Club/ClubDetail";

import "./ClubTagSearch.css";

class ClubTagSearch extends React.Component {
  state = {
    clubTagSearchResultListPageNum: 0,
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

  clubCardGenerator = (list, index) => {
    return (
      <div className="ClubCard">{index < list.length ? list[index] : ""}</div>
    );
  };

  render() {
    let clubTagSearchResultList = [];
    if (this.props.clubs) {
      clubTagSearchResultList = this.props.clubs
        .filter(item =>
          item.tags.includes(parseInt(this.props.match.params.search_key))
        )
        .map(item => (
          <ClubCard
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

    let selected_tag = "";

    if (this.props.tags && this.props.match.params.search_key) {
      selected_tag = this.props.tags.filter(
        tag => tag.id == this.props.match.params.search_key
      )[0].name;
    }

    return (
      <div className="clubTagSearch">
        <Header />
        <div className="ClubTagSearchResult" style={{ marginBottom: "25px" }}>
          <div>
            <h1
              style={{
                display: "inline-block",
                fontWeight: "bold"
              }}
            >
              &apos;
              {selected_tag}
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
    tags: state.tag.tags,
    clubs: state.club.clubs
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubTagSearch));

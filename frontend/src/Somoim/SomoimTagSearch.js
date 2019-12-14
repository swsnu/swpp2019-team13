import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../Header/Header";
import SomoimCard from "../Somoim/SomoimCard";
import SomoimDetail from "../Somoim/SomoimDetail";

import "./SomoimTagSearch.css";

class SomoimTagSearch extends React.Component {
  state = {
    selectedSomoimID: null,
    somoimTagSearchResultListPageNum: 0,
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

  listPageChangeBarGenerator = list => {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          className="changePage"
          onClick={() => {
            if (this.state.somoimTagSearchResultListPageNum > 0)
              this.setState({
                ...this.state,
                somoimTagSearchResultListPageNum:
                  this.state.somoimTagSearchResultListPageNum - 1
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
              this.state.somoimTagSearchResultListPageNum <
              Math.ceil(list.length / 4) - 1
            )
              this.setState({
                ...this.state,
                somoimTagSearchResultListPageNum:
                  this.state.somoimTagSearchResultListPageNum + 1
              });
          }}
        >
          다음 &raquo;
        </div>
      </div>
    );
  };

  somoimCardGenerator = (list, index) => {
    return (
      <div className="SomoimCard">{index < list.length ? list[index] : ""}</div>
    );
  };

  render() {
    let somoimTagSearchResultList = [];
    if (this.props.somoims) {
      somoimTagSearchResultList = this.props.somoims
        .filter(item =>
          item.tags.includes(parseInt(this.props.match.params.search_key))
        )
        .map(item => (
          <SomoimCard
            key={item.id}
            forceRender={Math.random()}
            somoim={item}
            clickHandler={this.somoimCardClickHandler}
          />
        ));
    }

    let selectedSomoim;
    if (this.props.somoims) {
      selectedSomoim = this.props.somoims.filter(
        a => a.id === this.state.selectedSomoimID
      )[0];
    }
    let selected_tag = "";
    if (this.props.match.params.search_key) selected_tag = this.props.tags[this.props.match.params.search_key - 1].name;
    return (
      <div className="somoimTagSearch">
        <Header />
        <div className="SomoimList" style={{ marginBottom: "25px" }}>
          <div>
            <h1
              style={{
                fontWeight: "bold",
                display: "inline-block"
              }}
            >
              &apos;
              {selected_tag}
              &apos; 태그 검색 결과:
            </h1>
          </div>
          <div>
            <div className="card-flex-container">
              {this.somoimCardGenerator(
                somoimTagSearchResultList,
                this.state.somoimTagSearchResultListPageNum * 4 + 0
              )}
              {this.somoimCardGenerator(
                somoimTagSearchResultList,
                this.state.somoimTagSearchResultListPageNum * 4 + 1
              )}
              {this.somoimCardGenerator(
                somoimTagSearchResultList,
                this.state.somoimTagSearchResultListPageNum * 4 + 2
              )}
              {this.somoimCardGenerator(
                somoimTagSearchResultList,
                this.state.somoimTagSearchResultListPageNum * 4 + 3
              )}
            </div>
            {this.listPageChangeBarGenerator(somoimTagSearchResultList)}
          </div>
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
    tags: state.tag.tags,
    somoims: state.somoim.somoims
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimTagSearch));

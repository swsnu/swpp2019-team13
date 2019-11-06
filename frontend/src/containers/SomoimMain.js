import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../components/Header";
import SomoimCard from "../components/SomoimCard";
import SomoimDetail from "../components/SomoimDetail";
import SomoimCreate from "../components/SomoimCreate";
import * as actionCreators from "../store/actions/index";

class SomoimMain extends React.Component {
  state = {
    somoimDetailShow: false,
    somoimCreateShow: false,
    selectedSomoim: null,
    selected_category: 0
  };

  componentDidMount() {
    this.props.getSomoimList();
    this.props.getCategoryList();
  }
  somoimCardClickHandler = id => {
    this.setState({
      ...this.state,
      somoimDetailShow: true,
      selectedSomoim: this.props.somoims[id - 1]
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
    let categoryList, somoim_create;
    if (this.props.categories) {
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
      somoim_create = (
        <SomoimCreate
          show={this.state.somoimCreateShow}
          closeHandler={this.somoimCreateCloseHandler}
        />
      );
    }

    let recommendedList, allList;
    if (this.props.somoims) {
      recommendedList = this.props.somoims.map(item => (
        <Col sm="4" key={item.id} style={{ paddingLeft: 1, paddingRight: 1 }}>
          <SomoimCard
            clickHandler={this.somoimCardClickHandler}
            somoim={item}
          />
        </Col>
      ));

      if (this.state.selected_category === 0) {
        allList = this.props.somoims.map(item => (
          <Col sm="5" key={item.id} style={{ paddingLeft: 1, paddingRight: 1 }}>
            <SomoimCard
              clickHandler={this.somoimCardClickHandler}
              somoim={item}
            />
          </Col>
        ));
      } else {
        allList = this.props.somoims
          .filter(item => item.category === this.state.selected_category)
          .map(item => (
            <Col
              sm="5"
              key={item.id}
              style={{ paddingLeft: 1, paddingRight: 1 }}
            >
              <SomoimCard
                clickHandler={this.somoimCardClickHandler}
                somoim={item}
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
            <h2>Recommended Somoims</h2>
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
            <h2>All Somoims</h2>
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
          </Row>
          <br />
          <Row>
            <Col xs="10" style={{ paddingLeft: 0, paddingRight: 0 }}>
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
            </Col>
            <Col>
              {this.props.loggedUser && (
                <Button
                  className="somoim-create-button"
                  variant="outline-primary"
                  size="lg"
                  onClick={this.somoimCreateClickHandler}
                >
                  +
                </Button>
              )}
            </Col>
          </Row>
        </Container>

        <SomoimDetail
          show={this.state.somoimDetailShow}
          somoim={this.state.selectedSomoim}
          closeHandler={this.somoimDetailCloseHandler}
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
    loggedUser: state.user.loggedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSomoimList: () => dispatch(actionCreators.getSomoimList()),
    getCategoryList: () => dispatch(actionCreators.getCategoryList())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimMain));

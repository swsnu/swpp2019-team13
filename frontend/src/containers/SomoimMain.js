import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../components/Header";
import SomoimCard from "../components/SomoimCard";
import SomoimDetail from "../components/SomoimDetail";
import SomoimCreate from "../components/SomoimCreate";

class SomoimMain extends React.Component {
  state = {
    somoimDetailShow: false,
    somoimCreateShow: false,
    selectedSomoim: null
  };

  somoimCardClickHandler = id => {
    this.setState({
      ...this.state,
      somoimDetailShow: true,
      selectedSomoim: this.props.somoims[id]
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
    let categoryList;
    if (this.props.categories) {
      categoryList = this.props.categories.map(item => (
        <Button key={item.id} variant="outline-secondary">
          {item.name}
        </Button>
      ));
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

      allList = this.props.somoims.map(item => (
        <Col sm="5" key={item.id} style={{ paddingLeft: 1, paddingRight: 1 }}>
          <SomoimCard
            clickHandler={this.somoimCardClickHandler}
            somoim={item}
          />
        </Col>
      ));
    }

    return (
      <div>
        <Container>
          <Row>
            <Header />
          </Row>
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
          <Row>{categoryList}</Row>
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
              <Button
                variant="outline-primary"
                size="lg"
                onClick={this.somoimCreateClickHandler}
              >
                +
              </Button>
            </Col>
          </Row>
        </Container>

        <SomoimDetail
          show={this.state.somoimDetailShow}
          somoim={this.state.selectedSomoim}
          closeHandler={this.somoimDetailCloseHandler}
        />

        <SomoimCreate
          show={this.state.somoimCreateShow}
          closeHandler={this.somoimCreateCloseHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    somoims: state.somoim.somoims,
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimMain));

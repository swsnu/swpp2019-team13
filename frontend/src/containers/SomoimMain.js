import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../components/Header";
import SomoimCard from "../components/SomoimCard";
import SomoimDetail from "../components/SomoimDetail";

class SomoimMain extends React.Component {
  state = { somoimDetailShow: false, selectedSomoim: null };

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
        <Col sm="4" key={item.id}>
          <SomoimCard
            clickHandler={this.somoimCardClickHandler}
            somoim={item}
          />
        </Col>
      ));

      allList = this.props.somoims.map(item => (
        <Col sm="4" key={item.id}>
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
          <Row>{recommendedList}</Row>
          <br />
          <br />
          <Row>
            <h2>All Somoims</h2>
          </Row>
          <Row>{categoryList}</Row>
          <br />
          <Row>{allList}</Row>
        </Container>

        <SomoimDetail
          show={this.state.somoimDetailShow}
          somoim={this.state.selectedSomoim}
          closeHandler={this.somoimDetailCloseHandler}
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

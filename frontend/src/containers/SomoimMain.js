import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../components/Header";
import SomoimCard from "../components/SomoimCard";
import SomoimDetail from "../components/SomoimDetail";
import SomoimCreate from "../components/SomoimCreate";
import axios from "axios";

class SomoimMain extends React.Component {
  state = {
    somoimDetailShow: false,
    somoimCreateShow: false,
    selectedSomoim: null,
    recommendedList: [],
    allList: [],
    somoimList: [],
    categoryList: null
  };

  somoimCardClickHandler = id => {
    this.setState({
      ...this.state,
      somoimDetailShow: true,
      selectedSomoim: this.state.somoimList[id - 1]
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
  componentDidMount() {
    axios.get("/api/somoim/list/").then(
      response => {
        console.log(response.data[0]);
        this.setState({
          ...this.state,
          recommendedList: response.data.map(item => (
            <Col
              sm="5"
              key={item.pk}
              style={{ paddingLeft: 1, paddingRight: 1 }}
            >
              <SomoimCard
                clickHandler={this.somoimCardClickHandler}
                somoim={item}
              />
            </Col>
          )),
          allList: response.data.map(item => (
            <Col
              sm="5"
              key={item.pk}
              style={{ paddingLeft: 1, paddingRight: 1 }}
            >
              <SomoimCard
                clickHandler={this.somoimCardClickHandler}
                somoim={item}
              />
            </Col>
          )),
          somoimList: response.data
          /*
          categoryList = response.data..map(item => (
            <Button
              className="category-button"
              key={item.id}
              variant="outline-secondary"
            >
              {item.name}
            </Button>
          ));*/
        });
      },
      error => {
        console.log(error);
      }
    );
    axios.get("/api/category/list/").then(
      response => {
        console.log(response.data[0]);
        this.setState({
          ...this.state,
          categoryList: response.data.map(item => (
            <Button
              className="category-button"
              key={item.id}
              variant="outline-secondary"
            >
              {item.name}
            </Button>
          ))
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    let somoim_create = (
      <SomoimCreate
        show={this.state.somoimCreateShow}
        closeHandler={this.somoimCreateCloseHandler}
      />
    );

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
              {this.state.recommendedList}
            </div>
          </Row>
          <br />
          <br />
          <Row>
            <h2>All Somoims</h2>
          </Row>
          <Row>{this.state.categoryList}</Row>
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
                {this.state.allList}
              </div>
            </Col>
            <Col>
              <Button
                className="somoim-create-button"
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
        {somoim_create}
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

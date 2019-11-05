import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../components/Header";
import ClubCard from "../components/ClubCard";
import ClubDetail from "../components/ClubDetail";
import ClubRegister from "../components/ClubRegister";
import axios from "axios";

class ClubMain extends React.Component {
  state = {
    ClubDetailShow: false,
    ClubRegisterShow: false,
    selectedClub: null,
    recommendedList: [],
    allList: [],
    clubList: [],
    categoryList: null
  };
  componentDidMount() {
    axios.get("/api/club/list/").then(
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
              <ClubCard clickHandler={this.ClubCardClickHandler} club={item} />
            </Col>
          )),
          allList: response.data.map(item => (
            <Col
              sm="5"
              key={item.pk}
              style={{ paddingLeft: 1, paddingRight: 1 }}
            >
              <ClubCard clickHandler={this.ClubCardClickHandler} club={item} />
            </Col>
          )),
          clubList: response.data
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
  ClubCardClickHandler = id => {
    this.setState({
      ...this.state,
      ClubDetailShow: true,
      selectedClub: this.state.clubList[id - 1]
    });
  };

  ClubDetailCloseHandler = () => {
    this.setState({
      ...this.state,
      ClubDetailShow: false
    });
  };

  ClubRegisterClickHandler = () => {
    this.setState({
      ...this.state,
      ClubRegisterShow: true
    });
  };

  ClubRegisterCloseHandler = () => {
    this.setState({
      ...this.state,
      ClubRegisterShow: false
    });
  };
  render() {
    let RegisterButton;
    RegisterButton = (
      <ClubRegister
        show={this.state.ClubRegisterShow}
        closeHandler={this.ClubRegisterCloseHandler}
      />
    );
    /*
    const getclublist = async () => {
      try {
        return await axios.get("/api/club/list/");
      } catch (error) {
        console.error(error);
      }
    };
    const clublist = async () => {
      const clubs = await getclublist();
    };
    clublist();
    */

    return (
      <div>
        <Header />
        <Container>
          <Row>
            <h2>Recommended Clubs</h2>
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
            <h2>All Clubs</h2>
          </Row>
          <Row>
            {this.state.categoryList}
            <Col>
              <Button
                className="club-create-button"
                variant="outline-primary"
                size="lg"
                onClick={this.ClubRegisterClickHandler}
              >
                Cannot find your club?
              </Button>
            </Col>
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
                {this.state.allList}
              </div>
            </Col>
          </Row>
        </Container>

        <ClubDetail
          show={this.state.ClubDetailShow}
          club={this.state.selectedClub}
          closeHandler={this.ClubDetailCloseHandler}
        />

        {RegisterButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Clubs: state.club.clubs,
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubMain));

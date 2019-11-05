import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

class SomoimCard extends React.Component {
  state = {
    tagnameList: null
  };
  componentDidMount() {
    axios.get("/api/tag/list/").then(
      response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          tagnameList: response.data
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    let somoim = this.props.somoim;
    let percentage =
      (somoim.fields.currentJoiner / somoim.fields.goalJoiner) * 100;
    let tagList;
    if (this.state.tagnameList) {
      tagList = somoim.fields.tags.map(item => (
        <Button key={item} variant="outline-primary">
          {"#" + this.state.tagnameList[item - 1].name}
        </Button>
      ));
    }
    return (
      <Card
        onClick={() => {
          this.props.clickHandler(somoim.pk);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col xs="5">
                <CircularProgressbar
                  value={percentage}
                  text={percentage + "%"}
                />
              </Col>
              <Col>
                <Row>
                  <h2>{somoim.fields.title}</h2>
                  <Col md={{ offset: 1 }}>
                    <h4>{"👍 " + somoim.fields.likes}</h4>
                  </Col>
                </Row>
                <Row>{tagList}</Row>
                <br />
                <Row>{somoim.fields.summary}</Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tag.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCard));

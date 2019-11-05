import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import img1 from "../components/1.jpg";
import img2 from "../components/2.png";
import img3 from "../components/3.png";
import axios from "axios";
class ClubCard extends React.Component {
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
    let club = this.props.club;
    let image = (
      <img
        src={"/media/" + club.fields.poster_img}
        width="100"
        height="100"
        alt=""
      />
    );
    console.log(club);
    let tagList;
    if (this.state.tagnameList) {
      tagList = club.fields.tags.map(item => (
        <Button key={item} variant="outline-primary">
          {"#" + this.state.tagnameList[item - 1].name}
        </Button>
      ));
    }
    return (
      <Card
        onClick={() => {
          this.props.clickHandler(club.pk);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col xs="5">{image}</Col>
              <Col>
                <Row>
                  <h2>{club.fields.name}</h2>
                  <Col md={{ offset: 1 }}>
                    <h4>{"👍 " + club.fields.likes}</h4>
                  </Col>
                </Row>
                <Row>{tagList}</Row>
                <br />
                <Row>{club.fields.summary}</Row>
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
)(withRouter(ClubCard));

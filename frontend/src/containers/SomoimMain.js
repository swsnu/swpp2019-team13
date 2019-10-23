import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col } from "reactstrap";

import Header from "../components/Header";
import SomoimCard from "../components/SomoimCard";

class SomoimMain extends React.Component {
  render() {
    let recommendedList, allList;
    if (this.props.somoims) {
      recommendedList = this.props.somoims.map(item => (
        <Col sm="4" key={item.id}>
          <SomoimCard
            title={item.title}
            content={item.content}
            tag={item.tag}
            goal={item.goal}
            current={item.current}
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
          <Row>
            <h2>All Somoims</h2>
          </Row>
        </Container>

        {/* <div>
          <button>Category 1</button>
          <button>Category 2</button>
          <button>Category 3</button>
          <button>Category 4</button>
          <button>Category 5</button>
        </div>
        <h1>----------------------</h1>
        <div>
          <button onClick={() => this.props.history.push("/article/create")}>
            +
          </button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { somoims: state.somoim.somoims };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimMain));

import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactDragList from "react-drag-list";
import { Card, Form } from "react-bootstrap";
// import * as actionCreators from "../store/actions/index";

class ApplicationFormTab extends Component {
  shortText = props => {
    return (
      <Card>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form.Control></Form.Control>
        </Card.Body>
      </Card>
    );
  };

  longText = props => {
    return (
      <Card>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form.Control as="textarea" rows="4"></Form.Control>
        </Card.Body>
      </Card>
    );
  };

  multiChoice = props => {
    let choices = props.choices.map((item, index) => {
      return (
        <Form.Check key={index} id={index} inline type="radio" label={item} />
      );
    });
    return (
      <Card>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form>{choices}</Form>
        </Card.Body>
      </Card>
    );
  };

  render() {
    return (
      <div>
        <ReactDragList
          handles={false}
          dataSource={[
            { type: "shortText", title: "short text 1" },
            { type: "shortText", title: "short text 2" },
            { type: "longText", title: "long text 1" },
            { type: "longText", title: "long text 2" },
            {
              type: "multiChoice",
              title: "multi choice 1",
              choices: ["choice1", "choice2", "choice3", "choice4", "choice5"]
            }
          ]}
          onUpdate={e => {
            console.log(e);
          }}
          row={(record, index) => {
            switch (record.type) {
              case "shortText":
                return this.shortText({ ...record, order: index });
              case "longText":
                return this.longText({ ...record, order: index });
              case "multiChoice":
                return this.multiChoice({ ...record, order: index });
              default:
                return <></>;
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicationFormTab));

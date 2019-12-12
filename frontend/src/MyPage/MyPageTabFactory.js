import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import ClubDetail from "../Club/ClubDetail";
import SomoimDetail from "../Somoim/SomoimDetail";

export const cardFactory = (item, idx, onClickHandler, button = null) => {
  return (
    <Card
      size="lg"
      key={idx}
      border="dark"
      style={{
        textAlign: "left",
        marginTop: "10px",
        marginBottom: "10px"
      }}
    >
      <Card.Body id="list-item-body" onClick={e => onClickHandler(e, item)}>
        <Row>
          <Col xs={10}>
            {item.title && <h1>{item.title}</h1>}
            {item.name && <h1>{item.name}</h1>}
            {item.summary}
          </Col>
          <Col>{button}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const ClubDetailFactory = (list, show, club, closeHandler) => {
  return (
    <div>
      {list}
      <ClubDetail
        show={show}
        club={club}
        closeHandler={closeHandler}
        forceRender={Math.random()}
      />
    </div>
  );
};

export const SomoimDetailFactory = (list, show, somoim, closeHandler) => {
  return (
    <div>
      {list}
      <SomoimDetail
        show={show}
        somoim={somoim}
        closeHandler={closeHandler}
        forceRender={Math.random()}
      />
    </div>
  );
};

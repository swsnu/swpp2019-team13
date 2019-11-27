import React from "react";
import { Card } from "react-bootstrap";
import SomoimDetail from "../Somoim/SomoimDetail";

export const cardFactory = (item, idx, onClickHandler, button = null) => {
  return (
    <Card
      size="lg"
      key={idx}
      border="primary"
      style={{
        textAlign: "left",
        marginTop: "10px",
        marginBottom: "10px"
      }}
    >
      <Card.Body id="list-item-body" onClick={e => onClickHandler(e, item)}>
        {item.title && <h1>{item.title}</h1>}
        {item.name && <h1>{item.name}</h1>}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {item.summary} {button}
      </Card.Body>
    </Card>
  );
};

import React from "react";
import { Card } from "react-bootstrap";

const newForm = (type, id, item) => {
  let newForm = {
    ...item,
    id: id,
    type: type
  };
  if (item.content && (type === "image" || type === "file")) {
    newForm = {
      ...newForm,
      fileName: item.content.substr(7, item.content.length)
    };
  }
  return newForm;
};

export const formMaker = selectedApplication => {
  let formList = [];
  let formID = 0;
  formList = formList.concat(
    selectedApplication.short_texts.map(item =>
      newForm("shortText", formID++, item)
    )
  );
  formList = formList.concat(
    selectedApplication.long_texts.map(item =>
      newForm("longText", formID++, item)
    )
  );
  formList = formList.concat(
    selectedApplication.multi_choices.map(item =>
      newForm("multiChoice", formID++, item)
    )
  );
  formList = formList.concat(
    selectedApplication.images.map(item => newForm("image", formID++, item))
  );
  formList = formList.concat(
    selectedApplication.files.map(item => newForm("file", formID++, item))
  );
  formList.sort((a, b) => (a.order > b.order ? 1 : -1));
  return formList;
};

export const multiChoiceCardFactory = (key, title, choices) => {
  return (
    <Card style={{ margin: "10px" }} key={key}>
      <Card.Header>{title}</Card.Header>
      <div
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          marginLeft: "20px",
          marginRight: "20px"
        }}
      >
        {choices}
      </div>
    </Card>
  );
};

export const imageCardFactory = (
  key,
  title,
  content,
  fileName,
  src,
  option = null
) => {
  return (
    <Card style={{ margin: "10px" }} key={key}>
      <Card.Header>{title}</Card.Header>
      <Card.Body style={{ textAlign: "center" }}>
        {content ? (
          <div>
            <img src={content} alt="" />
            <div style={{ fontSize: 11, marginBottom: "10px" }}>{fileName}</div>
          </div>
        ) : (
          <div>
            <img src={src} width="100" height="100" alt="" />
          </div>
        )}
        {option}
      </Card.Body>
    </Card>
  );
};

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

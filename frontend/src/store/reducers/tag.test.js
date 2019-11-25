import reducer from "./tag";
import * as actionTypes from "../actions/actionTypes";

describe("tag Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      tags: [],
      extracted_tag: []
    });
  });

  it("should get all tag list", () => {
    const stubTagList = [
      {
        id: 0,
        name: "TAG_1"
      },
      {
        id: 1,
        name: "TAG_2"
      }
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_TAG_LIST,
      tags: stubTagList
    });
    expect(newState).toEqual({
      tags: stubTagList,
      extracted_tag: []
    });
  });
});

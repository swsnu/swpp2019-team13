import reducer from "./tag";
import * as actionTypes from "../actions/actionTypes";

describe("tag Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      tags: [
        { id: 0, name: "friendship" },
        { id: 1, name: "love" },
        { id: 2, name: "sport" },
        { id: 3, name: "game" },
        { id: 4, name: "study" },
        { id: 5, name: "music" },
        { id: 6, name: "art" },
        { id: 7, name: "nothing" }
      ]
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
      tags: stubTagList
    });
  });
});

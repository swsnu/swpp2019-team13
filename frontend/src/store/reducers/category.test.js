import reducer from "./category";
import * as actionTypes from "../actions/actionTypes";

describe("category Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      categories: [
        {
          id: 0,
          name: "학술매체"
        },
        {
          id: 1,
          name: "취미교양"
        },
        {
          id: 2,
          name: "연행예술"
        },
        {
          id: 3,
          name: "인권봉사"
        },
        {
          id: 4,
          name: "무예운동"
        },
        {
          id: 5,
          name: "종교"
        },
        {
          id: 6,
          name: "운동부"
        }
      ]
    });
  });

  it("should get all category list", () => {
    const stubCategoryList = [
      {
        id: 0,
        name: "C1"
      },
      {
        id: 1,
        name: "C2"
      }
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_CATEGORY_LIST,
      categories: stubCategoryList
    });
    expect(newState).toEqual({
      categories: stubCategoryList
    });
  });
});

import reducer from "./somoim";
import * as actionTypes from "../actions/actionTypes";

const stubSomoim = {
  id: 4,
  title: "TEST_TITLE4",
  summary: "TEST_SUMMARY",
  description: "TEST_DESCRIPTION",
  category: 1,
  available_major: [],
  session_day: [],
  available_semester: 1,
  tags: [],
  joiners: [],
  likers: [],
  goalJoiner: 20
};

const initialstate = {
  somoims: [
    {
      id: 0,
      title: "TEST_TITLE0",
      summary: "TEST_SUMMARY",
      description: "TEST_DESCRIPTION",
      category: 1,
      available_major: [],
      session_day: [],
      available_semester: 1,
      tags: [],
      joiners: [],
      likers: [],
      goalJoiner: 20
    },
    {
      id: 1,
      title: "TEST_TITLE1",
      summary: "TEST_SUMMARY",
      description: "TEST_DESCRIPTION",
      category: 1,
      available_major: [],
      session_day: [],
      available_semester: 1,
      tags: [],
      joiners: [],
      likers: [],
      goalJoiner: 20
    },
    {
      id: 2,
      title: "TEST_TITLE2",
      summary: "TEST_SUMMARY",
      description: "TEST_DESCRIPTION",
      category: 1,
      available_major: [],
      session_day: [],
      available_semester: 1,
      tags: [],
      joiners: [],
      likers: [],
      goalJoiner: 20
    },
    {
      id: 3,
      title: "TEST_TITLE3",
      summary: "TEST_SUMMARY",
      description: "TEST_DESCRIPTION",
      category: 1,
      available_major: [],
      session_day: [],
      available_semester: 1,
      tags: [],
      joiners: [],
      likers: [],
      goalJoiner: 20
    }
  ],
  selectedSomoim: null
};

const initialsomoims = [
  {
    id: 0,
    title: "TEST_TITLE0",
    summary: "TEST_SUMMARY",
    description: "TEST_DESCRIPTION",
    category: 1,
    available_major: [],
    session_day: [],
    available_semester: 1,
    tags: [],
    joiners: [],
    likers: [],
    goalJoiner: 20
  },
  {
    id: 1,
    title: "TEST_TITLE1",
    summary: "TEST_SUMMARY",
    description: "TEST_DESCRIPTION",
    category: 1,
    available_major: [],
    session_day: [],
    available_semester: 1,
    tags: [],
    joiners: [],
    likers: [],
    goalJoiner: 20
  },
  {
    id: 2,
    title: "TEST_TITLE2",
    summary: "TEST_SUMMARY",
    description: "TEST_DESCRIPTION",
    category: 1,
    available_major: [],
    session_day: [],
    available_semester: 1,
    tags: [],
    joiners: [],
    likers: [],
    goalJoiner: 20
  },
  {
    id: 3,
    title: "TEST_TITLE3",
    summary: "TEST_SUMMARY",
    description: "TEST_DESCRIPTION",
    category: 1,
    available_major: [],
    session_day: [],
    available_semester: 1,
    tags: [],
    joiners: [],
    likers: [],
    goalJoiner: 20
  }
];

describe("Somoim Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(initialstate, {}); // initialize
    expect(newState).toEqual({
      somoims: initialsomoims,
      selectedSomoim: null
    });
  });

  it("should get all somoims", () => {
    const stubSomimList = [
      {
        id: 0,
        title: "TEST_TITLE4",
        summary: "TEST_SUMMARY",
        description: "TEST_DESCRIPTION",
        category: 1,
        available_major: [],
        session_day: [],
        available_semester: 1,
        tags: [],
        joiners: [],
        likers: [],
        goalJoiner: 20
      }
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_SOMOIM_LIST,
      somoims: stubSomimList
    });
    expect(newState).toEqual({
      somoims: stubSomimList,
      selectedSomoim: null
    });
  });
  /*
    it("should get specific somoim", () => {
      const newState = reducer(initialsomoims, {
        type: actionTypes.GET_SOMOIM_BY_ID,
        somoim: stubSomoim
      });
      expect(newState).toEqual({
        somoims: initialsomoims,
        selectedSomoim: stubSomoim
      });
    });
  */
  it("should post article", () => {
    const newState = reducer(initialstate, {
      type: actionTypes.POST_SOMOIM,
      id: stubSomoim.id,
      title: stubSomoim.title,
      summary: stubSomoim.summary,
      category: stubSomoim.category,
      description: stubSomoim.description,
      selected_dept: stubSomoim.selected_dept,
      available_major: stubSomoim.available_major,
      available_semester: stubSomoim.available_semester,
      goalJoiner: stubSomoim.goalJoiner,
      session_day: stubSomoim.session_day
    });
    expect(newState).toEqual({
      somoims: initialsomoims.concat(stubSomoim),
      selectedSomoim: null
    });
  });
});

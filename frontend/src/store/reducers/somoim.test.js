import reducer from "./somoim";
import * as actionTypes from "../actions/actionTypes";

const stubSomoim = {
  id: 4,
  title: "TEST_TITLE",
  summary: "TEST_SUMMARY",
  description: "TEST_DESCRIPTION",
  selected_dept: [0, 1],
  available_sem: 1,
  tags: [],
  goalJoiner: 20,
  currentJoiner: 0,
  likes: 0
};

const initialsomoims = [
  {
    id: 0,
    title: "Let's LoL!",
    summary: "Playing LoL together!! :D",
    description: "LoL\nLoL\nLol",
    selected_dept: [0, 1],
    available_sem: 1,
    tags: [0, 1],
    goalJoiner: 20,
    currentJoiner: 7,
    likes: 10
  },
  {
    id: 1,
    title: "Book lovers",
    summary: "We read books until we fall asleep..",
    description: "Actually, it's sleep somoim :)",
    selected_dept: [0, 1, 3, 4, 5],
    available_sem: 1,
    tags: [2, 3],
    goalJoiner: 10,
    currentJoiner: 3,
    likes: 5
  },
  {
    id: 2,
    title: "test somoim",
    summary: "i am testing the somoim list",
    description: "Me too bro",
    selected_dept: [0, 1, 3, 4, 5],
    available_sem: 3,
    tags: [4, 5],
    goalJoiner: 10,
    currentJoiner: 9,
    likes: 5
  },
  {
    id: 3,
    title: "301 assa somoim",
    summary: "We are assa in 301",
    description: "Sad..",
    selected_dept: [0, 1, 3, 4, 5],
    available_sem: 5,
    tags: [6, 7],
    goalJoiner: 10,
    currentJoiner: 1,
    likes: 5
  }
];

describe("Somoim Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      somoims: initialsomoims,
      selectedSomoim: null
    });
  });

  it("should get all somoims", () => {
    const stubSomimList = [
      {
        id: 0,
        title: "TEST_TITLE_1",
        summary: "TEST_SUMMARY_1",
        description: "TSET_DESCRIPTION_1",
        selected_dept: [0],
        available_sem: 3,
        tags: [1],
        goalJoiner: 10,
        currentJoiner: 1,
        likes: 5
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

  it("should get specific somoim", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_SOMOIM_BY_ID,
      somoim: stubSomoim
    });
    expect(newState).toEqual({
      somoims: initialsomoims,
      selectedSomoim: stubSomoim
    });
  });

  it("should post article", () => {
    const newState = reducer(undefined, {
      type: actionTypes.POST_SOMOIM,
      title: stubSomoim.title,
      summary: stubSomoim.summary,
      description: stubSomoim.description,
      selected_dept: stubSomoim.selected_dept,
      available_sem: stubSomoim.available_sem,
      goalJoiner: stubSomoim.goalJoiner
    });
    expect(newState).toEqual({
      somoims: initialsomoims.concat(stubSomoim),
      selectedSomoim: null
    });
  });
});

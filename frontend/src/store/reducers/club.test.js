import reducer from "./club";
import * as actionTypes from "../actions/actionTypes";

const stubClub = {
  id: 3,
  name: "SNUStone",
  content: "empty",
  clubmanager: "김지훈",
  selected_category: 0,
  auth_img_file: "1",
  tags: [],
  likes: 0
};

const initialclubs = [
  {
    id: 0,
    name: "SNUStone",
    content: "SNU Best HearthStone Club",
    clubmanager: "김지훈",
    selected_category: 0,
    auth_img_file: "1",
    isRegistered: true,
    tags: [0, 1],
    likes: 10
  },
  {
    id: 1,
    name: "SnuWOD",
    content: "SNU Best Training Club",
    clubmanager: "김동우",
    selected_category: 6,
    auth_img_file: "2",
    isRegistered: true,
    tags: [2, 3],
    likes: 15
  },

  {
    id: 2,
    name: "SnuLoL",
    content: "SNU Best LoL Club",
    clubmanager: "김도현",
    selected_category: 6,
    auth_img_file: "3",
    isRegistered: true,
    tags: [2, 3],
    likes: 20
  }
];

describe("Club Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      clubs: initialclubs,
      selectedClub: null
    });
  });

  it("should get all clubs", () => {
    const stubClubList = [
      {
        id: 0,
        name: "SNUStone",
        content: "SNU Best HearthStone Club",
        clubmanager: "김지훈",
        selected_category: 0,
        auth_img_file: "1",
        isRegistered: true,
        tags: [0, 1],
        likes: 10
      }
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_CLUB_LIST,
      clubs: stubClubList
    });
    expect(newState).toEqual({
      clubs: stubClubList,
      selectedClub: null
    });
  });

  it("should get specific club", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_CLUB_BY_ID,
      club: stubClub
    });
    expect(newState).toEqual({
      clubs: initialclubs,
      selectedClub: stubClub
    });
  });

  it("should post club", () => {
    const newState = reducer(undefined, {
      type: actionTypes.POST_CLUB,
      name: stubClub.name,
      clubmanager: stubClub.clubmanager,
      auth_img_file: stubClub.auth_img_file,
      selected_category: stubClub.selected_category
    });
    expect(newState).toEqual({
      clubs: initialclubs.concat(stubClub),
      selectedClub: null
    });
  });
});

import reducer from "./club";
import * as actionTypes from "../actions/actionTypes";

const stubClub = {
  id: 0,
  name: "SNUStone",
  content: "SNU Best HearthStone Club",
  clubmanager: "김지훈",
  selected_category: 0,
  auth_img: "1",
  isRegistered: true,
  tags: [0, 1],
  available_major: [1],
  hits: 0,
  likes: 10
};

const initialclubs = [
  {
    id: 0,
    name: "SNUStone",
    content: "SNU Best HearthStone Club",
    clubmanager: "김지훈",
    selected_category: 0,
    auth_img: "1",
    isRegistered: true,
    tags: [0, 1],
    available_major: [1],
    hits: 0,
    likes: 10
  },
  {
    id: 1,
    name: "SnuWOD",
    content: "SNU Best Training Club",
    clubmanager: "김동우",
    selected_category: 6,
    auth_img: "2",
    isRegistered: true,
    tags: [2, 3],
    available_major: [1],
    hits: 0,
    likes: 15
  },

  {
    id: 2,
    name: "SnuLoL",
    content: "SNU Best LoL Club",
    clubmanager: "김도현",
    selected_category: 6,
    auth_img: "3",
    isRegistered: true,
    tags: [2, 3],
    available_major: [1],
    hits: 0,
    likes: 20
  }
];
const initialstate = {
  clubs: [
    {
      id: 0,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      selected_category: 0,
      auth_img: "1",
      isRegistered: true,
      tags: [0, 1],
      available_major: [1],
      hits: 0,
      likes: 10
    },
    {
      id: 1,
      name: "SnuWOD",
      content: "SNU Best Training Club",
      clubmanager: "김동우",
      selected_category: 6,
      auth_img: "2",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      hits: 0,
      likes: 15
    },

    {
      id: 2,
      name: "SnuLoL",
      content: "SNU Best LoL Club",
      clubmanager: "김도현",
      selected_category: 6,
      auth_img: "3",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      hits: 0,
      likes: 20
    }
  ],
  selectedClub: null
};

describe("Club Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      clubs: [],
      selectedClub: null,
      selectedApplication: null,
      applicationForm: null
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
        auth_img: "1",
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
      selectedClub: null,
      selectedApplication: null,
      applicationForm: null
    });
  });

  it("should get specific club", () => {
    const newState = reducer(initialstate, {
      type: actionTypes.GET_CLUB_BY_ID,
      selectedClub: stubClub
    });
    expect(newState).toEqual({
      clubs: initialclubs,
      selectedClub: stubClub
    });
  });

  it("should get application form by id", () => {
    const newState = reducer(initialstate, {
      type: actionTypes.GET_APPLICATION_FORM_BY_ID,
      form: 1
    });
    expect(newState).toEqual({
      clubs: initialclubs,
      applicationForm: 1,
      selectedClub: null
    });
  });

  it("should put club information", () => {
    const newState = reducer(initialstate, {
      type: actionTypes.PUT_CLUB_INFORMATION
    });
    expect(newState).toEqual({
      clubs: initialclubs,
      selectedClub: null
    });
  });

  it("should get club application by ID", () => {
    const newState = reducer(initialstate, {
      type: actionTypes.GET_APPLICATION_BY_ID,
      form: 1
    });
    expect(newState).toEqual({
      clubs: initialclubs,
      selectedApplication: 1,
      selectedClub: null
    });
  });

  it("should add hits", () => {
    const newState = reducer(initialstate, {
      type: actionTypes.ADD_CLUB_HITCOUNT,
      club_id: 1
    });

    expect(newState).toEqual({
      clubs: [
        {
          id: 0,
          name: "SNUStone",
          content: "SNU Best HearthStone Club",
          clubmanager: "김지훈",
          selected_category: 0,
          auth_img: "1",
          isRegistered: true,
          tags: [0, 1],
          available_major: [1],
          hits: 0,
          likes: 10
        },
        {
          id: 1,
          name: "SnuWOD",
          content: "SNU Best Training Club",
          clubmanager: "김동우",
          selected_category: 6,
          auth_img: "2",
          isRegistered: true,
          tags: [2, 3],
          available_major: [1],
          hits: 1,
          likes: 15
        },

        {
          id: 2,
          name: "SnuLoL",
          content: "SNU Best LoL Club",
          clubmanager: "김도현",
          selected_category: 6,
          auth_img: "3",
          isRegistered: true,
          tags: [2, 3],
          available_major: [1],
          hits: 0,
          likes: 20
        }
      ],
      selectedClub: null
    });
  });
});

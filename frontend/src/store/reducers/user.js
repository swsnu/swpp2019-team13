import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [
    {
      id: 0,
      username: "test",
      email: "test@test.com",
      password: "test",
      dept: 0,
      major: 4,
      grade: 3,
      availableSemester: 2
    }
  ],
  loggedUser: null,
  likedClubs: [
    {
      id: 0,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      selected_category: 0,
      auth_img_file: "1",
      isRegistered: true,
      tag: [0, 1],
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
      tag: [2, 3],
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
      tag: [2, 3],
      likes: 20
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, loggedUser: action.loggedUser };
    case actionTypes.SIGN_OUT:
      return { ...state, loggedUser: null };
    case actionTypes.SIGN_UP:
      const newUser = {
        username: action.user.username,
        email: action.user.email,
        password: action.user.password,
        dept: action.user.dept,
        major: action.user.major,
        grade: action.user.grade,
        availableSemester: action.user.availableSemester
      };
      return { ...state, users: state.users.concat(newUser) };

    case actionTypes.GET_LIKED_CLUBS:
      return { ...state, likedClubs: action.clubs };

    default:
      break;
  }
  return state;
};

export default reducer;

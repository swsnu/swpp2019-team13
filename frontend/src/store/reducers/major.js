import * as actionTypes from "../actions/actionTypes";

const initialState = {
  majors: [
    {
      id: 0,
      dept_id: 0,
      name: "건설환경공학부"
    },
    {
      id: 1,
      dept_id: 0,
      name: "기계항공공학부"
    },
    {
      id: 2,
      dept_id: 0,
      name: "재료공학부"
    },
    {
      id: 3,
      dept_id: 0,
      name: "전기정보공학부"
    },
    {
      id: 4,
      dept_id: 0,
      name: "컴퓨터공학부"
    },
    {
      id: 5,
      dept_id: 0,
      name: "화학생물공학부"
    },
    {
      id: 6,
      dept_id: 0,
      name: "건축학과(건축학,건축공학)"
    },
    {
      id: 7,
      dept_id: 0,
      name: "산업공학과"
    },
    {
      id: 8,
      dept_id: 0,
      name: "에너지자원공학과"
    },
    {
      id: 9,
      dept_id: 0,
      name: "원자핵공학과"
    },
    {
      id: 9,
      dept_id: 0,
      name: "조선해양공학과"
    },
    {
      id: 10,
      dept_id: 1,
      name: "국어국문학과"
    },
    {
      id: 11,
      dept_id: 1,
      name: "중어국문학과"
    },
    {
      id: 12,
      dept_id: 1,
      name: "영어영문학과"
    },
    {
      id: 26,
      dept_id: 2,
      name: "수리과학부"
    },
    {
      id: 27,
      dept_id: 2,
      name: "통계학과"
    },
    {
      id: 28,
      dept_id: 2,
      name: "물리천문학부(물리학전공)"
    },
    {
      id: 36,
      dept_id: 3,
      name: "정치외교학부"
    },
    {
      id: 37,
      dept_id: 3,
      name: "경제학부"
    },
    {
      id: 38,
      dept_id: 3,
      name: "사회학과"
    },
    {
      id: 46,
      dept_id: 4,
      name: "경영학과"
    },
    {
      id: 47,
      dept_id: 5,
      name: "농경제사회학부"
    },
    {
      id: 48,
      dept_id: 5,
      name: "식물생산과학부"
    },
    {
      id: 49,
      dept_id: 5,
      name: "산림과학부"
    },
    {
      id: 54,
      dept_id: 6,
      name: "교육학과"
    },
    {
      id: 55,
      dept_id: 6,
      name: "국어교육과"
    },
    {
      id: 56,
      dept_id: 6,
      name: "영어교육과"
    },
    {
      id: 69,
      dept_id: 7,
      name: "소비자아동학부"
    },
    {
      id: 70,
      dept_id: 7,
      name: "식품영양학과"
    },
    {
      id: 71,
      dept_id: 7,
      name: "의류학과"
    },
    {
      id: 72,
      dept_id: 8,
      name: "의예과"
    },
    {
      id: 73,
      dept_id: 8,
      name: "의학과"
    },
    {
      id: 73,
      dept_id: 9,
      name: "수의예과"
    },
    {
      id: 74,
      dept_id: 9,
      name: "수의학과"
    },
    {
      id: 75,
      dept_id: 10,
      name: "약학과"
    },
    {
      id: 76,
      dept_id: 10,
      name: "제약학과"
    },
    {
      id: 77,
      dept_id: 11,
      name: "간호학과"
    },
    {
      id: 78,
      dept_id: 12,
      name: "성악과"
    },
    {
      id: 79,
      dept_id: 12,
      name: "작곡과"
    },
    {
      id: 80,
      dept_id: 12,
      name: "기악과"
    },
    {
      id: 81,
      dept_id: 12,
      name: "국악과"
    },
    {
      id: 82,
      dept_id: 13,
      name: "디자인학부"
    },
    {
      id: 83,
      dept_id: 13,
      name: "동양화과"
    },
    {
      id: 84,
      dept_id: 13,
      name: "서양화과"
    },
    {
      id: 85,
      dept_id: 13,
      name: "조소과"
    },
    {
      id: 86,
      dept_id: 14,
      name: "자유전공학부"
    }
  ]
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

export default reducer;

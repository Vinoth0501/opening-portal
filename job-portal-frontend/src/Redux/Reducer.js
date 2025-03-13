const { USER_NAME } = require("./ActionType");

const initialState = {
  nameOfUser: null,
};

const Reducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case USER_NAME:
      state = { ...state, nameOfUser: action.payload };
      break;
    default:
      state;
      break;
  }
  return state;
};
export default Reducer;

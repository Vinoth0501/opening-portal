import { USER_NAME } from "./ActionType";

export const userName = (data) => {
  return {
    type: USER_NAME,
    payload: data,
  };
};

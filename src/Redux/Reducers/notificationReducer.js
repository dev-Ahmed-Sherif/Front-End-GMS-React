import { notification } from "../types";

export function notificationReducer(state = { notification: "" }, action) {
  switch (action.type) {
    case notification:
      return { ...state, notification: action.payload };
    default:
      return { ...state };
  }
}

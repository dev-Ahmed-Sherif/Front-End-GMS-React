import { notification } from "../types";

export function setNotification(data) {
  return {
    type: notification,
    payload: data,
  };
}

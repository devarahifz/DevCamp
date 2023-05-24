import { ActionType } from "./auth_action";
const authReducer = (authentication = null, action = {}) => {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authentication;
    case ActionType.UNSET_AUTH_USER:
      return null;
    default:
      return authentication;
  }
};

export default authReducer;

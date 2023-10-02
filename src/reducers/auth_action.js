import { url } from "../configs/public_url";

const Login = async ({ email, kata_sandi, confirm_kata_sandi }) => {
  const test = await fetch(
    url +
      `/items/user?fields=*.*&filter[email][_eq]=${email}`,
  );
  const responseJson = await test.json();

  localStorage.setItem("email", responseJson.data[0].email);
  localStorage.setItem("idUser", responseJson.data[0].id);
  return responseJson.data[0].id;
};

const setToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

const setAuthenticationActionCreator = (authentication) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authentication,
    },
  };
};

const unsetAuthenticationActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authentication: null,
    },
  };
};

const asyncSetAuthentication = ({ email, kata_sandi, confirm_kata_sandi }) => {
  return async (dispatch) => {
    try {
      const token = await Login({ email, kata_sandi, confirm_kata_sandi });

      setToken(token);
      dispatch(setAuthenticationActionCreator(token));
    } catch (error) {
      alert(error.message);
    }
  };
};

const asyncUnsetAuthentication = () => {
  return (dispatch) => {
    dispatch(unsetAuthenticationActionCreator);
    setToken("");
  };
};

export {
  ActionType,
  setAuthenticationActionCreator,
  unsetAuthenticationActionCreator,
  asyncSetAuthentication,
  asyncUnsetAuthentication,
};

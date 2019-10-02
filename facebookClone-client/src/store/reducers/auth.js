const INITIAL_STATE = {
  user: {},
  isAuthenticated: false
};

export const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "SIGNUP_USER":
      return { ...state, user: payload };
    case "LOGIN_USER":
      return { ...state, user: payload, isAuthenticated: true };
    case "SET_CURRENT_USER":
      return { ...state, user: payload, isAuthenticated: !!Object.keys(payload).length };
    default:
      return state;
  }
};

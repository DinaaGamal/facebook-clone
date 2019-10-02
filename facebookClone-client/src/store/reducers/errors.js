export const errorsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "SERVER_ERROR":
      return { ...state, payload };
    default:
      return state;
  }
};

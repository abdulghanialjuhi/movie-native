export const movieReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return [...state, action.movie];
    case "REMOVE_WATCHLIST":
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  }
};

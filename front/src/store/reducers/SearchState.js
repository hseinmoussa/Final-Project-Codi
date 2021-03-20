const SearchState = (state = { state: '' }, action) => {
  switch (action.type) {
    case 'Search_State':
      return {
        state: action.payload
      };

    default:
      return state;
  }
};
export default SearchState;

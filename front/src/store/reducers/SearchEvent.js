const SearchEvent = (state = { event: '' }, action) => {
  switch (action.type) {
    case 'Search_Event':
      return {
        event: action.payload
      };

    default:
      return state;
  }
};
export default SearchEvent;

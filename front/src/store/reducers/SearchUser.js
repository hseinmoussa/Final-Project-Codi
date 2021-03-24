const SearchUser = (state = { user: '' }, action) => {
  switch (action.type) {
    case 'Search_User':
      return {
        user: action.payload
      };

    default:
      return state;
  }
};
export default SearchUser;

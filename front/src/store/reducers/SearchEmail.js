const SearchEmail = (state = { email: '' }, action) => {
  switch (action.type) {
    case 'Search_User_Email':
      return {
        email: action.payload
      };
    default:
      return state;
  }
};
export default SearchEmail;

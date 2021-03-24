const SearchEmailAdmin = (state = { email: '' }, action) => {
  switch (action.type) {
    case 'Search_Admin_Email':
      return {
        email: action.payload
      };
    default:
      return state;
  }
};
export default SearchEmailAdmin;

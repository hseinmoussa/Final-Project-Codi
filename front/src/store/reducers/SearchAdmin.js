const SearchAdmin = (state = { admin: '' }, action) => {
  switch (action.type) {
    case 'Search_Admin':
      return {
        admin: action.payload
      };

    default:
      return state;
  }
};
export default SearchAdmin;

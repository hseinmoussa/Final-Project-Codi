const SearchHobby = (state = { hobby: '' }, action) => {
  switch (action.type) {
    case 'Search_Hobby':
      return {
        hobby: action.payload
      };

    default:
      return state;
  }
};
export default SearchHobby;

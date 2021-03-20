const SearchCountry = (state = { country: '' }, action) => {
  switch (action.type) {
    case 'Search_Country':
      return {
        country: action.payload
      };

    default:
      return state;
  }
};
export default SearchCountry;

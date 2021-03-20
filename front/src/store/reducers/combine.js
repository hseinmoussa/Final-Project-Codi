import { combineReducers } from 'redux';
import SearchUser from './SearchUser';
import SearchEmail from './SearchEmail';

import SearchAdmin from './SearchAdmin';
import SearchEmailAdmin from './SearchEmailAdmin';
import SearchHobby from './SearchHobby';
import SearchCountry from './SearchCountry';
import SearchState from './SearchState';
import SearchEvent from './SearchEvent';

export default combineReducers({
  SearchUser,
  SearchEmail,
  SearchAdmin,
  SearchEmailAdmin,
  SearchHobby,
  SearchCountry,
  SearchState,
  SearchEvent
});

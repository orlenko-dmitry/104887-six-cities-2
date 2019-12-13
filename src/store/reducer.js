import {combineReducers} from 'redux';

import rData from './data/data.js';
import rFilters from './filters/filters.js';
import rUser from './user/user.js';

export default combineReducers({
  rData,
  rFilters,
  rUser,
});

import { combineReducers } from 'redux';

import global from './global';
import list from './list';
import player from './player';

const reducers = combineReducers({
    global,
    list,
    player
});

export default reducers;
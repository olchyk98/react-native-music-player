import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(
    reducers,
    {
        player: {
            isOpened: false
        }
    }
);

export default store;
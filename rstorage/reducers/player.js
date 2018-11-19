function reducer(state = {}, { type, payload }) {
    let a = Object.assign({}, state);

    switch(type) {
        case 'TOGGLE_PLAYER_VISIBILITY':
            if(payload) a.isOpened = payload;
            else a.isOpened = !a.isOpened;
        break;
        case 'SET_PLAYER_MODULE':
            a.module = payload;
        break;
        default:break;
    }

    return a;
}

export default reducer;
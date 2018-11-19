function reducer(state = {}, { type, payload }) {
    let a = Object.assign({}, state);

    switch(type) {
        case 'TOGGLE_PLAYER_VISIBILITY':
            {
                b = "isOpened";
                if(payload) a.isOpened = payload;
                else a.isOpened = !a.isOpened;
            }
        break;
        default:break;
    }

    return a;
}

export default reducer;
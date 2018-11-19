function reducer(state = {}, { type, payload }) {
    let a = Object.assign({}, state);

    switch(type) {
        case 'CAST_GLOBAL_ERROR':
            a.error = payload;
        break;
        case 'UPDATE_PLAYING_SONG':
            a.currentSong = payload;
        break;
        default:break;
    }

    return a;
}

export default reducer;
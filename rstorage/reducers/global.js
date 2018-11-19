function reducer(state = {}, { type, payload }) {
    let a = Object.assign({}, state);

    switch(type) {
        case 'CAST_GLOBAL_ERROR':
            a.error = payload;
        break;
        case 'UPDATE_PLAYING_SONG':
            a.currentSong = payload;
        break;
        case 'UPDATE_SESSION_INFO':
            {
                let b = a.sessionInfo;
                if(b) {
                    a.sessionInfo = {
                        ...b,
                        ...payload
                    }
                } else {
                    a.sessionInfo = payload;
                }
            }
        break;
        case 'TOGGLE_PLAY_PLAYER':
            {
                let b = a.sessionInfo;
                if(b) {
                    a.sessionInfo.isPlaying = !b.isPlaying
                }
            }
        break;
        default:break;
    }

    return a;
}

export default reducer;
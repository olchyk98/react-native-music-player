function reducer(state = {}, { type, payload }) {
    let a = Object.assign({}, state);

    switch(type) {
        case 'UPLOAD_LIST_MUSIC':
            if(a.songsInfo) {
                a.songsInfo["hasNextPage"] = payload.hasNextPage;
            } else {
                a.songsInfo = {
                    hasNextPage: payload.hasNextPage
                }
            }
            
            // a.songsInfo["totalCount"] = payload.totalCount;

            {
                let panic = "_NO_CURSOR_PROVIDED";
                let b = a.songs;
                if(b) {
                    a.songsInfo["cursorIN"] = (b.length + payload.assets.length).toString() || panic;
                    a.songs = [
                        ...b,
                        ...payload.assets
                    ]
                } else {
                    a.songsInfo["cursorIN"] = payload.assets.length.toString() || panic;
                    a.songs = payload.assets;
                }
            }
        break;
        case 'UPDATE_PLAYING_SONG':
            /*
                Here's two concepts for CURRENT_PLAYLIST_MODULE:
                1. Get song index in songs list and push it to sessionInfo. - CURRENT
                2. Get path of the song and set up parent folder as a playlist. - CONCEPT.
                    - But I can't do that, because here's no feature for a playlist split.
            */

           {
                let panic = "_SONG_NOT_FOUND"
                let b = a.songs.findIndex( ({ id }) => id === payload.id ),
                    c = (Number.isInteger(b)) ? b : panic;

                if(a.sessionInfo) {
                    a.sessionInfo["currSongIndex"] = c;
                } else {
                    a.sessionInfo = { // sessionInfo var for list
                        currSongIndex: c
                    }
                }
           }
        break;
        default:break;
    }

    return a;
}

export default reducer;
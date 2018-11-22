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
        default:break;
    }

    return a;
}

export default reducer;
function reducer(state = {}, { type, payload }) {
    let a = Object.assign({}, state);

    switch(type) {
        case 'UPLOAD_LIST_MUSIC':
            {
                let b = a.songs;
                if(b) {
                    a.songsInfo = {
                        hasNextPage: payload.hasNextPage,
                        totalCount: payload.totalCount
                    }
                    a.songs = [
                        ...b,
                        ...payload.assets
                    ]
                } else {
                    a.songs = payload.assets;
                }
            }
        break;
        default:break;
    }

    return a;
}

export default reducer;
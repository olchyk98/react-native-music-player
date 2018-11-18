import {
    StyleSheet,
    StatusBar,
    Dimensions,
    Platform
} from 'react-native';

const {
    width: innerWidth,
    height: innerHeight
} = Dimensions.get("window");

const variables = {
    listSongs: {
        padding: innerWidth / 100 * 1 // 5%
    },
    listSongsSong: {
        height: 85,
        imageHeight: 65, // %
        infoMargin: 1.5,
        controlsSize: 20
    }
}

const styles = StyleSheet.create({
    display: {
        paddingTop: (Platform.OS !== 'ios' ? StatusBar.currentHeight : 20) + 25,
        paddingBottom: (Platform.OS !== 'ios' ? StatusBar.currentHeight : 20) + 25
    },
    list: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    listHead: {
        alignItems: "center",
        justifyContent: "center"
    },
    listHeadTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "600"
    },
    listSongs: {
        flexDirection: "column",
        width: "100%",
        marginTop: 25
    },
    listSongsSong: {
        height: variables.listSongsSong.height,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    listSongsSongProgress: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, .05)",
        width: "40%"
    },
    listSongsSongMain: {
        width: 100 - 100 / (innerWidth / variables.listSongs.padding) + "%",
        alignItems: "center",
        flexDirection: "row"
    },
    listSongsSongInfo: {
        alignItems: "center",
        flexDirection: "row"
    },
    listSongsSongInfoTitle: {
        flexDirection: "column"
    },
    listSongsSongInfoTitleName: {
        fontWeight: "500",
        fontSize: 17.5,
        marginBottom: variables.listSongsSong.infoMargin
    },
    listSongsSongInfoTitleLabel: {
        fontWeight: "200",
        fontSize: 15,
        color: "rgba(0, 0, 0, .4)",
        marginTop: variables.listSongsSong.infoMargin
    },
    listSongsSongInfoImagecointainer: {
        height: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        width: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        marginRight: 15
    },
    listSongsSongInfoImagecointainerImage: {
        height: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        width: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        borderRadius: 2.5
    },
    listSongsSongControls: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        height: variables.listSongsSong.height,
        right: 0,
        opacity: .75
    },
    listSongsSongControlsPlay: {
        height: variables.listSongsSong.controlsSize,
        width: variables.listSongsSong.controlsSize
    }
});

export default styles;
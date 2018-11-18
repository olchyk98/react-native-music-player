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
    global: {
        focusCol: '#4241B0'
    },
    listSongs: {
        padding: innerWidth / 100 * 17.5 // 17.5%
    },
    listSongsSong: {
        height: 85,
        imageHeight: 65, // %
        infoMargin: 1.5,
        controlsSize: 20
    },
    player: {
        minHeight: 75,
        minBtnSize: 30,
        padding: innerWidth / 100 * 7.5,
        addonBtnSize: 20,
        addonBtnMargin: 20,
        previewSize: innerWidth / 100 * 50
    },
    playerTitle: {
        contentMargin: 1.5
    },
    playerControls: {
        height: 55,
        buttonSize: 17.5
    }
}

const styles = StyleSheet.create({
    display: {
        paddingTop: (Platform.OS !== 'ios' ? StatusBar.currentHeight : 20) + 25,
        paddingBottom: variables.player.minHeight
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
        flexDirection: "row",
        justifyContent: "space-between"
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
        opacity: .75
    },
    listSongsSongControlsPlay: {
        height: variables.listSongsSong.controlsSize,
        width: variables.listSongsSong.controlsSize
    },
    player: {
        zIndex: 16,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        paddingLeft: variables.player.padding,
        paddingRight: variables.player.padding
    },
    playerMinaction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%"
    },
    playerMinactionClose: {
        height: variables.player.minBtnSize,
        width: variables.player.minBtnSize,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, .2)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: variables.player.minBtnSize / 2
    },
    playerMinactionCloseImage: {
        height: variables.player.minBtnSize / 100 * 37.5,
        width: variables.player.minBtnSize / 100 * 37.5
    },
    playerAddons: {
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        opacity: .3
    },
    playerAddonsButton: {
        height: variables.player.addonBtnSize,
        width: variables.player.addonBtnSize,
        marginLeft: variables.player.addonBtnMargin,
        marginRight: variables.player.addonBtnMargin
    },
    playerImagecontainer: {
        height: variables.player.previewSize,
        width: variables.player.previewSize
    },
    playerImagecontainerImage: {
        height: "100%",
        width: "100%",
        borderRadius: 5
    },
    playerInfo: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    playerInfoName: {
        marginBottom: variables.playerTitle.contentMargin,
        color: variables.global.focusCol,
        fontWeight: "600",
        fontSize: 24
    },
    playerInfoLabel: {
        marginTop: variables.playerTitle.contentMargin,
        color: variables.global.focusCol,
        fontWeight: "300",
        fontSize: 15
    },
    playerControls: {
        width: "100%",
        height: variables.playerControls.height,
        backgroundColor: variables.global.focusCol,
        alignItems: "stretch",
        flexDirection: "row",
        borderRadius: 3
    },
    playerControlsBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    playerControlsBtnBordered: {
        borderColor: "white",
        borderWidth: 1
    },
    playerControlsBtnImage: {
        height: variables.playerControls.buttonSize,
        width: variables.playerControls.buttonSize
    }
});

export default styles;
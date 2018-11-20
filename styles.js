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
        padding: innerWidth / 100 * 17.5, // 17.5%
        loaderSize: 115
    },
    listSongsSong: {
        height: 85,
        imageHeight: 65, // %
        infoMargin: 1.5,
        controlsSize: 20
    },
    player: {
        minHeight: 75, // 75
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
        buttonSize: 15
    },
    playerProgress: {
        pointerSize: 10
    }
}

const styles = StyleSheet.create({
    globalError: {
        position: "absolute",
        top: 0,
        bottom:0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    globalErrorText: {
        fontWeight: "200",
        textTransform: "uppercase",
        color: "black",
        width: "80%",
        textAlign: "center"
    },
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
    listSongsLoader: {
        flex: 1,
        alignItems: "center"
    },
    listSongsInfo: {
        width: "80%",
        fontWeight: "200",
        color: "rgba(0, 0, 0, .35)",
        textAlign: "center"
    },
    listSongsLoaderIcon: {
        height: variables.listSongs.loaderSize,
        width: variables.listSongs.loaderSize
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
        width: "0%"
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
        marginBottom: variables.listSongsSong.infoMargin,
        flexShrink: 1,
        width: innerWidth,
    },
    listSongsSongInfoTitleLabel: {
        fontWeight: "200",
        fontSize: 15,
        color: "rgba(0, 0, 0, .4)",
        marginTop: variables.listSongsSong.infoMargin,
        flexShrink: 1,
        width: innerWidth
    },
    listSongsSongInfoImagecointainer: {
        height: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        width: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        marginRight: 20
    },
    listSongsSongInfoImagecointainerImage: {
        height: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        width: variables.listSongsSong.height / 100 * variables.listSongsSong.imageHeight,
        borderRadius: 2.5
    },
    listSongsSongControls: {
        flexDirection: "row",
        alignItems: "center",
        opacity: .75,
        flexShrink: 0,
        position: "absolute",
        right: 0
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
        paddingRight: variables.player.padding,
        backgroundColor: "red"
    },
    playerMinProgress: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: innerWidth,
        height: 5,
        backgroundColor: "#8584CF",
        borderRadius: 3,
        alignSelf: "flex-start"
    },
    playerMinaction: {
        flexDirection: "row",
        position: "absolute",
        alignItems: "center",
        justifyContent: "space-between",
        height: variables.player.minHeight,
        width: "100%",
    },
    playerMinactionTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    playerMinactionTitlePlayi: {
        marginRight: 25,
        height: variables.player.minBtnSize / 2,
        width: variables.player.minBtnSize / 2,
        alignItems: "center"
    },
    playerMinactionTitleName: {
        color: "white",
        fontSize: 15,
        fontWeight: "500",
        marginRight: 12.5
    },
    playerMinactionTitleLabel: {
        fontWeight: "300",
        color: "rgba(255, 255, 255, .65)"
    },
    playerMinactionToggle: {
        height: variables.player.minBtnSize,
        width: variables.player.minBtnSize,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, .2)",
        borderRadius: variables.player.minBtnSize / 2,
        position: "absolute",
        right: 0
    },
    playerMinactionToggleImagecontroller: {
        height: "100%",
        width: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
    },
    playerMinactionToggleImage: {
        height: variables.player.minBtnSize / 100 * 37.5,
        width: variables.player.minBtnSize / 100 * 37.5
    },
    playerAddons: {
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        opacity: .3,
    },
    playerAddonsButton: {
        height: variables.player.addonBtnSize,
        width: variables.player.addonBtnSize,
        marginLeft: variables.player.addonBtnMargin,
        marginRight: variables.player.addonBtnMargin
    },
    playerImagecontainer: {
        height: variables.player.previewSize,
        width: variables.player.previewSize,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    playerImagecontainerImage: {
        height: "100%",
        width: "100%",
        borderRadius: 2.5
    },
    playerImagecontainerVinyl: {
        height: "115%",
        width: "115%",
        position: "absolute",
        right: "-50%"
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
        fontSize: 24,
        textAlign: "center",
        width: "90%"
    },
    playerInfoLabel: {
        marginTop: variables.playerTitle.contentMargin,
        color: variables.global.focusCol,
        fontWeight: "300",
        fontSize: 15,
        textAlign: "center",
        width: "90%"
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
        borderLeftColor: "white",
        borderRightColor: "white",
        borderWidth: 1
    },
    playerControlsBtnImage: {
        height: variables.playerControls.buttonSize,
        width: variables.playerControls.buttonSize
    },
    PlayerProgress: {
        flexDirection: "column",
        width: "100%",
        marginTop: 25,
        height: 75,
        flexDirection: "column",
        justifyContent: "center"
    },
    PlayerProgressDisplay: {
        height: 2.5,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, .2)",
        borderRadius: 3
    },
    PlayerProgressTime: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    PlayerProgressDisplayPointer: {
        height: variables.playerProgress.pointerSize,
        width: variables.playerProgress.pointerSize,
        borderRadius: variables.playerProgress.pointerSize / 2,
        backgroundColor: variables.global.focusCol,
        top: -variables.playerProgress.pointerSize / 2 + 1,
        left: 0
    },
    PlayerProgressDisplayFill: {
        height: "100%",
        backgroundColor: variables.global.focusCol,
        width: "0%",
        position: "absolute",
        top: 0,
        left: 0
    }
});

const platform = Platform.OS;
export {
    styles,
    variables,
    innerWidth,
    innerHeight,
    platform
};
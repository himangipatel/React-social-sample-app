import { color_light_gray } from "../../../utils/ColorUtils";

export default {
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    inputDescribe: {
        borderColor: color_light_gray,
        borderWidth: 0.5,
        marginBottom: 10,
        padding: 5,
        height: 120,
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    videoImageView: {
        width: 100,
        height: 100,
        borderColor: color_light_gray,
        borderWidth: 0.5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    videoImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
};

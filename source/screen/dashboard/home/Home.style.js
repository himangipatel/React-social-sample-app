import { StyleSheet } from 'react-native';
import { color_white } from '../../../utils/ColorUtils';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color_white
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewpagerItem: {
        height: 300,
        width: null,
        flex: 1,
        flexWrap: 'wrap',
        resizeMode: 'contain'
    },
    userNameBold: {
        fontWeight: "bold",
        marginRight: 10
    }
})
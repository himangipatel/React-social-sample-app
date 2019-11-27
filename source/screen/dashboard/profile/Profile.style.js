import { StyleSheet } from 'react-native';
import { color_white, color_black } from '../../../utils/ColorUtils';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  profileImage: {
    height: 180,
    width: 180,
    paddingTop: 50,
    borderRadius: 200,
    borderWidth: 7,
    borderColor: color_white,
    alignSelf: 'center',
    marginTop: -90,

  },
  coverImage: {
    height: hp('30%'),
    width: wp('95%'),
    borderRadius: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  name: {
    fontSize: 35,
    alignSelf: 'center',
    color: color_black,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

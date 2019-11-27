import React from 'react';
import {Text, View, YellowBox} from 'react-native';
import Video from 'react-native-video';
import {splash_video} from '../utils/Assets';
import {color_green, color_white} from '../utils/ColorUtils';
import {font_stoner} from '../utils/FontUtils';
import {getAsyncData} from '../utils/AsyncUtil';

/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

export default class SplashScreen extends React.Component {
  async componentDidMount() {
    console.disableYellowBox = true;
    const isUserLogin = await getAsyncData('@isLogin');
    setTimeout(() => {
      if (JSON.parse(isUserLogin)) {
        this.props.navigation.replace('Dashboard');
      } else {
        this.props.navigation.replace('Login');
      }
    }, 3000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: null,
          height: null,
        }}>
        <Video
          source={splash_video}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: color_green,
            opacity: 0.4,
          }}
          muted={true}
          repeat={true}
          resizeMode="cover"
        />

        <Text
          style={{
            fontSize: 60,
            textAlign: 'center',
            fontFamily: font_stoner,
            color: color_white,
          }}>
          Credencys Social App
        </Text>
      </View>
    );
  }
}

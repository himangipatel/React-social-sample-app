import React, {Component} from 'react';
import {View, Dimensions, Image} from 'react-native';
import Video from 'react-native-video';
import {color_green, color_red_pink} from '../../../utils/ColorUtils';
import {Icon} from 'react-native-elements';
const {height, width} = Dimensions.get('screen');

/**
 * @author Maitri Shah <matri.shah@credencys.com>
 */
export default class ImageVideoCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: this.props.sortObject.imagePath,
      videoPath: this.props.sortObject.videoPath,
    };
  }


  renderImage() {
    return (
      <View
        style={{
          width: width / 4.5,
          height: width / 4.5,
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
         
        <Image
          source={{uri: this.state.imagePath}}
          style={{height: width / 3.5, width: '100%', opacity: 0.7}}
          resizeMode="cover"
        />
           <View style={{position: 'absolute', right: 0, top: 0}}>
          <Icon
            type="MaterialIcons"
            name={'close'}
            color={'black'}
            onPress={() => this.props.onImageVideoDelete(this.props.sortObject.id)}
          />
        </View>
      </View>
    );
  }
  renderVideo() {
    return (
      <View
        style={{
          width: width / 4.5,
          height: width / 4.5,
          flexDirection: 'column',
        }}>


        <Video
          source={{uri: this.state.videoPath}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: color_green,
            opacity: 0.7,
          }}
          muted={true}
          repeat={true}
          resizeMode="cover"
        />

        <View style={{position: 'absolute', right: 0, top: 0}}>
          <Icon
            type="MaterialIcons"
            name={'close'}
            color={'black'}
            onPress={() => this.props.onImageVideoDelete(this.props.sortObject.id)}
          />
        </View>


        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <Icon
            type="MaterialIcons"
            name={'play-arrow'}
            color={color_red_pink}
          />
        </View>
      </View>
    );
  }
  render() {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: 'transparent',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        >
        {this.state.imagePath !== '' && this.renderImage()}
        {this.state.videoPath !== '' && this.renderVideo()}
      </View>
    );
  }
}

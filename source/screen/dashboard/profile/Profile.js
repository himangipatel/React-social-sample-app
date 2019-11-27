import React from 'react';
import { ActivityIndicator, Image, ImageBackground, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { BaseURL } from '../../../utils/APIUtils';
import { imagePicker } from '../../../utils/AppUtils';
import { bg_login } from '../../../utils/Assets';
import { getAsyncData } from '../../../utils/AsyncUtil';
import { color_white } from '../../../utils/ColorUtils';
import { addCoverImage } from './Profile.api';
import { styles } from './Profile.style';


/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userName: '',
      profileImage: 'https://facebook.github.io/react-native/img/tiny_logo.png',
      pickedImage: 'undefined',
      userID: ''
    };
  }

  async componentDidMount() {
    this.getUserInfor();
  }

  getUserInfor = async () => {
    const userInfo = await getAsyncData('@userInfo');
    this.setState({
      userName: JSON.parse(userInfo).name,
      profileImage: BaseURL + JSON.parse(userInfo).photo,
      userID: JSON.parse(userInfo)._id,
    });

    if (JSON.parse(userInfo).userCoverImage != null) {
      this.setState({
        pickedImage: { uri: BaseURL + JSON.parse(userInfo).userCoverImage }
      })
      console.log(BaseURL + JSON.parse(userInfo).userCoverImage)
    }
  };

  _pickImageHandler = async () => {
    imagePicker(async response => {
      this.setState({
        loading: true
      })
      var response = await addCoverImage(this.state.userID, response.uri)
      this.getUserInfor();
      this.setState({
        loading: false
      })
    });
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={
            this.state.pickedImage === 'undefined'
              ? bg_login
              : this.state.pickedImage
          }
          style={styles.coverImage}>

          {this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' />
            </View>
          }
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: color_white,
              opacity: 0.9,
              justifyContent: 'center',
              margin: 5,
            }}>
            <Icon
              name={'photo-camera'}
              style={{ alignSelf: 'center' }}
              onPress={this._pickImageHandler}
            />
          </View>
        </ImageBackground>

        <Image
          source={{ uri: this.state.profileImage }}
          style={styles.profileImage}
        />

        <Text style={styles.name}>{this.state.userName}</Text>
      </View>
    );
  }
}


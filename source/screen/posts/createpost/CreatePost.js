import React, { Component } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { Icon } from 'react-native-elements';
import { imagePicker, videoPicker } from '../../../utils/AppUtils';
import { getAsyncData } from '../../../utils/AsyncUtil';
import { color_light_gray, color_red_pink } from '../../../utils/ColorUtils';
import styles from './CreatePost.style';
import ImageVideoCell from './ImageVideoCell';
import { createPost } from './CreatePost.api'

/**
 * @author Maitri Shah <matri.shah@credencys.com>
 */

// https://github.com/nathvarun/React-Native-Layout-Tutorial-Series

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      description: '',
      userID: ''
    };
  }

  async componentDidMount() {
    this.getUserInfor();
  }

  getUserInfor = async () => {
    const userInfo = await getAsyncData('@userInfo');
    this.setState({
      userID: JSON.parse(userInfo)._id,
    });

  };

  _renderVideoImageCell = ({ item, index }) => (
    <ImageVideoCell
      sortObject={item}
      indexValue={index}
      onImageVideoDelete={key => {
        var newList = this.state.list.filter(item => item.id !== key);
        this.setState({
          list: newList,
        });
      }}
    />
  );

  _pickImageHandler = () => {
    imagePicker(res => {
      this.state.list.push({
        id: (this.state.list.length + 1).toString(),
        imagePath: res.uri,
        videoPath: '',
      });
      this.setState({
        list: this.state.list,
      });
    });
  };

  _pickVideoHandler = () => {
    videoPicker(res => {
      this.state.list.push({
        id: (this.state.list.length + 1).toString(),
        imagePath: '',
        videoPath: res.uri,
      });
      this.setState({
        list: this.state.list,
      });
    });
  };


  createPost = async() => {
    if (this.state.description.trim() === '') {
      alert('Enter Description')
    } else if (this.state.list.length == 0) {
      alert('Attach media file')
    } else {
      let images = [];
      for (let i = 0; i < this.state.list.length; i++) {
        images.push(this.state.list[i].imagePath)
      }

      var response = await createPost(this.state.userID, this.state.description, images);
      if(response!=null){
        this.props.navigation.replace('Home');
      }
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.mainContainer}>
            <TextInput
              placeholder="Describe..."
              multiline={true}
              style={styles.inputDescribe}
              numberOfLines={4}
              onChangeText={text =>
                this.setState({ description: text })
              }
            />

            <TouchableOpacity
              style={[
                styles.videoImageContainer,
                {
                  marginVertical: 10,
                  padding: 5,
                  alignItems: 'center',
                  borderColor: color_light_gray,
                  borderWidth: 0.5,
                  borderRadius: 5,
                },
              ]}>
              <Icon
                type="MaterialIcons"
                name={'map'}
                color={color_light_gray}
              />
              <Text style={{ color: color_light_gray, marginStart: 10 }}>
                Share Your Location (Optional)
              </Text>
            </TouchableOpacity>

            <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
              <FlatList
                data={this.state.list}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      margin: 5,
                      backgroundColor: color_light_gray,
                    }}
                  />
                )}
                renderItem={this._renderVideoImageCell}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.videoImageContainer}>
              <TouchableOpacity
                style={styles.videoImageView}
                onPress={this._pickImageHandler}>
                <Icon
                  type="MaterialIcons"
                  name={'add-circle'}
                  color={color_light_gray}
                />
                <Text
                  style={{ fontSize: 15, color: color_light_gray, marginTop: 8 }}>
                  Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.videoImageView}
                onPress={this._pickVideoHandler}>
                <Icon
                  type="MaterialIcons"
                  name={'add-circle'}
                  color={color_light_gray}
                />
                <Text
                  style={{ fontSize: 15, color: color_light_gray, marginTop: 8 }}>
                  Video
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 40 }}>
              <AnimateLoadingButton
                ref={c => (this.loadingButton = c)}
                width={300}
                height={50}
                title={'Create Post'}
                backgroundColor={color_red_pink}
                titleFontSize={16}
                titleColor="rgb(255,255,255)"
                borderRadius={4}
                onPress={() => this.createPost()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


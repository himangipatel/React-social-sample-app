import Axios from 'axios';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import {SocialIcon, CheckBox} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {GoogleSignin} from 'react-native-google-signin';
import {API} from '../../utils/APIUtils';
import {googleSignIn, signOut, imagePicker} from '../../utils/AppUtils';
import {bg_login, splash_logo} from '../../utils/Assets';
import {storeUserInfor} from '../../utils/AsyncUtil';
import {Dropdown} from 'react-native-material-dropdown';
import {
  color_black,
  color_purple_dark,
  color_white,
} from '../../utils/ColorUtils';
import {
  sign_up,
  email,
  password,
  mobile_number,
  last_name,
  first_name,
  already_account,
  login,
  gender,
} from '../../utils/StringUtils';
import {
  validateEmail,
  validatePassword,
  validateEmptyField,
  validateMobileNumber,
} from '../../utils/Validator';
import BoxTextField from './BoxTextField';
import RadioForm from 'react-native-simple-radio-button';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

/**
 * @author Maitri Shah <matri.shah@credencys.com>
 */

export default class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    department: '',
    genderValue: 0,
    termChecked: false,
    errorMsg: '',
    isLoading: false,
    pickedImage: null,
  };

  async validateAllFields(
    firstName,
    lastName,
    email,
    contactNumber,
    password,
    gender,
    dept,
    termChecked,
    imageURI,
  ) {
    if (validateEmptyField(firstName)) {
      this.setState({firstName, errorMsg: ''});
      console.log('First name is correct');
    } else {
      console.log('First name is empty');
      this.setState({errorMsg: 'First name is empty', firstName});
      alert('First name is empty');
      return;
    }

    if (validateEmptyField(lastName)) {
      this.setState({lastName, errorMsg: ''});
      console.log('Last name is correct');
    } else {
      console.log('Last name is empty');
      this.setState({errorMsg: 'Last name is empty', lastName});
      alert('Last name is empty');
      return;
    }

    if (validateEmail(email)) {
      this.setState({email, errorMsg: ''});
      console.log('Email is correct');
    } else {
      console.log('Email is not correct');
      this.setState({errorMsg: 'Email is not valid', email});
      alert('Email is not Valid');
      return;
    }

    if (validateMobileNumber(contactNumber)) {
      this.setState({contactNumber, errorMsg: ''});
      console.log('Contact number is correct');
    } else {
      console.log('contact number is not correct');
      this.setState({errorMsg: 'Contact number is not valid', contactNumber});
      alert('Contact number is not valid');
      return;
    }

    if (validatePassword(password)) {
      this.setState({errorMsg: '', password});
    } else {
      this.setState({errorMsg: 'Password is not valid', password});
      alert('Password is not Valid');
      return;
    }

    if (validateEmptyField(dept)) {
      this.setState({department: dept, errorMsg: ''});
      console.log('Department is correct');
    } else {
      console.log('Department is empty');
      this.setState({
        errorMsg: 'Please choose your department',
        department: dept,
      });
      alert('Please choose your department');
      return;
    }

    if (imageURI === null) {
      alert('Please choose user profile');
      return;
    }
    if (termChecked !== true) {
      console.log('Terms and conditions not accepted');
      this.setState({errorMsg: 'Please accept our T&C', termChecked});
      alert('Please accept our T&C');
      return;
    }

    this.callRegistrationAPI(
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      gender,
      dept,
      imageURI,
    );
  }

  callRegistrationAPI = async (
    firstName,
    lastName,
    email,
    contactNumber,
    password,
    genderValue,
    department,
    imageURI,
  ) => {
    this.loadingButton.showLoading(true);
    let response = await this.registerNormalUser(
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      genderValue,
      department,
      imageURI,
    );

    if (response != null) {
      if (response.isSuccess) {
        storeUserInfor(response.user);
        this.props.navigation.replace('Dashboard');
      } else {
        this.loadingButton.showLoading(false);
        alert(response.message);
      }
    } else {
      this.loadingButton.showLoading(false);
    }
  };

  registerNormalUser = async (
    firstName,
    lastName,
    email,
    contactNumber,
    password,
    genderValue,
    department,
    imageURI,
  ) => {
    try {
      var data = new FormData();

      data.append('name', firstName + ' ' + lastName);
      data.append('email', email);
      data.append('password', password);
      data.append('gender', genderValue);
      data.append('mobile', contactNumber);
      data.append('department', department);
      data.append('deviceType', 'android');
      data.append('loginType', 'email-password');

      data.append('userImage', {
        uri: imageURI.uri,
        name: firstName + '.jpg',
        type: 'image/jpg',
      });

      const response = await Axios.post(
        API.Registration,

        data,
      );
      console.log(response);
      return response.data;
    } catch (e) {
      this.loadingButton.showLoading(false);
      console.log(e);
      alert(e);
    }
  };

  loginWithGmail = async googleID => {
    try {
      const response = await Axios.post(API.Login, {
        googleID: googleID,
        loginType: 'google-signin',
      });
      return response.data;
    } catch (e) {
      signOut();
      this.loadingButton.showLoading(false);
      console.log(e);
      alert(e);
    }
  };

  googleSignIn = async () => {
    const userInfo = await googleSignIn();
    console.log(userInfo);
    if (userInfo != null) {
      this.loadingButton.showLoading(true);
      let response = await this.loginWithGmail(userInfo.user.id);

      if (response != null) {
        if (response.isSuccess) {
          storeUserInfor(response.user);
          this.props.navigation.push('Dashboard');
        } else {
          this.loadingButton.showLoading(false);
          alert(response.message);
          signOut();
        }
      } else {
        this.loadingButton.showLoading(false);
      }
    }
  };

  loginWithFacebook = async facebookID => {
    try {
      const response = await Axios.post(API.Login, {
        facebookID: facebookID,
        loginType: 'facebook-signin',
      });
      return response.data;
    } catch (e) {
      this.loadingButton.showLoading(false);
      console.log(e);
      alert(e);
      return null;
    }
  };

  facebookApiCall = async userId => {
    this.loadingButton.showLoading(true);
    let response = await this.loginWithFacebook(userId);

    if (response != null) {
      if (response.isSuccess) {
        storeUserInfor(response.user);
        this.props.navigation.push('Dashboard');
      } else {
        this.loadingButton.showLoading(false);
        alert(response.message);
      }
    } else {
      this.loadingButton.showLoading(false);
      return null;
    }
  };

  facebookSignIn = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        console.log(result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken()
            .then(token => {
              console.log('Token :: ' + token);
              console.log('User ID :: ' + token.userID);
              if (token != null && token.userID != null) {
                this.facebookApiCall(token.userID);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  _pickImageHandler = () => {
    imagePicker(response => {
      const source = {uri: response.uri};
      this.setState({
        pickedImage: source,
      });
    });
  };

  render() {
    let data = [
      {
        value: 'Mobile App',
      },
      {
        value: 'Open Source',
      },
      {
        value: 'Sales',
      },
      {
        value: 'Marketing',
      },
    ];

    var radio_props = [{label: 'Male', value: 0}, {label: 'Female', value: 1}];

    const Divider = props => {
      return (
        <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.textOR}>OR</Text>
          <View style={styles.line}></View>
        </View>
      );
    };

    GoogleSignin.configure();

    return (
      <ScrollView>
        <View>
          <ImageBackground
            style={styles.container}
            imageStyle={{opacity: 0.4}}
            source={bg_login}
            resizeMode="cover">
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={this._pickImageHandler}>
                <Image
                  source={
                    this.state.pickedImage === null
                      ? splash_logo
                      : this.state.pickedImage
                  }
                  style={styles.logo}
                />
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{width: Dimensions.get('screen').width * 0.45}}>
                  <BoxTextField
                    hint={first_name}
                    icon="person"
                    onChangeText={text =>
                      this.setState({firstName: text, errorMsg: ''})
                    }
                  />
                </View>
                <View
                  style={{
                    width: Dimensions.get('screen').width * 0.45,
                    marginLeft: 10,
                  }}>
                  <BoxTextField
                    hint={last_name}
                    icon="person"
                    onChangeText={text =>
                      this.setState({lastName: text, errorMsg: ''})
                    }
                  />
                </View>
              </View>

              <BoxTextField
                hint={email}
                icon="email"
                keyboardType="email-address"
                onChangeText={text =>
                  this.setState({email: text, errorMsg: ''})
                }
              />

              <BoxTextField
                hint={mobile_number}
                icon="phone"
                keyboardType="phone-pad"
                onChangeText={text =>
                  this.setState({contactNumber: text, errorMsg: ''})
                }
              />

              <BoxTextField
                hint={password}
                icon="vpn-key"
                secureTextEntry={true}
                password={true}
                autoCorrect={false}
                onChangeText={text =>
                  this.setState({password: text, errorMsg: ''})
                }
              />

              <View style={{marginHorizontal: 10}}>
                <Dropdown
                  containerStyle={{
                    width: Dimensions.get('screen').width - 25,
                    paddingHorizontal: 10,
                  }}
                  baseColor="white"
                  label="Department"
                  textColor="white"
                  selectedItemColor="black"
                  itemTextStyle={{color: 'black'}}
                  data={data}
                  onChangeText={value => {
                    this.setState({department: value, errorMsg: ''});
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingTop: 5,
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    color: color_white,
                    fontWeight: '400',
                    marginRight: 20,
                    fontSize: 15,
                  }}>
                  {gender}
                </Text>

                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#fff'}
                  labelColor={'#fff'}
                  selectedButtonColor={'#fff'}
                  selectedLabelColor={'#fff'}
                  animation={true}
                  labelStyle={{marginRight: 20, fontSize: 15}}
                  onPress={value => {
                    this.setState({genderValue: value});
                  }}
                />
              </View>
              <CheckBox
                title="I Agree Terms &amp; Conditions"
                iconType="material"
                checkedIcon="check"
                uncheckedIcon="check"
                checkedColor="white"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  alignSelf: 'flex-start',
                }}
                textStyle={{color: 'white', fontWeight: '400'}}
                checked={this.state.termChecked}
                onPress={() =>
                  this.setState({termChecked: !this.state.termChecked})
                }
              />

              <AnimateLoadingButton
                ref={c => (this.loadingButton = c)}
                width={300}
                height={50}
                title={sign_up}
                backgroundColor={color_purple_dark}
                titleFontSize={16}
                titleColor="rgb(255,255,255)"
                borderRadius={4}
                onPress={() =>
                  this.validateAllFields(
                    this.state.firstName,
                    this.state.lastName,
                    this.state.email,
                    this.state.contactNumber,
                    this.state.password,
                    this.state.genderValue,
                    this.state.department,
                    this.state.termChecked,
                    this.state.pickedImage,
                  )
                }
              />

              <Divider style={styles.divider}></Divider>

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <SocialIcon type="facebook" onPress={this.facebookSignIn} />
                <SocialIcon
                  type="google-plus-official"
                  onPress={this.googleSignIn}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                <Text style={{color: color_white}}>{already_account}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Text style={styles.createAccountText}>{login}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    minHeight: Dimensions.get('screen').height,
    alignItems: 'center',
    backgroundColor: color_black,
    padding: 15,
  },
  linearGradient: {
    borderRadius: 5,
    width: 350,
  },
  createAccountText: {
    color: color_white,
    textDecorationLine: 'underline',
    marginLeft: 7,
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: color_white,
  },
  textOR: {
    flex: 1,
    textAlign: 'center',
    color: color_white,
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  logo: {
    height: 100,
    width: 100,
    margin: 15,
    paddingTop: 50,
    borderRadius: 200,
  },
});

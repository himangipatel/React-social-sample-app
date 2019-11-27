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
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import {SocialIcon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {GoogleSignin} from 'react-native-google-signin';
import {API} from '../../utils/APIUtils';
import {googleSignIn, signOut} from '../../utils/AppUtils';
import {bg_login, splash_logo} from '../../utils/Assets';
import {storeUserInfor} from '../../utils/AsyncUtil';
import {
  color_black,
  color_purple_dark,
  color_white,
} from '../../utils/ColorUtils';
import {
  create_account,
  email,
  password,
  sign_in,
  fogot_password,
  do_not_have_account,
} from '../../utils/StringUtils';
import {validateEmail, validatePassword} from '../../utils/Validator';
import BoxTextField from './BoxTextField';
import {LoginManager, AccessToken} from 'react-native-fbsdk';


/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

export default class Login extends React.Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passErr: '',
    isLoading: false,
    isLogin: false,
  };

  async validateEmailPassword(email, password) {
    if (validateEmail(email)) {
      this.setState({email: email, emailError: ''});
      console.log('Email is Correct');
    } else if (!validateEmail(email)) {
      console.log('Email is Not Correct');
      this.setState({emailError: 'Email is not Valid', email: email});
      alert('Email is not Valid');
      return;
    }

    if (validatePassword(password)) {
      this.setState({passErr: '', password: password});
    } else if (!validatePassword(password)) {
      this.setState({passErr: 'Password is not valid', password: password});
      alert('Password is not Valid');
      return;
    }

    this.callLoginAPI(email, password);
  }

  callLoginAPI = async (email, password) => {
    this.loadingButton.showLoading(true);
    let response = await this.loginWithEmailPassword(email, password);

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

  loginWithEmailPassword = async (email, password) => {
    try {
      const response = await Axios.post(API.Login, {
        email: email,
        password: password,
        loginType: 'email-password',
      });
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

  render() {
    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableComp = TouchableNativeFeedback;
    }

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
            <Image source={splash_logo} style={styles.logo} />

            <BoxTextField
              hint={email}
              icon="email"
              keyboardType="email-address"
              onChangeText={text =>
                this.setState({email: text, emailError: ''})
              }
            />

            <BoxTextField
              hint={password}
              icon="vpn-key"
              secureTextEntry={true}
              password={true}
              autoCorrect={false}
              onChangeText={text =>
                this.setState({password: text, passErr: ''})
              }
            />

            <TouchableComp onPress={() => alert('coming soon..')}>
              <Text style={styles.forgotPasswordText}>{fogot_password}</Text>
            </TouchableComp>

            <AnimateLoadingButton
              ref={c => (this.loadingButton = c)}
              width={300}
              height={50}
              title={sign_in}
              backgroundColor={color_purple_dark}
              titleFontSize={16}
              titleColor="rgb(255,255,255)"
              borderRadius={4}
              onPress={() =>
                this.validateEmailPassword(
                  this.state.email,
                  this.state.password,
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
              <Text style={{color: color_white}}>{do_not_have_account}</Text>

              <TouchableComp
                onPress={() => this.props.navigation.push('SignUp')}>
                <Text style={styles.createAccountText}>{create_account}</Text>
              </TouchableComp>
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
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color_black,
    padding: 20,
  },
  linearGradient: {
    borderRadius: 5,
    width: 350,
    marginTop: 20,
  },
  createAccountText: {
    color: color_white,
    textDecorationLine: 'underline',
    marginLeft: 7,
  },
  forgotPasswordText: {
    color: color_white,
    textDecorationLine: 'underline',
    marginBottom: 20,
    marginTop: 10,
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
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    height: 100,
    width: 100,
    margin: 20,
  },
});
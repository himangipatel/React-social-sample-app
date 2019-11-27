import PropTypes from 'prop-types';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { BaseURL } from '../../../utils/APIUtils';
import { signOut } from '../../../utils/AppUtils';
import { splash_logo } from '../../../utils/Assets';
import { getAsyncData, saveAysncData } from '../../../utils/AsyncUtil';
import styles from './SideMenu.style';


/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

class SideMenu extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userName: '',
      profileImage: splash_logo
    };
  }

  async componentDidMount() {
    this.getUserInfor();
  }


  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  logout = async () => {
    saveAysncData('@isLogin', JSON.stringify(false));
    signOut();
    //  this.navigateToScreen('Setting');
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login',
    });
    this.props.navigation.popToTop(navigateAction);
  };

  getUserInfor = async () => {
    const userInfo = await getAsyncData('@userInfo');
    this.setState({
      userName: JSON.parse(userInfo).name,
      profileImage: {uri:BaseURL + JSON.parse(userInfo).photo},
    });
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Image
              style={styles.drawerImage}
              source={this.state.profileImage}
            />
              <Text
              style={styles.name}
              onPress={this.navigateToScreen('Home')}>
              {this.state.userName}
            </Text>

            <View style={styles.divider} />
            <Text
              style={styles.navItemStyle}
              onPress={this.navigateToScreen('Home')}>
              Home
            </Text>
            <View style={styles.divider} />
            <Text
              style={styles.navItemStyle}
              onPress={this.navigateToScreen('Profile')}>
              Profile
            </Text>
            <View style={styles.divider} />
            <Text
              style={styles.navItemStyle}
              onPress={this.navigateToScreen('Setting')}>
              Setting
            </Text>
            <View style={styles.divider} />
          </View>
        </ScrollView>
        
        <View style={styles.footerContainer}>
          <Text style={styles.navItemStyle} onPress={this.logout}>
            Logout
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
};

export default SideMenu;

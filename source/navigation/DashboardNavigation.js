import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import CreatePost from '../screen/posts/createpost/CreatePost';
import Home from '../screen/dashboard/home/Home';
import Profile from '../screen/dashboard/profile/Profile';
import Setting from '../screen/dashboard/Setting';
import SideMenu from '../screen/dashboard/sidemenu/SideMenu';
import { color_white, color_green } from '../utils/ColorUtils';

/**
 * @author Maitri Shah <matri.shah@credencys.com>
 */

 
class DrawerMenuInHeader extends Component {
  static navigationOptions = {
    header: null,
  };

  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.openDrawer();
  };

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={this.toggleDrawer.bind(this)}>
          <Icon type="Entypo" name={'menu'} color={color_white} />
        </TouchableOpacity>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => this.navigationOption({navigation}, 'Home', false, 'add-circle'),
  },
  CreatePost: {
    screen: CreatePost,
    navigationOptions: ({navigation}) => this.navigationOption({navigation}, 'Create Post', true, undefined)
  }
},
{
  initialRouteName: 'Home',
  navigationOptions: ({navigation}) => this.navigationOption({navigation}, 'Home', false, 'add-circle')
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => this.navigationOption({navigation}, 'Profile', false, undefined)
  },
});

const SettingStack = createStackNavigator({
  Setting: {
    screen: Setting,
    navigationOptions: ({navigation}) => this.navigationOption({navigation}, 'Setting', false, undefined)
  },
});

navigationOption = ({navigation}, title, backIcon, rightIcon) => ({
  title: title,
  headerLeft: !backIcon ? <DrawerMenuInHeader navigationProps={navigation} /> : (
    <Icon type="MaterialIcons" name={'chevron-left'} color={color_white} onPress={() => navigation.pop()} />
  ),
  headerRight: rightIcon === undefined ? null : (
    <Icon type="MaterialIcons" name={rightIcon} color={color_white} onPress={() => navigation.push('CreatePost')} />
  ),
  headerStyle: {
    backgroundColor: color_green,
  },
  headerTitleStyle: {
    color: color_white,
  },
  headerRightContainerStyle: {
    marginRight: 10
  },
  headerLeftContainerStyle: {
    marginLeft: 10
  }
})

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
    Setting: SettingStack,
  },
  {
    initialRouteName: 'Home',
    contentComponent: SideMenu,
  },
);

export default DrawerNavigator;

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '../screen/SplashScreen';
import Login from '../screen/authentication/Login';
import DashboardNavigation from './DashboardNavigation';
import Register from '../screen/authentication/Register';

/**
 * @author Himangi Patel <himangi.patel@credencys.com>
 */

const defaultStackNavOptions = {
  header: null,
};

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: Register,
    },
    Dashboard: {
      screen: DashboardNavigation,
    },
  },
  {
    initialRouteName: 'SplashScreen',
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

export default createAppContainer(AppNavigator);

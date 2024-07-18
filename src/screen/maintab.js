import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../utils/colors';
import Home from './home';
import Profile from './profile';
import Drewerscreen from '../component/drewercompo';
import metrics from '../utils/metrics';

const Tab = AnimatedTabBarNavigator();
const Drawer = createDrawerNavigator();

const Drawercomponet_Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      useLegacyImplementation={true}
      screenOptions={{
        drawerStyle: {
          width: 300,
        },
        headerShown: false,
      }}
      options={{unmountOnBlur: true}}
      drawerContent={props => <Drewerscreen {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const Drawercomponet_Profile = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      useLegacyImplementation={true}
      screenOptions={{
        drawerStyle: {
          width: 300,
        },
        headerShown: false,
      }}
      options={{unmountOnBlur: true}}
      drawerContent={props => <Drewerscreen {...props} />}>
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

const Mytabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.blue,
        inactiveTintColor: colors.blue,
        tabStyle: {
          height: metrics.HEIGHT * 0.079,
          paddingVertical: 0,
        },
        labelStyle: {
          color: colors.white,
          //   fontSize: 12,
          // fontFamily: fonts.Roboto_b,
        },
        activeBackgroundColor: colors.themecolor,
      }}
      appearance={{
        dotSize: 'small',
        dotCornerRadius: 10,
        tabBarBackground: colors.themecolor,
        whenActiveShow: 'icon-only',
      }}>
      <Tab.Screen
        name="Home"
        component={Drawercomponet_Home}
        options={{
          headerShown: false,

          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="md-home-outline"
              size={size ? 22 : 22}
              color={focused ? '#00ADB5' : colors.white}
              focused={focused}
            />
            // <Image
            //   source={require('../assets/home.png')}
            //   style={{
            //     height: metrics.HEIGHT * 0.04,
            //     width: metrics.WIDTH * 0.1,
            //   }}
            // />
          ),
        }}
      />
      {/* <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarLabel: 'HISTORY',
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
              name="bell"
              size={size ? 26 : 26}
              color={focused ? colors.pink : '#222222'}
              focused={focused}
            />
          ),
        }}
      />*/}
      <Tab.Screen
        name="Profile"
        component={Drawercomponet_Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="md-person-outline"
              size={size ? 22 : 22}
              color={focused ? '#00ADB5' : colors.white}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Mytabs;

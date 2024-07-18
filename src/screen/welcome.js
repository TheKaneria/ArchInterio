/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import colors from '../utils/colors';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import metrics from '../utils/metrics';
import {BlurView} from '@react-native-community/blur';
import fonts from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Welcome = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.themecolor,
      }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <ImageBackground
        source={require('../assets/gs3.png')}
        style={{
          width: metrics.WIDTH * 1,
          height: metrics.HEIGHT * 1.1,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 40,
            marginTop: '100%',
            marginLeft: '6%',
            fontWeight: '600',
          }}>
          Welcome To
        </Text>
        <Text
          style={{
            color: '#00ADB5',
            fontSize: 40,
            marginTop: '1%',
            marginLeft: '6%',
            fontWeight: '600',
          }}>
          ArchInterio
        </Text>
        {/* <Image
          source={require('../assets/logoa.png')}
          style={{
            height: metrics.HEIGHT * 0.25,
            width: metrics.WIDTH * 0.45,
            marginLeft: metrics.WIDTH * 0.06,
          }}
        /> */}
      </ImageBackground>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={{
          position: 'absolute',
          bottom: 60,
          height: 60,
          width: 305,
          borderRadius: 15,
          backgroundColor: '#00ADB5',
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: '600'}}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageview: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: metrics.HEIGHT * 0.6,
  },
  image: {
    height: metrics.HEIGHT * 0.5,
    width: metrics.WIDTH * 0.9,
  },
  absolute: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});

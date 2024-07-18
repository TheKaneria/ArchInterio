import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  BackHandler,
  Linking,
  Modal,
  StatusBar,
} from 'react-native';
import colors from '../utils/colors';
import metrics from '../utils/metrics';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';

const Splash = props => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     props.navigation.navigate('Welcome');
  //   }, 2200);
  // });
  useEffect(() => {
    AsyncStorage.getItem('islogin').then(value => {
      setTimeout(() => {
        if (value) {
          props.navigation.replace('Mytabs');
        } else {
          props.navigation.replace('Welcome');
        }
      }, 1000);
    });
  }, [props]);

  return (
    <View style={style.main}>
      <StatusBar backgroundColor={colors.themecolor} barStyle="light-content" />
      <View style={style.imageview}>
        {/* <SharedElement id={'item.photo'}> */}
        <Animatable.Image
          animation="bounceInLeft"
          source={require('../assets/ArchInterio.png')}
          style={style.image}
          resizeMode="contain"
        />
        {/* </SharedElement> */}
      </View>
    </View>
  );
};

export default Splash;

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
    height: metrics.HEIGHT * 0.3,
    width: metrics.WIDTH * 0.9,
  },
});

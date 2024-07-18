import React from 'react';
import {Image, View} from 'react-native';

const Loading = props => {
  return (
    <View
      style={{
        // marginTop: metrics.HEIGHT * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        // height: metrics.HEIGHT * 0.075,
      }}>
      <Image
        source={require('../assets/loader.gif')}
        style={{width: 200, height: 50}}
        // resizeMode="contain"
      />
      {/* <ActivityIndicator size={25} color="white" /> */}
    </View>
  );
};

export default Loading;

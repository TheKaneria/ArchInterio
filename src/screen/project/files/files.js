/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../../../utils/metrics';
import * as Animatable from 'react-native-animatable';
import fonts from '../../../utils/fonts';
const data = [
  {
    id: 1,
    name: 'test',
    img: require('../../../assets/checkeddoc.png'),
  },
];

const Files = props => {
  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Files" navigation={props.navigation} />
      <FlatList
        data={data}
        style={{marginBottom: 50, marginTop: 10}}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <LinearGradient
              animation="slideInLeft"
              colors={['#393E46', '#393E46', '#393E46']}
              style={{
                padding: '3%',
                elevation: 8,
                borderRadius: 15,
                backgroundColor: '#393E46',
                marginTop: '3%',
                marginBottom: '2%',
                flexDirection: 'row',
                width: '90%',
                // alignItems: 'flex-start',
                // alignSelf: 'center',
                marginHorizontal: '5%',
              }}>
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: "red",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginHorizontal: '1%',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Fontisto
                      name="person"
                      size={20}
                      style={{
                        marginHorizontal: '5%',
                        color: '#00ADB5',
                      }}
                    />
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: '500',
                        marginLeft: '8%',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '4%',
                    }}>
                    <AntDesign name="edit" size={30} color={'#00ADB5'} />
                  </TouchableOpacity>
                </View>
                {/* <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      fontFamily: fonts.NeueHaasDisplayRomandark,
                    }}>
                    File
                  </Text>
                </View> */}
                <View style={{marginTop: 10}}>
                  <Image
                    source={item.img}
                    style={{width: 100, height: 100}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </LinearGradient>
          );
        }}
      />
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Createfile', {
            item: '',
          })
        }
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00ADB5',
          width: 50,
          height: 50,
          alignSelf: 'flex-end',
          padding: 10,
          borderRadius: 50,
          right: 20,
          position: 'absolute',
          bottom: 20,
        }}>
        <AntDesign name="plus" size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default Files;

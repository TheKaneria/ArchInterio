import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import metrics from '../../utils/metrics';
import * as Animatable from 'react-native-animatable';
import {useBasicContext} from '../../context/basic_context';

const DATA = [
  {id: 1, Franchise: 'Franchise', name: 'Landscape Design'},
  {id: 2, Franchise: 'Franchise', name: 'Landscape Design'},
  {id: 3, Franchise: 'Franchise', name: 'Landscape Design'},
];

const Type = props => {
  const {GetTypeget, type_array, type_loading} = useBasicContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetTypeget(props);
    });
    return unsubscribe;
  }, [props]);

  const renderItem = item => {
    return (
      <LinearGradient
        animation="slideInLeft"
        colors={['#393E46', '#393E46', '#393E46']}
        style={{
          padding: '3%',
          borderRadius: 15,
          backgroundColor: '#393E46',
          marginVertical: '3%',
          paddingVertical: '5%',
          flexDirection: 'row',
          width: '90%',
          marginHorizontal: '5%',
          shadowColor: '#ffffff',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.17,
          shadowRadius: 2.54,
          elevation: 1,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',

              width: metrics.WIDTH * 0.9,
              justifyContent: 'space-between',
            }}></View>

          <View style={{marginVertical: '6%'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '2%',
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Name :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Prefix :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.prefix}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '4%',
              marginRight: '5%',
            }}>
            {/* <TouchableOpacity
            // onPress={() => props.navigation.navigate('AddType')}
            >
              <Text
                style={{
                  backgroundColor: '#00ADB5',
                  width: metrics.WIDTH * 0.23,
                  paddingVertical: '3%',
                  borderRadius: 7,
                  color: colors.black,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                EDIT
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity>
              <Text
                style={{
                  backgroundColor: '#00ADB5',
                  width: metrics.WIDTH * 0.23,
                  paddingVertical: '3%',
                  borderRadius: 7,
                  color: colors.black,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                DELETE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Type" navigation={props.navigation} />
      {type_loading === true ? (
        <Image
          source={require('../../assets/load.gif')}
          style={{
            width: 200,
            height: 50,
            marginTop: metrics.HEIGHT * 0.4,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          // resizeMode="contain"
        />
      ) : (
        <FlatList
          data={type_array}
          contentContainerStyle={{paddingBottom: '16%'}}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return renderItem(item);
          }}
        />
      )}
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('AddType')}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#00ADB5',
          height: 55,
          width: 55,
          borderRadius: 55,
          alignItems: 'center',
          justifyContent: 'center',

          shadowColor: '#67707e',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.17,
          shadowRadius: 2.54,
          elevation: 3,
        }}>
        <Feather name="plus" color={'#fff'} size={32} />
      </TouchableOpacity> */}
    </View>
  );
};
export default Type;

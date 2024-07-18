/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../../../utils/metrics';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useProjectContext} from '../../../context/project_context';
import {useLoginContext} from '../../../context/login_context';

const Expanse = props => {
  const {GetProject, expenses, mainid} = useProjectContext();
  const {setLogout} = useLoginContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetProject(props, mainid);
    });
    return unsubscribe;
  }, [props]);

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Expanse" navigation={props.navigation} />
      {/* <View style={style.serchview}>
        <Fontisto
          style={{}}
          name="search"
          color={colors.themecolor}
          size={20}
        />
        <TextInput
          keyboardType="default"
          placeholder="Search Here..."
          placeholderTextColor={colors.darkgray}
          style={style.searchtextin}
          onChangeText={() => {}}
        />
      </View> */}
      <FlatList
        data={expenses}
        contentContainerStyle={{paddingBottom: '16%'}}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
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
                    // backgroundColor: "red",
                    width: metrics.WIDTH * 0.9,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: '#00ADB5',
                        fontWeight: '600',
                        marginLeft: '13%',
                        fontSize: 16,
                      }}>
                      {item.item_name}
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: '6%'}}>
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
                      Price :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.price}
                    </Text>
                  </View>
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
                      Purchase Date :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.purchase_date}
                    </Text>
                  </View>
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
                      Purchase From :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.purchase_from}
                    </Text>
                  </View>
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
                      Expansan Cetagory :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.category}
                    </Text>
                  </View>
                </View>
                {/* <View
                  style={{
                    marginHorizontal: '4%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#009199',
                      width: metrics.WIDTH * 0.2,
                      paddingVertical: '1.7%',
                      borderRadius: 10,
                      borderWidth: 0.6,
                      borderColor: '#00ADB5',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="account-edit-outline"
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#009199',
                      width: metrics.WIDTH * 0.35,
                      borderWidth: 0.4,
                      borderColor: '#00ADB5',
                      paddingVertical: '1.7%',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '6%',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: 16,
                        marginRight: '8%',
                      }}>
                      Delete
                    </Text>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            </LinearGradient>
          );
        }}
      />
      {/* <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Addexpanse', {
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
          //   width: metrics.WIDTH * 0.25,
          alignSelf: 'flex-end',
          padding: 10,
          borderRadius: 50,
          right: 20,
          position: 'absolute',
          bottom: 20,
        }}>
        <AntDesign name="plus" size={30} color={colors.white} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Expanse;
const style = StyleSheet.create({
  textinputview: {
    // marginTop: metrics.HEIGHT * 0.02,
    marginHorizontal: '5%',
    elevation: 3,
    borderRadius: 5,
    backgroundColor: colors.white,
    height: metrics.HEIGHT * 0.07,
    justifyContent: 'center',
  },
  serchview: {
    width: '90%',
    flexDirection: 'row',
    borderRadius: 15,
    // height: metrics.HEIGHT * 0.07,
    // marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 8,
    marginHorizontal: '5%',
    marginBottom: '2%',
    background: 'transparent',
    paddingHorizontal: '3%',
    padding: 5,
    marginTop: 20,
  },
  searchtextin: {
    width: '80%',
    marginLeft: '5%',
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
});

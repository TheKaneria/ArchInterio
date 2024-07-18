/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import metrics from '../../utils/metrics';
import {useBasicContext} from '../../context/basic_context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  delete_user_url,
  update_user_status_url,
} from '../../utils/baseurl';
import SimpleToast from 'react-native-simple-toast';

const Totalclient = props => {
  const {GetClint, clint_array, clint_loading} = useBasicContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetClint(props);
    });
    return unsubscribe;
  }, [props]);

  const UpdatestatusEmployee = async (id, status) => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);

    axios
      .post(update_user_status_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('res-getclint', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            SimpleToast.show(res.data.message);
            GetClint(props);
          }
        }
      })
      .catch(err => {
        console.log('errr', err);
      });
  };

  const DeleteUSer = async (id, status) => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', id);

    axios
      .post(delete_user_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('res-getclint', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            SimpleToast.show(res.data.message);
            GetClint(props);
          }
        }
      })
      .catch(err => {
        console.log('errr', err);
      });
  };
  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Total Client" navigation={props.navigation} />
      {clint_loading === true ? (
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
          data={clint_array}
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
                  marginTop: '3%',
                  marginBottom: '2%',
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
                  elevation: 3,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: "red",
                      width: metrics.WIDTH * 0.9,
                      justifyContent: 'space-between',
                    }}>
                    {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                
                      <Image
                        source={require('../../assets/fran.png')}
                        style={{
                          height: metrics.HEIGHT * 0.03,
                          width: metrics.WIDTH * 0.06,
                          marginLeft: '9%',
                          marginRight: '7%',
                        }}
                      />
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontWeight: '600',
                          marginLeft: '2%',
                          fontSize: 16,
                        }}>
                       
                      </Text>
                    </View> */}
                  </View>
                  {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: '3%',
                    marginHorizontal: '3%',
                    width: metrics.WIDTH * 0.83,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 2,
                      backgroundColor: colors.themecolor,
                    }}
                  />
                </View> */}
                  <View style={{marginVertical: '6%'}}>
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
                        marginTop: '2%',
                        marginHorizontal: '4%',
                        width: '80%',
                      }}>
                      <Text
                        style={{
                          color: '#FFF',
                          fontWeight: '700',
                          fontSize: 15,
                        }}>
                        Email :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.email}
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
                        Contact :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.contact}
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
                        Status :
                      </Text>
                      {item.status == 1 ? (
                        <TouchableOpacity
                          onPress={() => {
                            UpdatestatusEmployee(item.id, 0);
                          }}
                          style={{marginLeft: '5%'}}>
                          <FontAwesome
                            name={'toggle-on'}
                            size={30}
                            color={colors.white}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            UpdatestatusEmployee(item.id, 1);
                          }}
                          style={{marginLeft: '5%'}}>
                          <FontAwesome
                            name={'toggle-off'}
                            size={30}
                            color={colors.white}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal: '4%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Addclient', {
                          item: item,
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#009199',
                        width: metrics.WIDTH * 0.35,
                        paddingVertical: '1.7%',
                        borderRadius: 10,
                        borderWidth: 0.6,
                        borderColor: '#00ADB5',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '500',
                          fontSize: 16,
                          marginRight: '8%',
                        }}>
                        Edit
                      </Text>
                      <MaterialCommunityIcons
                        name="account-edit-outline"
                        size={25}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        DeleteUSer(item.id);
                      }}
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
                  </View>
                </View>
              </LinearGradient>
            );
          }}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Addclient', {
            item: '',
          })
        }
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderWidth: 2,
          borderColor: '#00ADB5',
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
      </TouchableOpacity>
    </View>
  );
};

export default Totalclient;

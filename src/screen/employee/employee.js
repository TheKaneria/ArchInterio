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
  AsyncStorage,
  PermissionsAndroid,
} from 'react-native';
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import metrics from '../../utils/metrics';
import {useEmployeeContext} from '../../context/employee_context';
import axios from 'axios';
import {ACCEPT_HEADER, updateempstatus_url} from '../../utils/baseurl';
import {useLoginContext} from '../../context/login_context';
import SimpleToast from 'react-native-simple-toast';

const DATA = [
  {
    id: 1,
    franchise: 'Testing',
    name: 'name',
    email: 'abc@employee.com',
    mobile: '0000000000',
    status: 'active',
  },
  {
    id: 2,
    franchise: 'Testing',
    name: 'name',
    email: 'abc@employee.com',
    mobile: '0000000000',
    status: 'active',
  },
  {
    id: 3,
    franchise: 'Testing',
    name: 'name',
    email: 'abc@employee.com',
    mobile: '0000000000',
    status: 'active',
  },
];

const Employee = props => {
  const {GetEmployee, employee_array, employee_loading} = useEmployeeContext();
  const {setLogout} = useLoginContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetEmployee(props);
    });
    return unsubscribe;
  }, [props]);

  const UpdatestatusEmployee = async (id, status) => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status);

    axios
      .post(updateempstatus_url, formdata, {
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
            GetEmployee(props);
          }
        }
      })
      .catch(err => {
        console.log('errr', err);
      });
  };

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Employee" navigation={props.navigation} />
      {employee_loading === true ? (
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
          data={employee_array}
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

                      width: metrics.WIDTH * 0.9,
                      justifyContent: 'space-between',
                    }}></View>

                  <View style={{marginVertical: '6%'}}>
                    {/* <View
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
                      Franchise :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.franchise}
                    </Text>
                  </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        // marginTop: '2%',
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
                        Mobile No :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.mobile_no}
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
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: '4%',
                      marginRight: '5%',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Addemployee', {
                          item: item,
                        })
                      }>
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
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
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
                  </TouchableOpacity> */}
                  </View>
                </View>
              </LinearGradient>
            );
          }}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Addemployee', {
            item: '',
          })
        }
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
      </TouchableOpacity>
    </View>
  );
};

export default Employee;

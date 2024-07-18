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
  ActivityIndicator,
  Linking,
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
import axios from 'axios';
import {
  ACCEPT_HEADER,
  getrerapdf_url,
  getrera_url,
  reradelete_url,
} from '../../utils/baseurl';
import {useLoginContext} from '../../context/login_context';
import Toast from 'react-native-simple-toast';

const ReraRegistration = props => {
  const {setLogout} = useLoginContext();
  const [getarray, SetArray] = useState([]);
  const [getload, SetLoad] = useState(false);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getrera();
    });
    return unsubscribe;
  }, [props]);

  const getrera = async () => {
    SetLoad(true);
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getrera_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          SetLoad(false);
        } else if (res.data.success === 1) {
          // console.log('res-getmaterial', res.data);
          SetArray(res.data.data);
          SetLoad(false);
        } else {
          null;
          SetLoad(false);
        }
      })
      .catch(err => {
        console.log('log', err);
        SetLoad(false);
      });
  };

  const [getindex, SetIndex] = useState('');
  const [loading, SetLoading] = useState(false);

  const deletematype = async id => {
    SetLoading(true);
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', id);

    axios
      .post(reradelete_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        console.log('resss', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          SetLoading(false);
        } else if (res.data.success == 1) {
          Toast.show(res.data.message);
          SetLoading(false);
          getrera();
        } else {
          null;
          SetLoading(false);
        }
      })
      .catch(err => {
        console.log('log', err);
        SetLoading(false);
      });
  };

  const [pdfload, SetPDFLoad] = useState(false);

  const pdfview = async id => {
    SetPDFLoad(true);
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', id);

    axios
      .post(getrerapdf_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        console.log('resss', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          SetPDFLoad(false);
        } else if (res.data.success == 1) {
          Linking.openURL(res.data.data);
          SetPDFLoad(false);
        } else {
          null;
          SetPDFLoad(false);
        }
      })
      .catch(err => {
        console.log('log', err);
        SetPDFLoad(false);
      });
  };

  const renderItem = (item, index) => {
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
                Invoice No :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.invoice_no}
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
                Clint :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.client ? item.client.name : ''}
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
                Invoice Date :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.invoice_date}
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
                Due Date :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.due_date}
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
            <TouchableOpacity
            //   onPress={() =>
            //     props.navigation.navigate('AddMaterialType', {
            //       item: item,
            //     })
            //   }
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
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#00ADB5',
                width: metrics.WIDTH * 0.23,
                paddingVertical: '3%',
                borderRadius: 7,
              }}
              onPress={() => {
                deletematype(item.id);
                SetIndex(index);
              }}>
              {getindex === index && loading === true ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text
                  style={{
                    color: colors.black,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  DELETE
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#00ADB5',
                width: metrics.WIDTH * 0.23,
                paddingVertical: '3%',
                borderRadius: 7,
              }}
              onPress={() => {
                pdfview(item.id);
                SetIndex(index);
              }}>
              {getindex === index && pdfload === true ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text
                  style={{
                    color: colors.black,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  PDF
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Rera Registration" navigation={props.navigation} />
      {getload === true ? (
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
          data={getarray}
          contentContainerStyle={{paddingBottom: '16%'}}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('AddReraRegistration', {
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

export default ReraRegistration;

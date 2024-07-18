/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import colors from '../utils/colors';
import metrics from '../utils/metrics';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import fonts from '../utils/fonts';
import {PieChart} from 'react-native-gifted-charts';
import axios from 'axios';
import {ACCEPT_HEADER, dashboard} from '../utils/baseurl';
import {useLoginContext} from '../context/login_context';

const Home = props => {
  useFocusEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  const {setLogout} = useLoginContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetDashborad();
    });
    return unsubscribe;
  }, [props]);

  const [getData, SetData] = useState('');
  const [getchart, SetChart] = useState([]);
  const GetDashborad = async () => {
    var Token = await AsyncStorage.getItem('token');

    axios
      .get(dashboard, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.success == 1) {
          SetData(res.data.data);
          SetChart(res.data.data.chart);
        } else {
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <StatusBar backgroundColor={colors.themecolor} />
      <View
        style={{
          paddingHorizontal: '5%',
          elevation: 5,
          marginTop: '15%',
          backgroundColor: colors.themecolor,
          // marginTop: '%',
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            props.navigation.openDrawer();
          }}>
          <Feather name="menu" size={30} color={'#00ADB5'} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#EEEEEE',
            fontSize: 30,
            fontWeight: '600',
            marginVertical: '7%',
          }}>
          DASHBOARD
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: '2%'}}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              animation="slideInLeft"
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                padding: '4%',
                width: metrics.WIDTH * 0.428,
                backgroundColor: '#393E46',
                borderRadius: 20,
                elevation: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Totalclient')}
                activeOpacity={0.6}
                style={{flexDirection: 'row', paddingHorizontal: '4%'}}>
                <View style={{width: metrics.WIDTH * 0.6}}>
                  <Text
                    style={{
                      color: '#EEEEEE',
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    Total Client
                  </Text>
                  <Text
                    style={{
                      color: '#00ADB5',
                      fontWeight: '800',
                      fontSize: 36,
                      marginTop: '3%',
                    }}>
                    {getData?.total_client}
                  </Text>
                </View>
                {/* <View style={{justifyContent: 'center'}}>
                  <Image
                    source={require('../assets/client.png')}
                    style={{
                      height: metrics.HEIGHT * 0.06,
                      width: metrics.WIDTH * 0.135,
                    }}
                  />
                </View> */}
              </TouchableOpacity>
            </View>
            <View
              animation="slideInLeft"
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                padding: '4%',
                width: metrics.WIDTH * 0.428,
                backgroundColor: '#393E46',
                borderRadius: 20,
                elevation: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => props.navigation.navigate('Project')}
                style={{flexDirection: 'row', paddingHorizontal: '4%'}}>
                <View style={{width: metrics.WIDTH * 0.6}}>
                  <Text
                    style={{
                      color: '#EEEEEE',
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    Total Project
                  </Text>
                  <Text
                    style={{
                      color: '#00ADB5',
                      fontWeight: '800',
                      fontSize: 36,
                      marginTop: '3%',
                    }}>
                    {getData?.total_project}
                  </Text>
                </View>
                {/* <View style={{justifyContent: 'center'}}>
                  <Image
                    source={require('../assets/client.png')}
                    style={{
                      height: metrics.HEIGHT * 0.06,
                      width: metrics.WIDTH * 0.135,
                    }}
                  />
                </View> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              animation="slideInLeft"
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                padding: '4%',
                width: metrics.WIDTH * 0.428,
                backgroundColor: '#393E46',
                borderRadius: 20,
                elevation: 20,
                justifyContent: 'space-between',
              }}>
              <View
                activeOpacity={0.6}
                // onPress={() => {}}
                style={{flexDirection: 'row', paddingHorizontal: '4%'}}>
                <View style={{width: metrics.WIDTH * 0.6}}>
                  <Text
                    style={{
                      color: '#EEEEEE',
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    Total Task
                  </Text>
                  <Text
                    style={{
                      color: '#00ADB5',
                      fontWeight: '800',
                      fontSize: 36,
                      marginTop: '3%',
                    }}>
                    {getData?.total_task}
                  </Text>
                </View>
                {/* <View style={{justifyContent: 'center'}}>
                  <Image
                    source={require('../assets/client.png')}
                    style={{
                      height: metrics.HEIGHT * 0.06,
                      width: metrics.WIDTH * 0.135,
                    }}
                  />
                </View> */}
              </View>
            </View>
            <View
              animation="slideInLeft"
              style={{
                marginTop: metrics.HEIGHT * 0.02,
                padding: '4%',
                width: metrics.WIDTH * 0.428,
                backgroundColor: '#393E46',
                borderRadius: 20,
                elevation: 20,
                justifyContent: 'space-between',
              }}>
              <View
                activeOpacity={0.6}
                // onPress={() => {
                //   props.navigation.navigate('TotalInvoice');
                // }}
                style={{flexDirection: 'row', paddingHorizontal: '4%'}}>
                <View style={{width: metrics.WIDTH * 0.6}}>
                  <Text
                    style={{
                      color: '#EEEEEE',
                      fontWeight: '600',
                      fontSize: 16,
                    }}>
                    Total Invoice
                  </Text>
                  <Text
                    style={{
                      color: '#00ADB5',
                      fontWeight: '800',
                      fontSize: 36,
                      marginTop: '3%',
                    }}>
                    {getData?.total_invoice}
                  </Text>
                </View>
                {/* <View style={{justifyContent: 'center'}}>
                  <Image
                    source={require('../assets/client.png')}
                    style={{
                      height: metrics.HEIGHT * 0.06,
                      width: metrics.WIDTH * 0.135,
                    }}
                  />
                </View> */}
              </View>
            </View>
          </View>
          <View
            animation="slideInLeft"
            style={{
              marginTop: metrics.HEIGHT * 0.02,
              padding: '4%',
              backgroundColor: '#393E46',
              borderRadius: 20,
              elevation: 20,
              justifyContent: 'space-between',
            }}>
            <View
              // onPress={() => {}}
              style={{flexDirection: 'row', paddingHorizontal: '4%'}}>
              <View style={{width: metrics.WIDTH * 0.6}}>
                <Text
                  style={{
                    color: '#EEEEEE',
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Total Expense
                </Text>
                <Text
                  style={{
                    color: '#00ADB5',
                    fontWeight: '800',
                    fontSize: 36,
                    marginTop: '3%',
                  }}>
                  {getData?.total_expenase}
                </Text>
              </View>
              {/* <View style={{justifyContent: 'center'}}>
                  <Image
                    source={require('../assets/client.png')}
                    style={{
                      height: metrics.HEIGHT * 0.06,
                      width: metrics.WIDTH * 0.135,
                    }}
                  />
                </View> */}
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: '10%',
            alignItems: 'center',
            width: metrics.WIDTH * 1,
          }}>
          <Text
            style={{
              color: '#EEEEEE',
              fontSize: 24,
              fontWeight: '500',
              marginBottom: '4%',
              marginRight: '4%',
            }}>
            Project
          </Text>
          <PieChart
            radius={150}
            textSize={18}
            showText
            // isThreeD
            textColor="white"
            focusOnPress
            // showTextBackground
            textBackgroundRadius={26}
            data={getchart}
            fontWeight="bold"
          />

          <FlatList
            data={getchart}
            numColumns={3}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: '5%',
                    alignItems: 'center',
                  }}>
                  <Octicons name="dot-fill" color={item.color} size={26} />
                  <Text
                    style={{
                      color: '#EEEEEE',
                      marginLeft: '2%',
                      marginRight: '2%',
                    }}>
                    {item.text}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

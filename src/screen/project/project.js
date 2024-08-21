/* eslint-disable react-native/no-inline-styles */
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
import RNModal from 'react-native-modal';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  getproject_url,
  project_delete_url,
  projectstatusupdate_url,
} from '../../utils/baseurl';
import Toast from 'react-native-simple-toast';
import {useLoginContext} from '../../context/login_context';

const Status = [
  {
    id: 1,
    title: 'On Hold',
  },
  {
    id: 2,
    title: 'In Progress',
  },
  {
    id: 3,
    title: 'Completed',
  },
  {
    id: 4,
    title: 'Cancelled',
  },
  {
    id: 5,
    title: 'Pending',
  },
];

const Project = props => {
  const {setLogout} = useLoginContext();

  const [getcon, setcon] = useState(false);
  const [getindex, setindex] = useState();
  const [getstatusid, setstatusid] = useState('');
  const [statusmodel, setstatusmodal] = useState(false);
  const [getarray, SetArray] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getProjectlist();
    });
    return unsubscribe;
  }, [props]);

  const [isload, SetLoad] = useState(false);

  const getProjectlist = async () => {
    SetLoad(true);
    var Token = await AsyncStorage.getItem('token');
    await axios
      .get(getproject_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('sdd', res.data);
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.success == 1) {
          SetArray(res.data.data);
          SetLoad(false);
        } else {
          null;
          SetLoad(false);
        }
      })
      .catch(err => {
        SetLoad(false);
        console.log('err', JSON.stringify(err, null, 2));
      });
  };

  const Statuschange = async id => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', getstatusid);
    formdata.append('status', id);

    // console.log('id', formdata);
    await axios
      .post(projectstatusupdate_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('sdd', res.data);
        if (res.data.success == 1) {
          Toast.show(res.data.message);
          getProjectlist();
        } else {
          null;
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
      });
  };

  const Delete_Project = async id => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', id);
    await axios
      .post(project_delete_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else if (res.data.success == 1) {
          Toast.show(res.data.message);
          getProjectlist();
        } else {
          null;
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
      });
  };

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
          <View style={{marginVertical: '2%'}}>
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
                Project Code :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.code}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '4%',
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Project Name :
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
                marginTop: '4%',
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Client Name :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.clients?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '4%',
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Deadline :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.deadline}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '4%',
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Bealing Start Date :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.bealing_start_date ? item.bealing_start_date : 'N/A'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '4%',
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Renual Date :
              </Text>
              <Text
                style={{
                  color: '#CCD6DD',
                  marginLeft: '3%',
                  fontWeight: '550',
                  fontSize: 15,
                }}>
                {item.renual_date ? item.renual_date : 'N/A'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '4%',
                marginHorizontal: '4%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                Status : {''}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  item.status == 3
                    ? Toast.show('Status already completed')
                    : setstatusmodal(true);
                  setstatusid(item.id);
                }}
                style={{
                  backgroundColor: colors.white,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    marginLeft: '3%',
                    color: colors.black,
                    fontWeight: '500',
                    fontSize: 16,
                  }}>
                  {item.status_value}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: '4%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '4%',
              // width: '100%',
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Edit', {
                  idd: item.id,
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
            <TouchableOpacity
              onPress={() => {
                Delete_Project(item.id);
              }}>
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
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('Report')}>
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
                REPORT
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Projects" navigation={props.navigation} />
      {isload === true ? (
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
            return renderItem(item);
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Basic')}
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
      <RNModal
        animationType="slide"
        transparent={true}
        isVisible={statusmodel}
        onBackButtonPress={() => {
          setstatusmodal(false);
        }}
        onBackdropPress={() => {
          setstatusmodal(false);
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 5,
            // flex: 1,
            width: metrics.WIDTH * 0.8,
            alignSelf: 'center',
            marginTop: '10%',
            marginBottom: '10%',
            paddingTop: 15,
            elevation: 3,
          }}>
          <FlatList
            data={Status}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{paddingBottom: '5%', marginHorizontal: '5%'}}
                  onPress={() => {
                    Statuschange(item.id);
                    setstatusmodal(false);
                  }}>
                  <Text style={{color: colors.black, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </RNModal>
    </View>
  );
};

export default Project;

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
  },
  searchtextin: {
    width: '80%',
    marginLeft: '5%',
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
});

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
  Image,
  AsyncStorage,
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useProjectContext} from '../../../context/project_context';
import {useLoginContext} from '../../../context/login_context';
import RNModal from 'react-native-modal';
import axios from 'axios';
import {ACCEPT_HEADER, update_task_status_url} from '../../../utils/baseurl';
import Toast from 'react-native-simple-toast';

const Status = [
  {
    id: 1,
    title: 'To Do',
  },
  {
    id: 2,
    title: 'Working',
  },
  {
    id: 3,
    title: 'To Check',
  },
  {
    id: 4,
    title: 'Completed',
  },
  {
    id: 5,
    title: 'Client Approval',
  },
];

const Task = props => {
  const {GetProject, tasks, mainid, post_data} = useProjectContext();
  const {setLogout} = useLoginContext();
  const [statusmodel, setstatusmodal] = useState(false);
  const [getstatusid, setstatusid] = useState('');
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetProject(props, mainid);
    });
    return unsubscribe;
  }, [props]);

  const Statuschange = async id => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData(id);
    formdata.append('id', getstatusid);
    formdata.append('status', id);

    axios
      .post(update_task_status_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            Toast.show(res.data.message);
            GetProject(props, mainid);
          }
        }
      })
      .catch(err => {
        console.log('errr', err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Tasks" navigation={props.navigation} />

      <FlatList
        data={tasks}
        contentContainerStyle={{paddingBottom: '16%'}}
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
                    <FontAwesome
                      name="tasks"
                      size={20}
                      style={{
                        marginLeft: '13%',
                        marginRight: '6%',
                        color: '#00ADB5',
                      }}
                    />
                    <Text
                      style={{
                        color: '#00ADB5',
                        fontWeight: '600',
                        marginLeft: '2%',
                        fontSize: 16,
                      }}>
                      {item.name}
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
                      Project Name :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {post_data?.name}
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
                      Milestone :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.milestones?.name}
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
                      Start Date :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.start_date}
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
                      End Date :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.end_date}
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
                        item.status == 4
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
                    marginHorizontal: '4%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('CreateTask', {
                        item: item,
                      });
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
                      Edit
                    </Text>
                    <MaterialCommunityIcons
                      name="account-edit-outline"
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
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
                  </TouchableOpacity> */}
                </View>
              </View>
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
                          <Text
                            style={{color: colors.black, fontWeight: 'bold'}}>
                            {item.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </RNModal>
            </LinearGradient>
          );
        }}
      />
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('CreateTask', {
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
      </TouchableOpacity>
    </View>
  );
};

export default Task;

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

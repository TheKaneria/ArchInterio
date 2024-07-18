import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  AsyncStorage,
} from 'react-native';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import metrics from '../../../utils/metrics';
import {useProjectContext} from '../../../context/project_context';
import {useLoginContext} from '../../../context/login_context';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  add_space_type_url,
  update_space_type_url,
} from '../../../utils/baseurl';
import SimpleToast from 'react-native-simple-toast';

const SpaceType = props => {
  const [isVisible, setisVisible] = useState(false);

  const {GetProject, spacetypes, mainid} = useProjectContext();
  const {setLogout} = useLoginContext();
  const [getid, SetId] = useState('');
  const [isedit, SetIsEdit] = useState(false);
  const [title, SetTitle] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetProject(props, mainid);
    });
    return unsubscribe;
  }, [props]);

  const AddData = async () => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('project_id', mainid);
    formdata.append('name', title);
    axios
      .post(add_space_type_url, formdata, {
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
            setisVisible(false);
            GetProject(props, mainid);
          }
        }
      })
      .catch(err => {
        console.log('errr', err);
      });
  };

  const UpdateData = async () => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('name', title);
    axios
      .post(update_space_type_url, formdata, {
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
            setisVisible(false);
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
      <Backcom title="Space Type" navigation={props.navigation} />
      <FlatList
        data={spacetypes}
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
                      # {item.id}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: '6%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
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
                  <TouchableOpacity
                    onPress={() => {
                      SetId(item.id);
                      SetTitle(item.name);
                      SetIsEdit(true);
                      setisVisible(true);
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: '10%',
                    }}>
                    <AntDesign name="edit" size={25} color={'#00ADB5'} />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => {
          SetId('');
          SetTitle('');
          SetIsEdit(false);
          setisVisible(true);
        }}
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
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setisVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              height: metrics.HEIGHT * 0.4,
              width: metrics.WIDTH * 1,
            }}>
            <View style={{marginTop: '5%', marginHorizontal: '5%'}}>
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.04,
                  fontWeight: 'bold',
                }}>
                {isedit === true ? 'Update space Type' : 'Add space Type'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 18,
                }}>
                Add Space Type
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.gray,
                marginHorizontal: '5%',
                marginTop: 10,
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Enter space type"
                placeholderTextColor={colors.gray}
                style={{
                  color: colors.black,
                  fontSize: 18,
                  marginHorizontal: 2,
                }}
                value={title}
                onChangeText={e => {
                  SetTitle(e);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '10%',
                marginTop: metrics.HEIGHT * 0.05,
                alignItems: 'center',
              }}>
              {isedit === true ? (
                <TouchableOpacity
                  onPress={() => {
                    UpdateData();
                  }}
                  style={{
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10,

                    backgroundColor: '#00ADB5',
                  }}>
                  <Text
                    style={{
                      fontSize: metrics.HEIGHT * 0.022,
                      fontWeight: 'bold',
                      color: colors.white,
                    }}>
                    Update
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    AddData();
                  }}
                  style={{
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10,

                    backgroundColor: '#00ADB5',
                  }}>
                  <Text
                    style={{
                      fontSize: metrics.HEIGHT * 0.022,
                      fontWeight: 'bold',
                      color: colors.white,
                    }}>
                    ADD
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  setisVisible(false);
                }}
                style={{
                  borderWidth: 0.9,
                  borderColor: colors.gray,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: metrics.HEIGHT * 0.022,
                    fontWeight: 'bold',
                    color: colors.black,
                  }}>
                  CANCLE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SpaceType;
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

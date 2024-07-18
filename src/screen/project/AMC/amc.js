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
  PermissionsAndroid,
  Platform,
  Modal,
  AsyncStorage,
} from 'react-native';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../../../utils/metrics';
import * as Animatable from 'react-native-animatable';
import fonts from '../../../utils/fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {useProjectContext} from '../../../context/project_context';
import {useLoginContext} from '../../../context/login_context';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  add_amc_url,
  delete_amc_url,
} from '../../../utils/baseurl';
import SimpleToast from 'react-native-simple-toast';

const Amc = props => {
  const [sectionmodel, setsectionmodel] = useState(false);

  const [itemName, setitemname] = useState('');

  const [isDatePickerquatation, setDatePickerquatation] = useState(false);
  const [getdatequatation, setdatequatation] = useState('');
  const showDatePickerquatation = () => {
    setDatePickerquatation(true);
  };

  const hideDatePickerquatation = () => {
    setDatePickerquatation(false);
  };

  const handleConfirmquatation = date => {
    setdatequatation(date);
    hideDatePickerquatation();
  };

  const [isDatePickerquatation1, setDatePickerquatation1] = useState(false);
  const [getdatequatation1, setdatequatation1] = useState('');
  const showDatePickerquatation1 = () => {
    setDatePickerquatation1(true);
  };

  const hideDatePickerquatation1 = () => {
    setDatePickerquatation1(false);
  };

  const handleConfirmquatation1 = date => {
    setdatequatation1(date);
    hideDatePickerquatation1();
  };
  const [isVisible, setisVisible] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [type, settype] = useState({});
  const [fileName, setfileName] = useState({});
  const [imguri, seturi] = useState('');
  const [img, setimg] = useState();
  const [imgcondition, setcondition] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };
  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();

    if (isCameraPermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath(response);
        seturi(response.assets[0].uri);
        settype(response.assets[0].type);
        setfileName(response.assets[0].fileName);
        setisVisible(!isVisible);
        setcondition(true);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath(response);
      seturi(response.assets[0].uri);
      AsyncStorage.setItem('img', response.assets[0].uri);
      settype(response.assets[0].type);
      setfileName(response.assets[0].fileName);
      setisVisible(!isVisible);
      setcondition(true);
    });
  };

  const {GetProject, amcs, mainid} = useProjectContext();
  const {setLogout} = useLoginContext();

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
    formdata.append('item_name[0]', itemName);
    formdata.append(
      'purchase_date[0]',
      moment(getdatequatation).format('YYYY-MM-DD'),
    );
    formdata.append(
      'expiry_date[0]',
      moment(getdatequatation1).format('YYYY-MM-DD'),
    );
    if (imguri) {
      var img = {uri: imguri, name: fileName, type: type};
      formdata.append('amc_document[0]', img);
    }
    axios
      .post(add_amc_url, formdata, {
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
            SimpleToast.show(res.data.message);
            setsectionmodel(false);
            setitemname('');
            setdatequatation('');
            setdatequatation1('');
            GetProject(props, mainid);
          }
        }
      })
      .catch(err => {
        console.log('errr', err);
      });
  };

  const Delete_Project = async id => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', id);

    axios
      .post(delete_amc_url, formdata, {
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
      <Backcom title="AMC" navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '20%',
        }}>
        <View style={{marginTop: 10}}>
          <FlatList
            data={amcs}
            style={{marginTop: 10}}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <LinearGradient
                  animation="slideInLeft"
                  colors={['#393E46', '#393E46', '#393E46']}
                  style={{
                    padding: '3%',
                    elevation: 2,
                    borderRadius: 13,
                    backgroundColor: '#393E46',
                    marginTop: '3%',
                    marginBottom: '2%',
                    flexDirection: 'row',
                    // width: '90%',
                    // alignItems: 'flex-start',
                    // alignSelf: 'center',
                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <TouchableOpacity
                      onPress={() => {
                        Delete_Project(item.id);
                      }}
                      style={{
                        right: '1%',
                        position: 'absolute',
                      }}>
                      <Ionicons
                        name="close-circle-sharp"
                        size={28}
                        color={'#00ADB5'}
                        style={{}}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Item Name
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            marginTop: 5,
                          }}>
                          {item.item_name}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Purchase Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginTop: 5,
                        }}>
                        {item.purchase_date}
                      </Text>
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Expiry Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginTop: 5,
                        }}>
                        {item.expiry_date}
                      </Text>
                    </View>
                    {item.document_full_path ? (
                      <View style={{marginTop: 15}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Document
                        </Text>
                        <Image
                          source={{uri: item.document_full_path}}
                          style={{
                            height: 100,
                            width: 100,
                            marginLeft: 5,
                            // borderRadius: 100,
                            borderWidth: 1,
                            // borderColor: colors.blue,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    ) : null}
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 20,
          width: '90%',
          marginHorizontal: '5%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setitemname('');
            setdatequatation('');
            setdatequatation1('');
            setsectionmodel(true);
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00ADB5',
            width: 50,
            height: 50,
            borderRadius: 50,
            // right: 15,
          }}>
          <AntDesign name="plus" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={sectionmodel}
        onRequestClose={() => {
          setsectionmodel(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: colors.themecolor,
          }}>
          <ScrollView
            style={{
              backgroundColor: colors.themecolor,
              width: metrics.WIDTH * 1,
            }}>
            <View
              style={{
                marginTop: '5%',
                marginRight: '5%',
                alignItems: 'flex-end',
              }}>
              <Ionicons
                name="close-circle-sharp"
                size={30}
                color={'#00ADB5'}
                style={{}}
                onPress={() => {
                  setsectionmodel(false);
                }}
              />
            </View>
            <View style={styles.boxtaxview} />
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>Item Name :</Text>
            </View>
            <View
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                alignItems: 'center',
                marginHorizontal: '5%',
                borderRadius: 13,
                backgroundColor: '#393E46',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  color: '#fff',
                  backgroundColor: '#393E46',
                }}
                multiline
                placeholder="Enter Item Name "
                placeholderTextColor={colors.gray}
                value={itemName}
                onChangeText={text => {
                  setitemname(text);
                }}
              />
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>
                Purchase Date :
              </Text>
            </View>
            <View
              style={{
                height: metrics.HEIGHT * 0.06,
                borderWidth: 0.5,
                borderColor: '#393E46',
                borderRadius: 5,
                backgroundColor: '#393E46',
                justifyContent: 'center',
                marginHorizontal: '5%',
                marginTop: '2%',
                marginBottom: '2%',
                // paddingTop: 15,
                // paddingBottom: 15,
              }}>
              <DateTimePickerModal
                isVisible={isDatePickerquatation}
                mode="date"
                onConfirm={handleConfirmquatation}
                onCancel={hideDatePickerquatation}
              />
              <TouchableOpacity onPress={showDatePickerquatation}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      alignSelf: 'center',
                      marginHorizontal: '5%',
                    }}>
                    {moment(getdatequatation).format('DD/MM/YYYY') ===
                    'Invalid date'
                      ? 'dd/mm/yyyy'
                      : moment(getdatequatation).format('DD/MM/YYYY')}
                  </Text>
                  <Fontisto
                    name="date"
                    size={20}
                    style={{
                      marginHorizontal: '5%',
                      color: '#00ADB5',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>
                Expiry Date :
              </Text>
            </View>
            <View
              style={{
                height: metrics.HEIGHT * 0.06,
                borderWidth: 0.5,
                borderColor: '#393E46',
                borderRadius: 5,
                backgroundColor: '#393E46',
                justifyContent: 'center',
                marginHorizontal: '5%',
                marginTop: '2%',
                marginBottom: '2%',
                // paddingTop: 15,
                // paddingBottom: 15,
              }}>
              <DateTimePickerModal
                isVisible={isDatePickerquatation1}
                mode="date"
                onConfirm={handleConfirmquatation1}
                onCancel={hideDatePickerquatation1}
              />
              <TouchableOpacity onPress={showDatePickerquatation1}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      alignSelf: 'center',
                      marginHorizontal: '5%',
                    }}>
                    {moment(getdatequatation1).format('DD/MM/YYYY') ===
                    'Invalid date'
                      ? 'dd/mm/yyyy'
                      : moment(getdatequatation1).format('DD/MM/YYYY')}
                  </Text>
                  <Fontisto
                    name="date"
                    size={20}
                    style={{
                      marginHorizontal: '5%',
                      color: '#00ADB5',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>Document :</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setisVisible(true);
              }}
              style={{marginTop: '5%', alignSelf: 'center'}}>
              {imguri == null || imguri == '' ? (
                <>
                  {img == null ? (
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="pencil-plus"
                        size={30}
                        color={colors.white}
                      />
                    </View>
                  ) : (
                    <Image
                      source={{uri: imgcondition == true ? imguri : img}}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: colors.blue,
                      }}
                      resizeMode="contain"
                    />
                  )}
                </>
              ) : (
                <Image
                  source={{uri: imguri}}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: colors.blue,
                  }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                AddData();
              }}
              style={{
                marginTop: metrics.HEIGHT * 0.1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00ADB5',
                marginHorizontal: '5%',
                width: metrics.WIDTH * 0.35,
                alignSelf: 'center',
                paddingTop: metrics.HEIGHT * 0.02,
                paddingBottom: metrics.HEIGHT * 0.02,
                borderRadius: 5,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                ADD
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
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
                Add Picture
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => chooseFile('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <MaterialIcons color={colors.black} name="photo" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => captureImage('photo')}
              style={{
                flexDirection: 'row',
                marginLeft: '5%',
                marginTop: '5%',
                alignContent: 'center',
              }}>
              <Entypo color={colors.black} name="camera" size={30} />
              <Text
                style={{
                  fontSize: metrics.HEIGHT * 0.026,
                  color: colors.black,
                  marginLeft: '2%',
                }}>
                Take A Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setisVisible(false);
              }}
              style={{
                marginTop: '5%',
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
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
      </Modal>
    </View>
  );
};

export default Amc;

const styles = StyleSheet.create({
  input: {
    height: metrics.HEIGHT * 0.06,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: '5%',
    borderColor: '#393E46',
    backgroundColor: '#393E46',
    color: colors.white,
  },
  ainput: {
    height: metrics.HEIGHT * 0.1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: '5%',
    borderColor: '#393E46',
    backgroundColor: '#393E46',
    color: colors.white,
  },
  focusedInput: {
    borderColor: '#00ADB5', // Focused border color
  },
  txt: {
    marginTop: '5%',
    marginBottom: '2%',
    marginLeft: '1%',
    color: '#00c2cc',
    fontSize: 17,
    fontWeight: '600',
  },
  dinput: {
    height: metrics.HEIGHT * 0.06,
    backgroundColor: '#393E46',
    borderRadius: 12,
    borderColor: '#00ADB5',
  },
  container: {
    marginHorizontal: '3%',
  },
  dropdown: {
    height: 50,
    borderColor: '#393E46',
    borderWidth: 0.5,
    backgroundColor: '#393E46',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#393E46',
    color: '#00ADB5',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    paddingHorizontal: '3%',
    color: '#9c9fa5',
    fontSize: 15,
  },
  selectedTextStyle: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: '3%',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  constyle: {
    borderColor: '#393E46',
    backgroundColor: '#393E46',
  },
  itemconstyle: {
    backgroundColor: '#393E46',
    borderColor: '#393E46',
    borderRadius: 10,
  },
});

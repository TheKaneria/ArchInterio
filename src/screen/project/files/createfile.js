/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import ImageViewer from 'react-native-image-zoom-viewer';

const Createfile = props => {
  const [isVisible, setisVisible] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [type, settype] = useState({});
  const [fileName, setfileName] = useState({});
  const [imguri, seturi] = useState('');
  const [img, setimg] = useState();
  const [imgcondition, setcondition] = useState(false);
  const [sectionmodel, setsectionmodel] = useState(false);
  const [getsub, setsub] = useState('');
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

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
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
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
        console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
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
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].type);
      setFilePath(response);
      seturi(response.assets[0].uri);
      AsyncStorage.setItem('img', response.assets[0].uri);
      settype(response.assets[0].type);
      setfileName(response.assets[0].fileName);
      setisVisible(!isVisible);
      setcondition(true);
    });
  };

  const [getsubject, setsubject] = useState('');
  const [get_array, set_array] = useState([]);

  const addvalue = async () => {
    const obj = {
      subject: getsubject,
      imgs: imguri,
      imgtype: type,
      imgfilename: fileName,
    };
    console.log('dataobj --->', obj);
    const data = obj;
    setsectionmodel(false);
    await set_array([...get_array, data]);
    await setsubject('');
    await seturi('');
  };
  const removePerson = index => {
    let filteredArray = get_array.filter((item, i) => i !== index);
    set_array(filteredArray);
  };

  const [imagemodal, SetImageModal] = useState(false);
  const [image_index, SetImage_index] = useState(0);
  const [image_url, SetImage_Url] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Create Files" navigation={props.navigation} />
      <View>
        <FlatList
          data={get_array}
          style={{marginBottom: 50, marginTop: 10}}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <LinearGradient
                animation="slideInLeft"
                colors={['#393E46', '#393E46', '#393E46']}
                style={{
                  padding: '3%',
                  elevation: 8,
                  borderRadius: 15,
                  marginTop: '3%',
                  flex: 1,
                  marginBottom: '2%',
                  flexDirection: 'row',
                  width: '90%',
                  // alignItems: 'flex-start',
                  // alignSelf: 'center',
                  marginHorizontal: '5%',
                  height: 200,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  <View
                    style={{
                      right: '1%',
                      position: 'absolute',
                    }}>
                    <Ionicons
                      name="close-circle-sharp"
                      size={24}
                      color={'#00ADB5'}
                      style={{}}
                      onPress={() => removePerson(index)}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: "red",
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <MaterialIcons
                        name="subject"
                        size={20}
                        style={{
                          marginHorizontal: '5%',
                          color: '#00ADB5',
                        }}
                      />
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginLeft: '2%',
                        }}>
                        {item.subject}
                      </Text>
                    </View>
                  </View>
                  {/* <View style={{marginTop: 15}}>
                    <Text
                      style={{
                        color: colors.themecolor,
                        fontSize: 16,
                        fontFamily: fonts.NeueHaasDisplayRomandark,
                      }}>
                      File
                    </Text>
                  </View> */}
                  <TouchableOpacity
                    onPress={() => {
                      SetImageModal(true);
                      SetImage_index(index);
                      SetImage_Url(item.imgs);
                    }}>
                    <Image
                      source={{uri: item.imgs}}
                      style={{
                        width: 320,
                        height: 140,
                        // borderRadius: 10,
                        alignSelf: 'center',
                      }}
                      resizeMode="center"
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 25,
          width: '90%',
          marginHorizontal: '5%',
        }}>
        {get_array == 0 ? null : (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderRadius: 30,
              backgroundColor: '#00ADB5',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // paddingTop: '5%',
              // paddingBottom: '5%',
              height: metrics.HEIGHT * 0.065,
              paddingHorizontal: '6%',
            }}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={25}
              color={'#fff'}
            />
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
              Submit
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
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
          <AntDesign name="plus" size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={sectionmodel}
        onRequestClose={() => {
          setsectionmodel(false);
          seturi('');
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
                color={colors.themecolor}
                style={{}}
                onPress={() => {
                  setsectionmodel(false);
                  seturi('');
                }}
              />
            </View>
            <View style={style.boxtaxview}>
              <View>
                <Text style={{color: colors.black, fontSize: 16}}>File :</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setisVisible(true);
                }}
                style={{marginTop: '5%'}}>
                {imguri == null || imguri == '' ? (
                  <>
                    {img == null ? (
                      <View
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: colors.blue,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons
                          name="pencil-plus"
                          size={30}
                          color={colors.black}
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
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: colors.blue, fontSize: 15}}>Subject :</Text>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: colors.black,
                marginHorizontal: '5%',
                borderRadius: 5,
              }}>
              <TextInput
                placeholderTextColor={colors.darkgray}
                style={{width: '90%', color: '#000'}}
                multiline
                placeholder="Enter Subject"
                onChangeText={text => {
                  setsubject(text);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                addvalue();
              }}
              style={{
                marginTop: metrics.HEIGHT * 0.04,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.themecolor,
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
          </View>
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
      <Modal
        visible={imagemodal}
        // visible={true}

        onRequestClose={() => SetImageModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="close"
            color={colors.themecolor}
            size={32}
            style={{
              padding: '3%',
              position: 'absolute',
              right: '5%',
              top: '2%',
              borderRadius: 10,
            }}
            onPress={() => SetImageModal(false)}
          />
          <View
            style={{
              height: '80%',
              // backgroundColor: 'red',
            }}>
            <ImageViewer
              imageUrls={[{url: image_url}]}
              // imageUrls={this.state.image_array}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Createfile;

const style = StyleSheet.create({
  boxtaxview: {
    alignItems: 'center',
    marginTop: metrics.HEIGHT * 0.0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sctionbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '1%',
    backgroundColor: colors.themecolor,
    paddingTop: metrics.HEIGHT * 0.015,
    paddingBottom: metrics.HEIGHT * 0.015,
    borderRadius: 5,
    paddingLeft: metrics.HEIGHT * 0.015,
    paddingRight: metrics.HEIGHT * 0.015,
  },
  modalview: {
    backgroundColor: colors.white,
    borderRadius: 5,
    width: metrics.WIDTH * 0.9,
    alignSelf: 'center',
    paddingTop: 15,
    elevation: 3,
  },
});

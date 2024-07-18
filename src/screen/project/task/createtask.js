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
  PermissionsAndroid,
  Platform,
  Modal,
  AsyncStorage,
} from 'react-native';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../../../utils/metrics';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {useProjectContext} from '../../../context/project_context';
import {useLoginContext} from '../../../context/login_context';
import {useEmployeeContext} from '../../../context/employee_context';
import {useVendorContext} from '../../../context/vendor_context';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  add_task_url,
  update_task_url,
} from '../../../utils/baseurl';
import SimpleToast from 'react-native-simple-toast';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const Priority = [
  {id: 1, name: 'High'},
  {id: 2, name: 'Medium'},
  {id: 3, name: 'Low'},
];

const CreateTask = props => {
  const [isDatePickerstart, setDatePickerstart] = useState(false);
  const [getstartdate, setstartdate] = useState('');
  const showDatePickerstart = () => {
    setDatePickerstart(true);
  };

  const hideDatePickerstart = () => {
    setDatePickerstart(false);
  };
  const handleConfirmstart = date => {
    setstartdate(date);
    hideDatePickerstart();
  };

  // enddate
  const [isDatePickerend, setDatePickerend] = useState(false);
  const [getenddate, setenddate] = useState('');
  const showDatePickerend = () => {
    setDatePickerend(true);
  };

  const hideDatePickerend = () => {
    setDatePickerend(false);
  };
  const handleConfirmend = date => {
    setenddate(date);
    hideDatePickerend();
  };

  const [isVisible, setisVisible] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [type, settype] = useState({});
  const [fileName, setfileName] = useState({});
  const [imguri, seturi] = useState('');
  const [img, setimg] = useState();
  const [imgcondition, setcondition] = useState(false);
  const [sectionmodel, setsectionmodel] = useState(false);
  const [getsub, setsub] = useState('');

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

  const [isDatePickerquatation, setDatePickerquatation] = useState(false);
  const [isDatePickerquatation1, setDatePickerquatation1] = useState(false);
  const [getdatequatation, setdatequatation] = useState('');
  const [getdatequatation1, setdatequatation1] = useState('');

  const showDatePickerquatation = () => {
    setDatePickerquatation(true);
  };

  const hideDatePickerquatation = () => {
    setDatePickerquatation(false);
  };

  const showDatePickerquatation1 = () => {
    setDatePickerquatation1(true);
  };

  const hideDatePickerquatation1 = () => {
    setDatePickerquatation1(false);
  };

  const handleConfirmquatation = date => {
    setdatequatation(date);
    hideDatePickerquatation();
  };

  const handleConfirmquatation1 = date => {
    setdatequatation1(date);
    hideDatePickerquatation1();
  };

  const {mainid, GetProject, post_data, milestones} = useProjectContext();
  const {setLogout} = useLoginContext();
  const {GetEmployee, employee_array} = useEmployeeContext();
  const {vendor_array, GetVendor} = useVendorContext();

  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  const [gettaskname, SetTaskName] = useState('');
  const [getdis, SetDis] = useState('');
  const [getid, SetId] = useState('');
  const [isedit, SetIsEdit] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetEmployee(props);
      GetVendor(props);
      const {item} = props.route.params;
      if (item !== '') {
        SetId(item?.id);
        SetTaskName(item.name);
        setdatequatation(new Date(item.start_date));
        setdatequatation1(new Date(item.end_date));
        setValue(item.employee.id);
        setValue1(item.vendor.id);
        setValue2(item.milestones.id);
        setValue3(item.priority);
        SetDis(item.description);
        SetIsEdit(true);
      } else {
        SetIsEdit(false);
      }
    });
    return unsubscribe;
  }, [props]);

  const AddData = async () => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('project_id', mainid);
    formdata.append('name', gettaskname);
    formdata.append(
      'start_date',
      moment(getdatequatation).format('YYYY-MM-DD'),
    );
    formdata.append('end_date', moment(getdatequatation1).format('YYYY-MM-DD'));
    formdata.append('assigned_emp', value);
    formdata.append('assigned_vendor', value1);
    formdata.append('milestone_id', value2);
    formdata.append('description', getdis);
    formdata.append('priority', value3);
    if (imguri) {
      var img = {uri: imguri, name: fileName, type: type};
      formdata.append('attachment', img);
    }

    axios
      .post(add_task_url, formdata, {
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
            props.navigation.goBack(null);
            GetProject(props, mainid);
          }
        }
      })
      .catch(err => {
        console.log('errr', JSON.stringify(err, null, 2));
      });
  };

  const UpdateData = async () => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('name', gettaskname);
    formdata.append(
      'start_date',
      moment(getdatequatation).format('YYYY-MM-DD'),
    );
    formdata.append('end_date', moment(getdatequatation1).format('YYYY-MM-DD'));
    formdata.append('assigned_emp', value);
    formdata.append('assigned_vendor', value1);
    formdata.append('milestone_id', value2);
    formdata.append('description', getdis);
    formdata.append('priority', value3);
    if (imguri) {
      var img = {uri: imguri, name: fileName, type: type};
      formdata.append('attachment', img);
    }

    axios
      .post(update_task_url, formdata, {
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
            props.navigation.goBack(null);
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
      <Backcom
        title={isedit === true ? 'Update Task' : 'Add Task'}
        navigation={props.navigation}
      />
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 80}}>
          <View style={{marginHorizontal: '3%'}}>
            <Text style={styles.txt}>Task Name</Text>
            <TextInput
              style={[styles.input]}
              placeholder={'Enter Task Name'}
              placeholderTextColor={colors.gray}
              value={gettaskname}
              onChangeText={e => {
                SetTaskName(e);
              }}
            />
          </View>
          <View style={{marginHorizontal: '3%'}}>
            <Text style={styles.txt}>Project</Text>
            <View
              style={{
                height: metrics.HEIGHT * 0.06,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: '5%',
                borderColor: '#393E46',
                backgroundColor: '#393E46',
                color: colors.white,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                }}>
                {post_data?.name}
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: '3%'}}>
            <Text style={styles.txt}>Start Date</Text>
            <View
              style={{
                height: metrics.HEIGHT * 0.06,
                borderWidth: 0.5,
                borderColor: '#393E46',
                borderRadius: 5,
                backgroundColor: '#393E46',
                justifyContent: 'center',
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
          </View>
          <View style={{marginHorizontal: '3%'}}>
            <Text style={styles.txt}>End Date</Text>
            <View
              style={{
                height: metrics.HEIGHT * 0.06,
                borderWidth: 0.5,
                borderColor: '#393E46',
                borderRadius: 5,
                backgroundColor: '#393E46',
                justifyContent: 'center',
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
          </View>
          <View style={styles.container}>
            <Text style={styles.txt}>Assigned To Employee</Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.constyle}
              dropdownPosition="bottom"
              itemContainerStyle={styles.itemconstyle}
              itemTextStyle={{
                color: '#fff',
              }}
              data={employee_array}
              activeColor="#00ADB5"
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.id);
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.txt}>Assigned To Vendor</Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.constyle}
              dropdownPosition="bottom"
              itemContainerStyle={styles.itemconstyle}
              itemTextStyle={{
                color: '#fff',
              }}
              data={vendor_array}
              activeColor="#00ADB5"
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              value={value1}
              onChange={item => {
                setValue1(item.id);
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.txt}>Milestone</Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.constyle}
              dropdownPosition="bottom"
              itemContainerStyle={styles.itemconstyle}
              itemTextStyle={{
                color: '#fff',
              }}
              data={milestones}
              activeColor="#00ADB5"
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              value={value2}
              onChange={item => {
                setValue2(item.id);
              }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.txt}>Priority</Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.constyle}
              dropdownPosition="bottom"
              itemContainerStyle={styles.itemconstyle}
              itemTextStyle={{
                color: '#fff',
              }}
              data={Priority}
              activeColor="#00ADB5"
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              value={value3}
              onChange={item => {
                setValue3(item.name);
              }}
            />
          </View>
          <View style={{marginHorizontal: '3%'}}>
            <Text style={styles.txt}>Discription</Text>
            <TextInput
              style={[styles.ainput]}
              multiline={true}
              numberOfLines={3}
              placeholder={'Enter Discription'}
              placeholderTextColor={colors.gray}
              value={getdis}
              onChangeText={e => {
                SetDis(e);
              }}
            />
          </View>
          <View style={styles.boxtaxview}>
            <View>
              <Text style={{color: colors.white, fontSize: 16}}>File :</Text>
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
                        borderColor: '#00ADB5',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="pencil-plus"
                        size={30}
                        color={'#00ADB5'}
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
                      resizeMode="cover"
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
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 30,
              alignSelf: 'center',
              width: metrics.WIDTH * 0.4,
            }}>
            {isedit === true ? (
              <TouchableOpacity
                onPress={() => {
                  UpdateData();
                }}
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: '#00ADB5',
                  paddingHorizontal: '5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: '7%',
                  marginBottom: metrics.HEIGHT * 0.05,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 17,
                    fontWeight: '600',
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
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: '#00ADB5',
                  paddingHorizontal: '5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: '7%',
                  marginBottom: metrics.HEIGHT * 0.05,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 17,
                    fontWeight: '600',
                  }}>
                  ADD
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
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

export default CreateTask;

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
  boxtaxview: {
    alignItems: 'center',
    marginTop: metrics.HEIGHT * 0.04,
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

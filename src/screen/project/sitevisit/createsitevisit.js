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
import moment1 from 'moment-timezone';
import {Dropdown} from 'react-native-element-dropdown';
import {useProjectContext} from '../../../context/project_context';
import {useLoginContext} from '../../../context/login_context';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  add_sitevisit_url,
  update_sitevisit_url,
} from '../../../utils/baseurl';
import SimpleToast from 'react-native-simple-toast';

const Data = [
  {id: 1, name: 'Site Visit'},
  {id: 2, name: 'Office Meeting'},
  {id: 3, name: 'Site Meeting'},
  {id: 4, name: 'Material Selection Visit Local'},
  {id: 5, name: 'Material Selection Visit Outstation'},
];

const Createsitevisit = props => {
  //// time
  const [istimepicker, settimepicker] = useState(false);
  const [gettime, settime] = useState('');
  const [getshowtime, setShowTime] = useState(false);

  const showtimepicker = () => {
    settimepicker(true);
  };

  const hidetimepicker = () => {
    settimepicker(false);
  };
  const handleConfirmtime = time => {
    setShowTime(true);
    settime(time);
    hidetimepicker();
  };

  const removePerson = index => {
    let filteredArray = get_array.filter((item, i) => i !== index);
    set_array(filteredArray);
  };

  const [getdatequatation1, setdatequatation1] = useState('');
  const [isDatePickerquatation1, setDatePickerquatation1] = useState(false);

  const handleConfirmquatation1 = date => {
    setdatequatation1(date);
    hideDatePickerquatation1();
  };

  const hideDatePickerquatation1 = () => {
    setDatePickerquatation1(false);
  };

  const showDatePickerquatation1 = () => {
    setDatePickerquatation1(true);
  };
  const {GetProject, post_data, mainid} = useProjectContext();
  const {setLogout} = useLoginContext();
  const [getid, SetId] = useState('');
  const [isedit, SetIsEdit] = useState(false);

  const convertToIST = timeString => {
    const utcTime = moment1.tz(timeString, 'HH:mm', 'UTC');
    const istTime = utcTime.clone().tz('Asia/Kolkata');
    return istTime.format('HH:mm');
  };
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetProject(props, mainid);
      const {item} = props.route.params;
      if (item !== '') {
        SetId(item?.id);
        SetValue(item.type);
        setdatequatation1(new Date(item.date));
        // const timeInIST = convertToIST(item.time_alloted);
        // console.log(timeInIST);
        settime(item.time_alloted);
        setpurpose(item.purpose);
        Setstatus(item.status);
        set_array([...item.sitevisitmoms]);
        SetIsEdit(true);
      } else {
        SetCondation(false);
        SetIsEdit(false);
      }
    });
    return unsubscribe;
  }, [props]);
  const [sectionmodel, setsectionmodel] = useState(false);
  const [value, SetValue] = useState('');
  const [getsubject, setsubject] = useState('');
  const [purpose, setpurpose] = useState('');
  const [getperticuler, setperticuler] = useState('');
  const [get_array, set_array] = useState([]);
  const [getstatus, Setstatus] = useState('');
  const [getcondation, SetCondation] = useState(false);

  const addvalue = async () => {
    const obj = {
      particular: getperticuler,
      remarks: getsubject,
    };

    const data = obj;
    setsectionmodel(false);
    await set_array([...get_array, data]);
    await setsubject('');
    await setperticuler('');
    SetCondation(true);
  };

  const AddData = async () => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('project_id', mainid);
    formdata.append('type', value);
    formdata.append('client_id', post_data?.client);
    formdata.append('date', moment(getdatequatation1).format('YYYY-MM-DD'));
    formdata.append('time_alloted', moment(gettime).format('hh:mm'));
    formdata.append('purpose', purpose);
    for (var i = 0; i < get_array.length; i++) {
      formdata.append('particular[' + i + ']', get_array[i].particular);
      formdata.append('remarks[' + i + ']', get_array[i].remarks);
    }
    axios
      .post(add_sitevisit_url, formdata, {
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
            props.navigation.goBack(null);
            GetProject(props, mainid);
          }
        }
      })
      .catch(err => {
        console.log('errr', err);
      });
  };

  const UpdateDate = async () => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('type', value);
    formdata.append('client_id', post_data?.client);
    formdata.append('date', moment(getdatequatation1).format('YYYY-MM-DD'));

    formdata.append('purpose', purpose);
    if (getshowtime) {
      formdata.append('time_alloted', moment(gettime).format('hh:mm'));
    } else {
      formdata.append('time_alloted', gettime);
    }
    if (getcondation === true) {
      for (var i = 0; i < get_array.length; i++) {
        formdata.append('particular[' + i + ']', get_array[i].particular);
        formdata.append('remarks[' + i + ']', get_array[i].remarks);
      }
    }

    axios
      .post(update_sitevisit_url, formdata, {
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
        title={
          isedit === true
            ? 'Update Site-Visit/Meeting'
            : 'Add Site-Visit/Meeting'
        }
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 80}}>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={style.txt}>Type</Text>
          <Dropdown
            style={[style.dropdown]}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            containerStyle={style.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={style.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={Data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={'Select item'}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              SetValue(item.id);
            }}
          />
        </View>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={style.txt}>Client</Text>
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
              {post_data?.clients?.name}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={style.txt}>Project</Text>
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
          <Text style={style.txt}>Date</Text>
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
        <View style={{marginHorizontal: '3%'}}>
          <Text style={style.txt}>Time Alloted</Text>
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
              isVisible={istimepicker}
              mode="time"
              onConfirm={handleConfirmtime}
              onCancel={hidetimepicker}
            />
            <TouchableOpacity onPress={showtimepicker}>
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
                  {getshowtime === true ? (
                    <>
                      {moment(gettime).format('hh:mm') == 'Invalid date'
                        ? 'hh:mm'
                        : moment(gettime).format('hh:mm')}
                    </>
                  ) : (
                    gettime
                  )}
                </Text>
                <MaterialIcons
                  name="more-time"
                  size={25}
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
          <Text style={style.txt}>Purpose</Text>
          <TextInput
            style={[style.input]}
            placeholder={'Enter Purpose'}
            placeholderTextColor={colors.gray}
            value={purpose}
            onChangeText={e => {
              setpurpose(e);
            }}
          />
        </View>
        <View style={{marginTop: 10}}>
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
                    elevation: 2,
                    borderRadius: 13,
                    backgroundColor: '#393E46',
                    marginTop: '3%',
                    marginBottom: '2%',
                    flexDirection: 'row',
                    paddingHorizontal: '4%',

                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <View
                      style={{
                        right: '1%',
                        position: 'absolute',
                      }}>
                      <Ionicons
                        name="close-circle-sharp"
                        size={28}
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
                      <View style={{}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Particular
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            marginLeft: '2%',
                            marginTop: '3%',
                          }}>
                          {item.particular}
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
                        Remarks
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginTop: 5,
                        }}>
                        {item.remarks}
                      </Text>
                    </View>
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
        {get_array == 0 ? null : (
          <>
            {isedit === true ? (
              <TouchableOpacity
                onPress={() => {
                  UpdateDate();
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: '#00ADB5',
                  paddingHorizontal: '5%',
                  alignItems: 'center',
                  // paddingTop: '5%',
                  // paddingBottom: '5%',
                  width: '35%',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 17, fontWeight: '600'}}>
                  UPDATE
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  AddData();
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: '#00ADB5',
                  paddingHorizontal: '5%',
                  alignItems: 'center',
                  // paddingTop: '5%',
                  // paddingBottom: '5%',
                  width: '35%',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 17, fontWeight: '600'}}>
                  ADD
                </Text>
              </TouchableOpacity>
            )}
          </>
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
                }}
              />
            </View>
            <View style={style.boxtaxview}></View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: colors.blue, fontSize: 15}}>
                Particular :
              </Text>
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
                placeholder="Enter Particular"
                value={getperticuler}
                onChangeText={text => {
                  setperticuler(text);
                }}
              />
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
                value={getsubject}
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
    </View>
  );
};

export default Createsitevisit;

const style = StyleSheet.create({
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

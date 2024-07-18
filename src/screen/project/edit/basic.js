/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import metrics from '../../../utils/metrics';

import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Fontisto from 'react-native-vector-icons/Fontisto';
import {useBasicContext} from '../../../context/basic_context';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  createbasicproject_url,
  project_delete_url,
  projectcode_url,
} from '../../../utils/baseurl';
import Toast from 'react-native-simple-toast';
import {useLoginContext} from '../../../context/login_context';

const Basic = props => {
  const {GetTypeget, type_array, GetClint, clint_array} = useBasicContext();
  const {setLogout} = useLoginContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetTypeget(props);
      GetClint(props);
    });
    return unsubscribe;
  }, [props]);

  const [pName, SetPName] = useState('');
  const [pType, SetPType] = useState('');
  const [pCode, SetPCode] = useState('');
  const [pLocation, SetPLocation] = useState('');
  const [pDetails, SetPDetails] = useState('');
  const [cName, SetCName] = useState('');
  const [phoneNo, SetPhoneNo] = useState('');
  const [email, SetEmail] = useState('');
  const [cLocation, SetCLocation] = useState('');
  const [website, SetWebsite] = useState('');
  const [startDate, SetStartDate] = useState('');
  const [duetDate, SetDueDate] = useState('');
  const [starOntDate, SetStartOnDate] = useState('');
  const [assignDay, SetAssignDay] = useState('');

  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  const [isFocused1, setIsFocused1] = useState(false);

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

  const [isDatePickerquatation2, setDatePickerquatation2] = useState(false);
  const [getdatequatation2, setdatequatation2] = useState('');

  const showDatePickerquatation2 = () => {
    setDatePickerquatation2(true);
  };

  const hideDatePickerquatation2 = () => {
    setDatePickerquatation2(false);
  };
  const handleConfirmquatation2 = date => {
    setdatequatation2(date);
    hideDatePickerquatation2();
  };

  const data = [
    {id: 1, name: 'Monday'},
    {id: 2, name: 'Tuesday'},
    {id: 3, name: 'Wednesday'},
    {id: 4, name: 'Thursday'},
    {id: 5, name: 'Friday'},
    {id: 6, name: 'Saturday'},
    {id: 7, name: 'Sunday'},
  ];

  const getproject_code = async id => {
    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('type_id', id);
    axios
      .post(projectcode_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('resss', res.data);
        SetPCode(res.data.data);
      })
      .catch(err => {});
  };

  const [load, SetLoad] = useState(false);

  const create_project = async () => {
    if (value1 === '' || value1 === null) {
      Toast.show('Please Select Type');
    } else if (value2 === '' || value2 === null) {
      Toast.show('Please Select Clint');
    } else if (pName === '') {
      Toast.show('Enter Projetc Name');
    } else if (getdatequatation === '') {
      Toast.show(' Select Start Date');
    } else if (getdatequatation2 === '') {
      Toast.show(' Select Deadline');
    } else {
      SetLoad(true);
      var Token = await AsyncStorage.getItem('token');
      const data = new FormData();
      data.append('code', pCode);
      data.append('name', pName);
      data.append('client', value2.id);
      data.append('start_date', moment(getdatequatation).format('YYYY-MM-DD'));
      data.append(
        'start_on_site',
        moment(getdatequatation1).format('YYYY-MM-DD'),
      );
      data.append('deadline', moment(getdatequatation2).format('YYYY-MM-DD'));
      data.append('details', pDetails);
      data.append('com_name', cName);
      data.append('client_location', cLocation);
      data.append('location', pLocation);
      data.append('phone_no', phoneNo);
      data.append('email', email);
      data.append('website', website);
      data.append('type', value1.id);
      data.append('assign_day', value3.id);

      console.log('dataaa', data);

      axios
        .post(createbasicproject_url, data, {
          headers: {
            Accept: ACCEPT_HEADER,
            Authorization: 'Bearer ' + Token,
          },
        })
        .then(res => {
          console.log('resss', res.data);
          if (res.data.success == 1) {
            Toast.show(res.data.message);
            props.navigation.goBack(null);
            SetLoad(false);
          } else {
            null;
            SetLoad(false);
          }
        })
        .catch(err => {
          SetLoad(false);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Basic" navigation={props.navigation} />
      <ScrollView>
        {/* <View style={styles.container}>
          <Text style={styles.txt}>Franchise</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View> */}
        <View style={styles.container}>
          <Text style={styles.txt}>Type Name</Text>
          <Dropdown
            style={[styles.dropdown, isFocus1 && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={type_array}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={!isFocus1 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value1}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={item => {
              setValue1(item);
              getproject_code(item.id);
              setIsFocus1(false);
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.txt}>Client name</Text>
          <Dropdown
            style={[styles.dropdown, isFocus2 && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={clint_array}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={!isFocus2 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value2}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={item => {
              setValue2(item);
              setIsFocus2(false);
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.txt}>Assign Day</Text>
          <Dropdown
            style={[styles.dropdown, isFocus3 && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={!isFocus3 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value3}
            onFocus={() => setIsFocus3(true)}
            onBlur={() => setIsFocus3(false)}
            onChange={item => {
              setValue3(item);
              setIsFocus3(false);
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Project Code</Text>
          <View style={[styles.input, {justifyContent: 'center'}]}>
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
              }}>
              {pCode}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Project Name</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Project Name"
            placeholderTextColor={colors.gray}
            onChangeText={val => SetPName(val)}
            value={pName}
          />
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Phone Number</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Phone Number"
            placeholderTextColor={colors.gray}
            onChangeText={val => SetPhoneNo(val)}
            value={phoneNo}
          />
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Email</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Email"
            placeholderTextColor={colors.gray}
            onChangeText={val => SetEmail(val)}
            value={email}
          />
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Company Name</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Company Name"
            placeholderTextColor={colors.gray}
            onChangeText={val => SetCName(val)}
            value={cName}
          />
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Client Location</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Client Location"
            placeholderTextColor={colors.gray}
            onChangeText={val => SetCLocation(val)}
            value={cLocation}
          />
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Project Location</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Project Location"
            placeholderTextColor={colors.gray}
            onChangeText={val => SetPLocation(val)}
            value={pLocation}
          />
        </View>
        <View
          style={{
            marginHorizontal: '3%',
          }}>
          <Text style={styles.txt}>Website</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Website"
            placeholderTextColor={colors.gray}
            onChangeText={val => SetWebsite(val)}
            value={website}
          />
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
                  {moment(getdatequatation).format('DD/MM/YYYY') ==
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
          <Text style={styles.txt}>Start On Site Date</Text>
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
                  {moment(getdatequatation1).format('DD/MM/YYYY') ==
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
          <Text style={styles.txt}>Deadline</Text>
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
              isVisible={isDatePickerquatation2}
              mode="date"
              onConfirm={handleConfirmquatation2}
              onCancel={hideDatePickerquatation2}
            />
            <TouchableOpacity onPress={showDatePickerquatation2}>
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
                  {moment(getdatequatation2).format('DD/MM/YYYY') ==
                  'Invalid date'
                    ? 'dd/mm/yyyy'
                    : moment(getdatequatation2).format('DD/MM/YYYY')}
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
        <View style={{marginHorizontal: '3%', marginBottom: '10%'}}>
          <Text style={styles.txt}>Project Details</Text>
          <TextInput
            style={[styles.ainput, {color: colors.white}]}
            placeholder={'Enter Project Details'}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor={colors.gray}
            onChangeText={val => SetPDetails(val)}
            value={pDetails}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10%',
            paddingHorizontal: '10%',
          }}>
          <TouchableOpacity
            onPress={() => {
              create_project();
            }}
            style={{backgroundColor: '#00ADB5', borderRadius: 7}}>
            {load === true ? (
              <ActivityIndicator
                color={colors.white}
                size="small"
                style={{
                  paddingHorizontal: '13%',
                  paddingVertical: '3.5%',
                  marginTop: metrics.HEIGHT * 0.01,
                }}
              />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  paddingHorizontal: '13%',
                  paddingVertical: '3.5%',
                  fontWeight: '500',
                  fontSize: 18,
                }}>
                Submit
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack(null);
            }}
            style={{
              backgroundColor: '#393E46',
              borderRadius: 7,
              borderWidth: 0.7,
              borderColor: '#00ADB5',
            }}>
            <Text
              style={{
                color: '#00ADB5',
                paddingHorizontal: '13%',
                paddingVertical: '3.5%',
                fontWeight: '500',
                fontSize: 18,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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

export default Basic;

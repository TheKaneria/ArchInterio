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
  Modal,
  PermissionsAndroid,
  ActivityIndicator,
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
import {Dropdown} from 'react-native-element-dropdown';
import fonts from '../../utils/fonts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useBasicContext} from '../../context/basic_context';
import SimpleToast from 'react-native-simple-toast';
import {useEmployeeContext} from '../../context/employee_context';

const Addemployee = props => {
  const [value, setValue] = useState('');
  const {
    get_Country,
    counrty_array,
    get_State,
    state_array,
    get_City,
    city_array,
  } = useBasicContext();

  const {
    Add_Employee,
    add_employee_loading,
    UPdate_Employee,
    update_employee_loading,
  } = useEmployeeContext();
  const [isedit, SetIsEdit] = useState(false);
  const [mainid, SetMainId] = useState('');
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      get_Country(props);
      const {item} = props.route.params;
      if (item !== '') {
        SetMainId(item.id);

        get_State(props, item.country_id);
        get_City(props, item.state_id);
        SetName(item.name);
        SetMobile(item.mobile_no);
        SetEmail(item.email);
        SetPassword(item.show_password);
        setdatequatation(item.dob);
        setdatequatation1(item.doj);
        SetQualification(item.qualification);
        SetDesignation(item.designation);
        SetTenure(item.tenure);
        SetSalary(item.outstanding_salary);

        SetCountry(Number(item.country_id));
        SetState(Number(item.state_id));
        SetCity(Number(item.city_id));

        SetIsEdit(true);
      } else {
        SetIsEdit(false);
      }
    });
    return unsubscribe;
  }, [props]);

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

  const [isVisible1, setisVisible1] = useState(false);
  const [filePath1, setFilePath1] = useState({});
  const [type1, settype1] = useState({});
  const [fileName1, setfileName1] = useState({});
  const [imguri1, seturi1] = useState('');
  const [img1, setimg1] = useState();
  const [imgcondition1, setcondition1] = useState(false);

  const captureImage1 = async type => {
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

        setFilePath1(response);
        seturi1(response.assets[0].uri);
        settype1(response.assets[0].type);
        setfileName1(response.assets[0].fileName);
        setisVisible1(!isVisible1);
        setcondition1(true);
      });
    }
  };
  const chooseFile1 = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
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

      setFilePath1(response);
      seturi1(response.assets[0].uri);
      settype1(response.assets[0].type);
      setfileName1(response.assets[0].fileName);
      setisVisible1(!isVisible1);
      setcondition1(true);
    });
  };

  const [name, SetName] = useState('');
  const [mobile, SetMobile] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [qualification, SetQualification] = useState('');
  const [designation, SetDesignation] = useState('');
  const [tenure, SetTenure] = useState('');
  const [salary, SetSalary] = useState('');

  const [getCountry, SetCountry] = useState('');
  const [getState, SetState] = useState('');
  const [getCity, SetCity] = useState('');

  const regex = /^[A-Za-z0-9]+$/;
  const AddEmployee = () => {
    if (name === '') {
      SimpleToast.show('Enter Name');
    } else if (mobile === '') {
      SimpleToast.show('Enter Mobile No.');
    } else if (email === '') {
      SimpleToast.show('Enter Email');
    } else if (regex.test(email) === false) {
      SimpleToast.show('Email only Alphabets and Numbers allowed.');
    } else if (password === '') {
      SimpleToast.show('Enter Password');
    } else {
      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('mobile_no', mobile);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('dob', moment(getdatequatation).format('YYYY-MM-DD'));
      formdata.append('doj', moment(getdatequatation1).format('YYYY-MM-DD'));
      formdata.append('country_id', getCountry);
      formdata.append('state_id', getState);
      formdata.append('city_id', getCity);
      formdata.append('qualification', qualification);
      formdata.append('designation', designation);
      formdata.append('tenure', tenure);
      formdata.append('outstanding_salary', salary);
      console.log('formdata', formdata);
      if (imguri) {
        var img = {uri: imguri, name: fileName, type: type};
        formdata.append('idproof', img);
      }
      if (imguri1) {
        var img1 = {uri: imguri1, name: fileName1, type: type1};

        formdata.append('profile', img1);
      }
      Add_Employee(props, formdata);
    }
  };

  const UpdateEmployee = () => {
    if (name === '') {
      SimpleToast.show('Enter Name');
    } else if (mobile === '') {
      SimpleToast.show('Enter Mobile No.');
    } else if (email === '') {
      SimpleToast.show('Enter Email');
    } else if (regex.test(email) === false) {
      SimpleToast.show('Email only Alphabets and Numbers allowed.');
    } else if (password === '') {
      SimpleToast.show('Enter Password');
    } else {
      const formdata = new FormData();
      formdata.append('id', mainid);
      formdata.append('name', name);
      formdata.append('mobile_no', mobile);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('dob', moment(getdatequatation).format('YYYY-MM-DD'));
      formdata.append('doj', moment(getdatequatation1).format('YYYY-MM-DD'));
      formdata.append('country_id', getCountry);
      formdata.append('state_id', getState);
      formdata.append('city_id', getCity);
      formdata.append('qualification', qualification);
      formdata.append('designation', designation);
      formdata.append('tenure', tenure);
      formdata.append('outstanding_salary', salary);
      console.log('formdata', formdata);
      if (imguri) {
        var img = {uri: imguri, name: fileName, type: type};
        formdata.append('idproof', img);
      }
      if (imguri1) {
        var img1 = {uri: imguri1, name: fileName1, type: type1};

        formdata.append('profile', img1);
      }
      UPdate_Employee(props, formdata);
    }
  };

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom
        title={isedit === true ? 'Update Employee' : 'Add Employee'}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '20%',
        }}>
        <View style={{marginTop: 2, marginHorizontal: '4%'}}>
          <Text
            style={{
              marginTop: '5%',
              marginBottom: '2%',
              marginLeft: '1%',
              color: '#00c2cc',
              fontSize: 22,
              fontWeight: '600',
            }}>
            General Details{' '}
          </Text>
        </View>
        {/* <View style={styles.container}>
          <Text style={styles.txt}>Franchise</Text>
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
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select item'}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />
        </View> */}
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Name </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            placeholder="Enter Name"
            value={name}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetName(text);
            }}
          />
        </View>
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Mobile No </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            value={mobile}
            maxLength={10}
            keyboardType="number-pad"
            placeholder="Enter Mobile No"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetMobile(text);
            }}
          />
        </View>
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Email </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            value={email}
            placeholder="Enter Email"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetEmail(text);
            }}
          />
        </View>
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Password </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            value={password}
            placeholder="Enter Password"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetPassword(text);
            }}
          />
        </View>
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Date Of Birth :</Text>
        </View>
        <View
          style={{
            height: metrics.HEIGHT * 0.06,
            borderWidth: 0.5,
            borderColor: '#393E46',
            borderRadius: 5,
            backgroundColor: '#393E46',
            justifyContent: 'center',
            marginHorizontal: '4%',
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
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Date Of Join :</Text>
        </View>
        <View
          style={{
            height: metrics.HEIGHT * 0.06,
            borderWidth: 0.5,
            borderColor: '#393E46',
            borderRadius: 5,
            backgroundColor: '#393E46',
            justifyContent: 'center',
            marginHorizontal: '4%',
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
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Country</Text>
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
            data={counrty_array}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="name"
            valueField="id"
            search
            placeholder={'Select Counrty'}
            searchPlaceholder="Search..."
            value={getCountry}
            onChange={item => {
              SetCountry(item.id);
              get_State(props, item.id);
            }}
          />
        </View>
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>State</Text>
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
            data={state_array}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="name"
            valueField="id"
            search
            placeholder={'Select State'}
            searchPlaceholder="Search..."
            value={getState}
            onChange={item => {
              SetState(item.id);
              get_City(props, item.id);
            }}
          />
        </View>
        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>City</Text>
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
            data={city_array}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="name"
            valueField="id"
            search
            placeholder={'Select City'}
            searchPlaceholder="Search..."
            value={getCity}
            onChange={item => {
              SetCity(item.id);
            }}
          />
        </View>
        <View style={{marginTop: 10, marginHorizontal: '5%'}}>
          <Text style={styles.txt}>Id Proof :</Text>
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
        <View style={{marginTop: 10, marginHorizontal: '5%'}}>
          <Text style={styles.txt}>Profile :</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setisVisible1(true);
          }}
          style={{marginTop: '5%', alignSelf: 'center'}}>
          {imguri1 == null || imguri1 == '' ? (
            <>
              {img1 == null ? (
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
                  source={{uri: imgcondition1 == true ? imguri1 : img1}}
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
              source={{uri: imguri1}}
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

        <View style={{marginTop: 10, marginHorizontal: '4%'}}>
          <Text
            style={{
              marginTop: '5%',
              marginBottom: '2%',
              marginLeft: '1%',
              color: '#00c2cc',
              fontSize: 22,
              fontWeight: '600',
            }}>
            Work Details{' '}
          </Text>
        </View>
        <View style={{marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Qualification </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            value={qualification}
            placeholder="Enter Qualification"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetQualification(text);
            }}
          />
        </View>
        <View style={{marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Designation </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            value={designation}
            placeholder="Enter Designation"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetDesignation(text);
            }}
          />
        </View>
        <View style={{marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Tenure </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            value={tenure}
            placeholder="Enter Tenure"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetTenure(text);
            }}
          />
        </View>
        <View style={{marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Outstanding Salary </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',

            // paddingTop: metrics.HEIGHT * 0.01,
            // paddingBottom: metrics.HEIGHT * 0.01,
            alignItems: 'center',
            marginHorizontal: '3%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <TextInput
            style={{
              width: '90%',
              color: '#fff',

              backgroundColor: '#393E46',
            }}
            value={salary}
            placeholder="Enter Outstanding Salary"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetSalary(text);
            }}
          />
        </View>

        {isedit === true ? (
          <TouchableOpacity
            onPress={() => {
              UpdateEmployee();
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
            {update_employee_loading === true ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text
                style={{
                  color: colors.white,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                SUBMIT
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              AddEmployee();
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
            {add_employee_loading === true ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text
                style={{
                  color: colors.white,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                SUBMIT
              </Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
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
        animationType={'fade'}
        transparent={true}
        visible={isVisible1}
        onRequestClose={() => {
          setisVisible1(false);
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
              onPress={() => chooseFile1('photo')}
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
              onPress={() => captureImage1('photo')}
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
                setisVisible1(false);
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

export default Addemployee;
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

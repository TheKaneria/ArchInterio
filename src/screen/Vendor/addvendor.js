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
import {useBasicContext} from '../../context/basic_context';
import {useVendorContext} from '../../context/vendor_context';
import SimpleToast from 'react-native-simple-toast';

const AddVendor = props => {
  const {
    get_Country,
    counrty_array,
    get_State,
    state_array,
    get_City,
    city_array,
  } = useBasicContext();

  const {Add_Vendor, add_vendor_loading, UPdate_Vendor, update_vendor_loading} =
    useVendorContext();

  const [name, SetName] = useState('');
  const [mobile, SetMobile] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const [getCountry, SetCountry] = useState('');
  const [getState, SetState] = useState('');
  const [getCity, SetCity] = useState('');

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

  const regex = /^[A-Za-z0-9]+$/;
  const AddVendor = () => {
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

      formdata.append('country_id', getCountry);
      formdata.append('state_id', getState);
      formdata.append('city_id', getCity);

      Add_Vendor(props, formdata);
    }
  };

  const UpdateVendor = () => {
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

      formdata.append('country_id', getCountry);
      formdata.append('state_id', getState);
      formdata.append('city_id', getCity);

      UPdate_Vendor(props, formdata);
    }
  };

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom
        title={isedit === true ? 'Update Vendor' : 'Add Vendor'}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '20%',
        }}>
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
          <Text style={styles.txt}>Country </Text>
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
          <Text style={styles.txt}>State </Text>
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
          <Text style={styles.txt}>City </Text>
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

        {isedit === true ? (
          <TouchableOpacity
            onPress={() => {
              UpdateVendor();
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
            {update_vendor_loading === true ? (
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
              AddVendor();
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
            {add_vendor_loading === true ? (
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
    </View>
  );
};

export default AddVendor;
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

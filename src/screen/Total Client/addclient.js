/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Backcom from '../../component/backcom';
import colors from '../../utils/colors';
import metrics from '../../utils/metrics';
import {Dropdown} from 'react-native-element-dropdown';
import {useBasicContext} from '../../context/basic_context';
import SimpleToast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import axios from 'axios';
import {ACCEPT_HEADER, deleteFamily} from '../../utils/baseurl';

const Addclient = props => {
  const {
    Add_Clent,
    add_clint_loading,
    Update_Clent,
    update_clint_loading,
    get_Country,
    counrty_array,
    get_State,
    state_array,
    get_City,
    city_array,
  } = useBasicContext();

  const [isedit, SetIsEdit] = useState(false);
  const [mainid, SetMainId] = useState('');

  const [visible, setVisible] = useState(false);

  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [mobile, SetMobile] = useState('');
  const [getCountry, SetCountry] = useState('');
  const [getState, SetState] = useState('');
  const [getCity, SetCity] = useState('');
  const [pname, SetPName] = useState('');
  const [pmobile, SetPMobile] = useState('');
  const [Location, SetLocation] = useState('');
  const [pLocation, SetPLocation] = useState('');
  const [Referance, SetReferance] = useState('');
  const [Company, SetCompany] = useState('');
  const [gst, SetGst] = useState('');
  const [Address, SetAddress] = useState('');
  const [billAddress, SetBillAddress] = useState('');

  const [familyPerson, setFamilyPerson] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthtime, setBirthTime] = useState('');

  const [newValues, setNewValues] = useState([]);
  const [editItem, setEditItem] = useState(null); // State to store the item being edited

  const handleSave = async () => {
    if (editItem) {
      // Edit existing item
      const updatedValues = newValues.map(item =>
        item.birth_time === editItem.birth_time
          ? {
              ...item,
              name: familyPerson,
              birth_place: birthPlace,
              birth_time: birthtime,
            }
          : item,
      );
      setNewValues(updatedValues);
      setEditItem(null); // Reset editItem state
    } else {
      // Add new item
      const newItem = {
        name: familyPerson,
        birth_place: birthPlace,
        birth_time: birthtime,
      };
      await setNewValues([...newValues, newItem]);
    }

    setFamilyPerson('');
    setBirthPlace('');
    setBirthTime('');
    setVisible(false);
  };

  const handleEdit = item => {
    setEditItem(item); // Set the item being edited
    setFamilyPerson(item.name);
    setBirthPlace(item.birth_place);
    setBirthTime(item.birth_time);
    setVisible(true);
  };

  // console.log('NNNNNNNNN', JSON.stringify(newValues, null, 2));

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      get_Country(props);
      const {item} = props.route.params;

      if (item !== '') {
        SetMainId(item.id);
        get_State(props, item.country_id);
        get_City(props, item.state_id);
        SetName(item.name);
        SetEmail(item.email);
        SetPassword(item.show_password);
        SetMobile(item.contact);
        SetPName(item.contact_person_name);
        SetPMobile(item.contact_person_number);
        SetLocation(item.client_location);
        SetPLocation(item.project_location);
        SetReferance(item.referance);
        SetCompany(item.company);
        SetGst(item.gst);
        SetAddress(item.address);
        SetBillAddress(item.billing_address);
        SetCountry(Number(item.country_id));
        SetState(Number(item.state_id));
        SetCity(Number(item.city_id));
        setNewValues(item.familydetails);
        SetIsEdit(true);
      } else {
        SetIsEdit(false);
      }
    });
    return unsubscribe;
  }, [props]);

  const regex = /^[A-Za-z0-9]+$/;

  const AddUser = () => {
    if (name === '') {
      SimpleToast.show('Enter Name');
    } else if (mobile === '') {
      SimpleToast.show('Enter Contact No.');
    } else if (email === '') {
      SimpleToast.show('Enter Email');
    } else if (regex.test(email) === false) {
      SimpleToast.show('only Alphabets and Numbers allowed.');
    } else if (password === '') {
      SimpleToast.show('Enter Password');
    } else if (getCountry === '') {
      SimpleToast.show('Select Country');
    } else if (getState === '') {
      SimpleToast.show('Select State');
    } else if (getCity === '') {
      SimpleToast.show('Select City');
    } else if (pname === '') {
      SimpleToast.show('Enter Contact Person Name');
    } else if (pmobile === '') {
      SimpleToast.show('Enter Contact Person Number');
    } else {
      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('contact', mobile);
      formdata.append('country_id', getCountry);
      formdata.append('state_id', getState);
      formdata.append('city_id', getCity);
      formdata.append('contact_person_name', pname);
      formdata.append('contact_person_number', pmobile);
      formdata.append('client_location', Location);
      formdata.append('project_location', pLocation);
      formdata.append('referance', Referance);
      formdata.append('company', Company);
      formdata.append('gst', gst);
      formdata.append('address', Address);
      formdata.append('billing_address', billAddress);

      for (var i = 0; i < newValues.length; i++) {
        formdata.append('family_person[' + i + ']', newValues[i].name);
        formdata.append('birth_place[' + i + ']', newValues[i].birth_place);
        formdata.append('birth_time[' + i + ']', newValues[i].birth_time);
      }

      Add_Clent(props, formdata);
    }
  };

  const UpdateUSer = () => {
    if (name === '') {
      SimpleToast.show('Enter Name');
    } else if (mobile === '') {
      SimpleToast.show('Enter Contact No.');
    } else if (email === '') {
      SimpleToast.show('Enter Email');
    } else if (regex.test(email) === false) {
      SimpleToast.show('Email only Alphabets and Numbers allowed.');
    } else if (password === '') {
      SimpleToast.show('Enter Password');
    } else if (getCountry === '') {
      SimpleToast.show('Select Country');
    } else if (getState === '') {
      SimpleToast.show('Select State');
    } else if (getCity === '') {
      SimpleToast.show('Select City');
    } else if (pname === '') {
      SimpleToast.show('Enter Contact Person Name');
    } else if (pmobile === '') {
      SimpleToast.show('Enter Contact Person Number');
    } else {
      const formdata = new FormData();
      formdata.append('id', mainid);
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('contact', mobile);
      formdata.append('country_id', getCountry);
      formdata.append('state_id', getState);
      formdata.append('city_id', getCity);
      formdata.append('contact_person_name', pname);
      formdata.append('contact_person_number', pmobile);
      formdata.append('client_location', Location);
      formdata.append('project_location', pLocation);
      formdata.append('referance', Referance);
      formdata.append('company', Company);
      formdata.append('gst', gst);
      formdata.append('address', Address);
      formdata.append('billing_address', billAddress);

      newValues.forEach((item, i) => {
        if (!item.id) {
          formdata.append(`family_person[${i}]`, item.name);
          formdata.append(`birth_place[${i}]`, item.birth_place);
          formdata.append(`birth_time[${i}]`, item.birth_time);
        } else {
          formdata.append(`edit_clone_id[${i}]`, item.id);
          formdata.append(`edit_family_person[${i}]`, item.name);
          formdata.append(`edit_birth_place[${i}]`, item.birth_place);
          formdata.append(`edit_birth_time[${i}]`, item.birth_time);
        }
      });

      console.log('UPDATE FORM DATA ', JSON.stringify(formdata, null, 2));

      Update_Clent(props, formdata);
    }
  };

  const [deleteLoad, setDelLoad] = useState(false);
  const DeleteFamily = async id => {
    setDelLoad(prev => ({...prev, [id]: true}));

    var Token = await AsyncStorage.getItem('token');
    const formdata = new FormData();
    formdata.append('id', id);

    axios
      .post(deleteFamily, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
          setDelLoad(prev => ({...prev, [id]: false}));
        } else {
          if (res.data.success === 1) {
            SimpleToast.show(res.data.message);
            props.navigation.goBack(null);
            setDelLoad(prev => ({...prev, [id]: false}));
          }
        }
      })
      .catch(err => {
        console.log('errreee', err);
        setDelLoad(prev => ({...prev, [id]: false}));
      });
  };

  const removeItem = id => {
    const updatedValues = newValues.filter(item => item.birth_time !== id);
    setNewValues(updatedValues);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom
        title={isedit === true ? 'Update Client' : 'Add Client'}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Name </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',
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
        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
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
        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
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
        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Contact </Text>
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
            placeholder="Enter Contact No"
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetMobile(text);
            }}
          />
        </View>

        <View style={styles.container}>
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
            inputSearchStyle={{
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
        <View style={styles.container}>
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
            inputSearchStyle={{
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
        <View style={styles.container}>
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
            inputSearchStyle={{
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

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Contact Person Name </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',
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
            placeholder="Enter Contact Person Name"
            value={pname}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetPName(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Contact Person Number </Text>
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
            placeholder="Enter Contact Person Number"
            value={pmobile}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetPMobile(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Client Location </Text>
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
            placeholder="Enter Client Location"
            value={Location}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetLocation(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Project Location </Text>
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
            placeholder="Enter Project Location"
            value={pLocation}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetPLocation(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Referance </Text>
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
            placeholder="Enter Referance"
            value={Referance}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetReferance(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Company </Text>
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
            placeholder="Enter Company"
            value={Company}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetCompany(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>GST No. </Text>
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
            placeholder="Enter GST No."
            value={gst}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetGst(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Address </Text>
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
            placeholder="Enter Address"
            value={Address}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetAddress(text);
            }}
          />
        </View>

        <View style={{marginTop: 0, marginHorizontal: '4%'}}>
          <Text style={styles.txt}>Billing Address </Text>
        </View>
        <View
          style={{
            marginTop: '2%',
            marginBottom: '2%',
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
            placeholder="Enter Billing Address"
            value={billAddress}
            placeholderTextColor={colors.gray}
            onChangeText={text => {
              SetBillAddress(text);
            }}
          />
        </View>

        <View style={{marginHorizontal: '4%'}}>
          <View>
            <Text style={styles.txt}>Family Details</Text>
          </View>
          <View
            style={{backgroundColor: '#393E46', padding: 10, borderRadius: 5}}>
            <FlatList
              data={newValues}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      marginBottom: '5%',
                      padding: 10,
                      borderRadius: 5,
                      position: 'relative',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: '#00ADB5',
                          fontSize: 15,
                        }}>
                        Family Person :{' '}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 15,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: '2%'}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: '#00ADB5',
                          fontSize: 15,
                        }}>
                        Birth Place :{' '}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 15,
                        }}>
                        {item.birth_place}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: '2%'}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: '#00ADB5',
                          fontSize: 15,
                        }}>
                        Birth Time :{' '}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 15,
                        }}>
                        {item.birth_time}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: '5%',
                        justifyContent: 'space-between',
                        marginHorizontal: '5%',
                      }}>
                      <TouchableOpacity
                        onPress={() => handleEdit(item)}
                        style={{
                          backgroundColor: '#00ADB5',
                          padding: 10,
                          borderRadius: 5,
                          width: 70,
                          alignItems: 'center',
                        }}>
                        <Text style={{color: colors.white, fontWeight: '600'}}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                      {isedit === true ? (
                        <TouchableOpacity
                          onPress={() => DeleteFamily(item.id)}
                          style={{
                            backgroundColor: 'red',
                            padding: 10,
                            width: 70,
                            alignItems: 'center',
                            borderRadius: 5,
                          }}>
                          {deleteLoad[item.id] ? (
                            <ActivityIndicator size={'small'} color={'#fff'} />
                          ) : (
                            <Text
                              style={{color: colors.white, fontWeight: '600'}}>
                              Delete
                            </Text>
                          )}
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => removeItem(item.birth_time)}
                          style={{
                            backgroundColor: 'red',
                            padding: 10,
                            width: 80,
                            alignItems: 'center',
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{color: colors.white, fontWeight: '600'}}>
                            Remove
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: '500', color: colors.white}}>
                      There are no family members added
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={{width: '90%', alignSelf: 'center', marginVertical: '5%'}}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              width: 150,
              backgroundColor: '#00ADB5',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: '#fff'}}>Add Family Details</Text>
          </TouchableOpacity>
        </View>

        {isedit === true ? (
          <TouchableOpacity
            onPress={() => {
              UpdateUSer();
            }}
            style={{
              marginTop: metrics.HEIGHT * 0.05,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00ADB5',
              marginHorizontal: '5%',
              width: metrics.WIDTH * 0.35,
              alignSelf: 'center',
              paddingTop: metrics.HEIGHT * 0.02,
              paddingBottom: metrics.HEIGHT * 0.02,
              borderRadius: 5,
              marginBottom: metrics.HEIGHT * 0.05,
            }}>
            {update_clint_loading === true ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text
                style={{
                  color: colors.white,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Update
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              AddUser();
            }}
            style={{
              marginTop: metrics.HEIGHT * 0.05,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00ADB5',
              marginHorizontal: '5%',
              width: metrics.WIDTH * 0.35,
              alignSelf: 'center',
              paddingTop: metrics.HEIGHT * 0.02,
              paddingBottom: metrics.HEIGHT * 0.02,
              borderRadius: 5,
              marginBottom: metrics.HEIGHT * 0.05,
            }}>
            {add_clint_loading === true ? (
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

      <Modal isVisible={visible} onBackButtonPress={() => setVisible(false)}>
        <View
          style={{
            flex: 1,
            maxHeight: 450,
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <ScrollView style={{flex: 1}}>
            <View
              style={{width: '90%', alignSelf: 'center', marginVertical: '5%'}}>
              <Text
                style={{fontSize: 17, color: '#00ADB5', fontWeight: 'bold'}}>
                Family Person
              </Text>
              <TextInput
                value={familyPerson}
                onChangeText={txt => setFamilyPerson(txt)}
                placeholder="Enter Family Person"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  marginTop: '2%',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            <View
              style={{width: '90%', alignSelf: 'center', marginVertical: '5%'}}>
              <Text
                style={{fontSize: 17, color: '#00ADB5', fontWeight: 'bold'}}>
                Birth Place
              </Text>
              <TextInput
                value={birthPlace}
                onChangeText={txt => setBirthPlace(txt)}
                placeholder="Enter Birth Place"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  marginTop: '2%',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            <View
              style={{width: '90%', alignSelf: 'center', marginVertical: '5%'}}>
              <Text
                style={{fontSize: 17, color: '#00ADB5', fontWeight: 'bold'}}>
                Birth Time
              </Text>
              <TextInput
                value={birthtime}
                onChangeText={txt => setBirthTime(txt)}
                placeholder="Enter Birth Time"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  marginTop: '2%',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: '5%',
              }}>
              <TouchableOpacity
                onPress={() => handleSave()}
                style={{
                  backgroundColor: '#00ADB5',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
export default Addclient;

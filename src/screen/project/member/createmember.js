/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import fonts from '../../../utils/fonts';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import metrics from '../../../utils/metrics';
import {useEmployeeContext} from '../../../context/employee_context';
import {useProjectContext} from '../../../context/project_context';
import {
  ACCEPT_HEADER,
  add_member_url,
  update_member_url,
} from '../../../utils/baseurl';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import {useLoginContext} from '../../../context/login_context';

const CreateMember = props => {
  const [value, setValue] = useState('');
  const {mainid, GetProject} = useProjectContext();
  const {setLogout} = useLoginContext();
  const {GetEmployee, employee_array} = useEmployeeContext();
  const [isedit, SetIsEdit] = useState(false);
  const [getid, SetId] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetEmployee(props);
      const {item} = props.route.params;
      if (item !== '') {
        SetId(item?.id);
        setValue(item?.employees.id);
        SetIsEdit(true);
      } else {
        SetIsEdit(false);
      }
    });
    return unsubscribe;
  }, [props]);

  const Addmembers = async () => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('project_id', mainid);
    formdata.append('member', value);

    axios
      .post(add_member_url, formdata, {
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
  const Updatemembers = async () => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('member', value);

    axios
      .post(update_member_url, formdata, {
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
        title={isedit === true ? 'Update Member' : 'Create Member'}
        navigation={props.navigation}
      />
      <View style={styles.container}>
        <Text style={styles.txt}>Add Member</Text>
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
      <View
        style={{
          marginTop: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '10%',
          paddingHorizontal: '15%',
        }}>
        {isedit === true ? (
          <TouchableOpacity
            onPress={() => {
              Updatemembers();
            }}
            style={{backgroundColor: '#00ADB5', borderRadius: 7}}>
            <Text
              style={{
                color: '#fff',
                paddingHorizontal: '13%',
                paddingVertical: '3.5%',
                fontWeight: '500',
                fontSize: 18,
              }}>
              Update
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              Addmembers();
            }}
            style={{backgroundColor: '#00ADB5', borderRadius: 7}}>
            <Text
              style={{
                color: '#fff',
                paddingHorizontal: '13%',
                paddingVertical: '3.5%',
                fontWeight: '500',
                fontSize: 18,
              }}>
              Add
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: '#393E46',
            borderRadius: 7,
            borderWidth: 0.7,
            borderColor: '#00ADB5',
          }}>
          <Text
            style={{
              color: '#00ADB5',
              paddingHorizontal: '9.5%',
              paddingVertical: '3.5%',
              fontWeight: '500',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
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

export default CreateMember;

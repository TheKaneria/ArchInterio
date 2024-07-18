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
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import fonts from '../../utils/fonts';
import {Dropdown} from 'react-native-element-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto';
import metrics from '../../utils/metrics';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useProjectContext} from '../../context/project_context';
import {
  ACCEPT_HEADER,
  add_milestone_url,
  update_milestone_url,
} from '../../utils/baseurl';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import {useLoginContext} from '../../context/login_context';

const Createbasic = props => {
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
  const {mainid, GetProject} = useProjectContext();
  const {setLogout} = useLoginContext();

  const [getid, SetId] = useState('');
  const [isedit, SetIsEdit] = useState(false);
  const [title, SetTitle] = useState('');
  const [dis, SetDis] = useState('');
  const [status, SetStatus] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const {item} = props.route.params;
      if (item !== '') {
        SetId(item?.id);
        SetTitle(item.name);
        setdatequatation(new Date(item.start_date));
        setdatequatation1(new Date(item.due_date));
        SetStatus(item.status);
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
    formdata.append('name', title);
    formdata.append(
      'start_date',
      moment(getdatequatation).format('YYYY-MM-DD'),
    );
    formdata.append('due_date', moment(getdatequatation1).format('YYYY-MM-DD'));
    formdata.append('description', dis);

    axios
      .post(add_milestone_url, formdata, {
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
  const UpdateData = async () => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('name', title);
    formdata.append(
      'start_date',
      moment(getdatequatation).format('YYYY-MM-DD'),
    );
    formdata.append('due_date', moment(getdatequatation1).format('YYYY-MM-DD'));
    formdata.append('description', dis);

    axios
      .post(update_milestone_url, formdata, {
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
        title={isedit === true ? 'Update Milestone' : 'Add Milestone'}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.txt}>Title</Text>
          <TextInput
            style={[styles.input]}
            placeholder={'Enter Title'}
            placeholderTextColor={colors.gray}
            value={title}
            onChangeText={text => {
              SetTitle(text);
            }}
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
          <Text style={styles.txt}>Due Date</Text>
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
        <View style={{marginHorizontal: '3%', marginBottom: '10%'}}>
          <Text style={styles.txt}>Description</Text>
          <TextInput
            style={[styles.ainput]}
            placeholder={'Enter Description'}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor={colors.gray}
            value={dis}
            onChangeText={text => {
              SetDis(text);
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
                UpdateData();
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
                AddData();
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

export default Createbasic;

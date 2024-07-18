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

import metrics from '../../../utils/metrics';
import {useProjectContext} from '../../../context/project_context';
import {useLoginContext} from '../../../context/login_context';
import axios from 'axios';
import {
  ACCEPT_HEADER,
  add_notes_url,
  update_notes_url,
} from '../../../utils/baseurl';
import SimpleToast from 'react-native-simple-toast';

const Createnote = props => {
  const {mainid, GetProject} = useProjectContext();
  const {setLogout} = useLoginContext();
  const [getid, SetId] = useState('');
  const [isedit, SetIsEdit] = useState(false);
  const [title, SetTitle] = useState('');
  const [getnote, SetNote] = useState('');
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const {item} = props.route.params;
      if (item !== '') {
        SetId(item?.id);
        SetTitle(item.name);
        SetNote(item.note);

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
    formdata.append('note', getnote);

    axios
      .post(add_notes_url, formdata, {
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
  const UpdateData = async () => {
    var Token = await AsyncStorage.getItem('token');

    const formdata = new FormData();
    formdata.append('id', getid);
    formdata.append('name', title);
    formdata.append('note', getnote);

    axios
      .post(update_notes_url, formdata, {
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
        title={isedit === true ? 'Update Notes' : 'Add Notes'}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 80}}>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.txt}>Title</Text>
          <TextInput
            style={[styles.input]}
            placeholder={'Enter Title'}
            placeholderTextColor={colors.gray}
            value={title}
            onChangeText={e => {
              SetTitle(e);
            }}
          />
        </View>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.txt}>Notes</Text>
          <TextInput
            style={[styles.input]}
            placeholder={'Enter Notes'}
            placeholderTextColor={colors.gray}
            value={getnote}
            onChangeText={e => {
              SetNote(e);
            }}
          />
        </View>
        <View
          style={{
            marginTop: 30,
            marginHorizontal: '5%',
            width: metrics.WIDTH * 0.4,
            alignSelf: 'center',
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
                marginBottom: 10,
              }}>
              <Text
                style={{color: colors.white, fontSize: 17, fontWeight: '700'}}>
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
                marginBottom: 10,
              }}>
              <Text
                style={{color: colors.white, fontSize: 17, fontWeight: '700'}}>
                ADD
              </Text>
            </TouchableOpacity>
          )}
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
export default Createnote;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  AsyncStorage,
  Platform,
} from 'react-native';
import colors from '../utils/colors';
import metrics from '../utils/metrics';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useLoginContext} from '../context/login_context';

const Drewerscreen = props => {
  const [active, SetActive] = useState(8);

  const [getusername, SetUserName] = useState('');

  useEffect(() => {
    GetName();
  }, []);

  const GetName = async () => {
    const UserName = await AsyncStorage.getItem('name');
    console.log('UserName---', UserName);
    SetUserName(UserName);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{}}>
        <View
          style={{
            padding: 10,
            backgroundColor: colors.gray,
          }}
        />
        <View style={{padding: 10}}>
          <MaterialIcons
            name="account-circle"
            size={45}
            color={colors.themecolor}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.themecolor,
                fontSize: 30,
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              Welcome
            </Text>
            <Text
              style={{
                color: colors.themecolor,
                // fontFamily: fonts.Raleway_Bold,
                fontSize: 20,
                fontStyle: 'italic',
                alignItems: 'center',
                top: '1%',
              }}>
              {' '}
              {getusername}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: metrics.HEIGHT * 0.02,
            borderColor: colors.gray,
            borderWidth: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Mytabs');
            props.navigation.closeDrawer();
            SetActive(8);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 8 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 8 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Dashboard
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 8 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Project');
            SetActive(1);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 1 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 1 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Project
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 1 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('MaterialType');
            SetActive(2);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 2 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 2 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Material Type
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 2 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Type');
            SetActive(3);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 3 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 3 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Type
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 3 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Franchise');
            SetActive(4);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 4 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 4 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Franchise
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 4 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Vendor');
            SetActive(5);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 5 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 5 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Vendor
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 5 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Employee');
            SetActive(6);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 6 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 6 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Employee
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 6 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ReraRegistration');
            SetActive(7);
          }}
          style={{
            marginTop: 20,
            paddingHorizontal: '5%',
            backgroundColor: active == 7 ? '#528AAE' : colors.white,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 5,
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              color: active == 7 ? colors.white : colors.black,
              fontSize: 15,
            }}>
            Rera Registration
          </Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={active == 7 ? colors.white : colors.black}
            />
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default Drewerscreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import colors from '../utils/colors';
import metrics from '../utils/metrics';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import fonts from '../utils/fonts';
import {PieChart} from 'react-native-gifted-charts';
import {useLoginContext} from '../context/login_context';

const Profile = props => {
  const {setLogout, users} = useLoginContext();
  const logout = props => {
    AsyncStorage.clear();

    AsyncStorage.removeItem('username');
    AsyncStorage.removeItem('email');
    setLogout(props);
  };

  const [getusername, SetUserName] = useState('');
  const [getuserinfo, SetUSerInfo] = useState();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetName();
    });

    return unsubscribe;
  }, [props]);

  const GetName = async () => {
    const UserName = await AsyncStorage.getItem('name');
    SetUserName(UserName);
    const getuserinfo = await AsyncStorage.getItem('userinfo');

    SetUSerInfo(JSON.parse(getuserinfo));
  };

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <StatusBar backgroundColor={colors.themecolor} />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: '5%',
          paddingVertical: metrics.HEIGHT * 0.01,
          elevation: 5,
          backgroundColor: colors.themecolor,
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            props.navigation.openDrawer();
          }}>
          <Feather name="menu" size={30} color={'#00ADB5'} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#393E46',
          padding: 20,
        }}>
        <Image
          source={{uri: 'https://www.bootdey.com/image/900x400/222831/000000'}}
          style={{
            height: 200,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={{
              uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
            }}
            resizeMode="center"
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              color: colors.white,
            }}>
            {getusername}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.white,
              }}>
              Email:
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: colors.white,
              }}>
              {getuserinfo?.email}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.white,
              }}>
              Contact:
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: colors.white,
              }}>
              {getuserinfo?.contact}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.white,
              }}>
              Bio:
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: colors.white,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => logout(props)}
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            backgroundColor: '#00ADB5',
            marginTop: metrics.HEIGHT * 0.05,
            paddingBottom: metrics.HEIGHT * 0.02,
            borderRadius: 5,
            width: '50%',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              color: colors.white,
            }}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

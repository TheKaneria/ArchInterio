/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import metrics from '../utils/metrics';
import {useLoginContext} from '../context/login_context';
import Toast from 'react-native-simple-toast';
const Login = props => {
  const {login_loading, Loginapi} = useLoginContext();
  const [getemail, setemail] = useState('');
  const [getpassword, setpassword] = useState('');
  const email_validation =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [focusedInputs, setfocusedInputs] = useState(false);
  const [focusedInputs1, setfocusedInputs1] = useState(false);

  const handleFocus = () => {
    setfocusedInputs(true);
  };

  const handleBlur = () => {
    setfocusedInputs(false);
  };

  const handleFocus1 = () => {
    setfocusedInputs1(true);
  };

  const handleBlur1 = () => {
    setfocusedInputs1(false);
  };

  const onSubmit = () => {
    if (getemail == '') {
      Toast.show('Please enter Email');
    } else if (email_validation.test(getemail) === false) {
      Toast.show('Please enter Valid Email');
    } else if (getpassword == '') {
      Toast.show('Please enter Password');
    } else {
      const param = {email: getemail, password: getpassword};
      Loginapi(param, props, true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.themecolor,
      }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
          <ImageBackground
            source={require('../assets/login.png')}
            style={{
              width: metrics.WIDTH * 1,
              height: metrics.HEIGHT * 1,
            }}>
            <View
              style={{
                flex: 0.9,
                justifyContent: 'center',
                marginHorizontal: '6%',
                marginTop: '50%',
              }}>
              <Text
                style={{fontSize: 42, fontWeight: '600', color: colors.white}}>
                Login
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '300',
                  color: colors.white,
                  marginTop: '1%',
                }}>
                Please Sign in to continue
              </Text>
              <View
                style={[
                  {
                    height: metrics.HEIGHT * 0.06,
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: '5%',
                    borderColor: '#393E46',
                    backgroundColor: '#393E46',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '20%',
                  },
                  focusedInputs && {borderColor: '#00ADB5'},
                ]}>
                <Fontisto
                  name="email"
                  size={20}
                  color={focusedInputs ? '#00ADB5' : '#d5d8dd'}
                />
                <TextInput
                  style={{
                    height: metrics.HEIGHT * 0.06,
                    marginLeft: '3%',
                    width: metrics.WIDTH * 0.7,
                    color: colors.white,
                  }}
                  onFocus={() => handleFocus()}
                  onBlur={() => handleBlur()}
                  placeholder={'EMAIL'}
                  autoCapitalize="none"
                  placeholderTextColor={colors.white}
                  onChangeText={val => setemail(val)}
                />
              </View>
              <View
                style={[
                  {
                    height: metrics.HEIGHT * 0.06,
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: '5%',
                    borderColor: '#393E46',
                    backgroundColor: '#393E46',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '9%',
                  },
                  focusedInputs1 && {borderColor: '#00ADB5'},
                ]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={focusedInputs1 ? '#00ADB5' : '#d5d8dd'}
                />
                <TextInput
                  style={{
                    height: metrics.HEIGHT * 0.06,
                    marginLeft: '3%',
                    width: metrics.WIDTH * 0.7,
                    color: colors.white,
                  }}
                  onFocus={() => handleFocus1()}
                  onBlur={() => handleBlur1()}
                  placeholder={'PASSWORD'}
                  placeholderTextColor={colors.white}
                  onChangeText={val => setpassword(val)}
                />
              </View>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate('Mytabs')}
                onPress={() => onSubmit()}
                style={{
                  alignSelf: 'flex-end',
                  flexDirection: 'row',
                  backgroundColor: '#00ADB5',
                  paddingHorizontal: '10%',
                  paddingVertical: '4%',
                  borderRadius: 40,
                  marginTop: '25%',
                }}>
                {login_loading === true ? (
                  <Image
                    source={require('../assets/load.gif')}
                    style={{width: 100, height: 20}}
                    // resizeMode="contain"
                  />
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: '#fff',
                        marginRight: '5%',
                      }}>
                      LOGIN
                    </Text>

                    <AntDesign name="arrowright" color={'#fff'} size={25} />
                  </>
                )}
              </TouchableOpacity>
            </View>
            {/* <ScrollView>
          <Animatable.View
            animation="bounceInDown"
            style={{
              width: '90%',
              marginTop: '10%',
              height: 100,
              alignSelf: 'center',
            }}>
            <Image
              source={require('../assets/ArchInterio.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUpBig">
            <View style={{marginTop: 30, marginHorizontal: '5%'}}>
              <View>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontFamily: fonts.NeueHaasDisplayRoman,
                  }}>
                  Your Email Address
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor:
                    errormsgemail == true &&
                    email_validation.test(getemail) === false
                      ? 'red'
                      : colors.gray,
                  paddingHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="abcd@gmail.com"
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                  style={{
                    color: colors.black,
                    fontFamily: fonts.NeueHaasDisplayRoman,
                    width: '90%',
                  }}
                  onChangeText={text => {
                    text.length === 0
                      ? seterrormsgemail(true)
                      : email_validation.test(text) === false
                      ? seterrormsgemail(true)
                      : seterrormsgemail(false),
                      setemail(text);
                  }}
                />
                <MaterialCommunityIcons
                  name="email"
                  size={25}
                  color={colors.darkgray}
                />
              </View>
              {errormsgemail == true ? (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.NeueHaasDisplayRoman,
                    color: 'red',
                    marginTop: 5,
                    marginHorizontal: 10,
                  }}>
                  {email_validation.test(getemail) === false
                    ? 'Enter valid Email ID'
                    : null}
                </Text>
              ) : null}
            </View>
            <View style={{marginTop: 30, marginHorizontal: '5%'}}>
              <View>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontFamily: fonts.NeueHaasDisplayRoman,
                  }}>
                  Enter Your Password
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: errormsgepassword === true ? 'red' : colors.gray,
                  paddingHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="password"
                  keyboardType="default"
                  secureTextEntry={visible == true ? true : false}
                  placeholderTextColor={colors.gray}
                  onChangeText={text => {
                    text.length === 0
                      ? seterrormsgepassword(true)
                      : seterrormsgepassword(false),
                      setpassword(text);
                  }}
                  style={{
                    color: colors.black,
                    fontFamily: fonts.NeueHaasDisplayRoman,
                    width: '90%',
                  }}
                />
                <Entypo
                  style={{}}
                  size={25}
                  color={colors.darkgray}
                  name={visible == true ? 'eye-with-line' : 'eye'}
                  onPress={() => {
                    setvisible(!visible);
                  }}
                />
              </View>
              {errormsgepassword == true ? (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.NeueHaasDisplayRoman,
                    color: 'red',
                    marginTop: 5,
                    marginHorizontal: 10,
                  }}>
                  Please enter your password
                </Text>
              ) : null}
            </View>
            <View style={{marginTop: 30, marginHorizontal: '5%'}}>
              <TouchableOpacity
                onPress={() => {
                  onSignUp();
                }}
                style={{
                  marginTop: 10,
                  borderRadius: 30,
                  backgroundColor: colors.themecolor,
                  paddingHorizontal: '5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '5%',
                  paddingBottom: '5%',
                }}>
                <Text style={{color: colors.white}}>Continue</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView> */}
          </ImageBackground>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Login;

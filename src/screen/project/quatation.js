/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import metrics from '../../utils/metrics';
import * as Animatable from 'react-native-animatable';
import fonts from '../../utils/fonts';

const data = [
  {
    id: 1,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
  {
    id: 2,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
  {
    id: 3,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
  {
    id: 4,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
  {
    id: 5,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
  {
    id: 6,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
  {
    id: 7,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
  {
    id: 8,
    quatation_no: '21',
    quatation_date: '22-4-2023',
    due_date: '23-06-2024',
    client_name: 'name',
    vendor_name: 'ram',
    code: 'ID-002',
  },
];

const Quatation = props => {
  const [getcon, setcon] = useState(false);
  const [getindex, setindex] = useState();

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Projects" navigation={props.navigation} />
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: '16%'}}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <LinearGradient
              animation="slideInLeft"
              colors={['#393E46', '#393E46', '#393E46']}
              style={{
                padding: '3%',
                borderRadius: 15,
                backgroundColor: '#393E46',
                marginVertical: '3%',
                paddingVertical: '5%',
                flexDirection: 'row',
                width: '90%',
                marginHorizontal: '5%',
                shadowColor: '#ffffff',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.17,
                shadowRadius: 2.54,
                elevation: 1,
              }}>
              <View>
                <View
                  style={{
                    width: '91.5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {/* <FontAwesome5
                    name="home"
                    size={20}
                    style={{
                      marginHorizontal: '5%',
                      color: '#1864ab',
                    }}
                  /> */}
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#00ADB5',
                        fontWeight: '600',
                        marginLeft: '9%',
                        fontSize: 16,
                      }}>
                      Quatation No :{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#00ADB5',
                        fontWeight: '600',
                        marginLeft: '2%',
                        fontSize: 16,
                      }}>
                      {item.quatation_no}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <EvilIcons name="calendar" color={'#00ADB5'} size={22} />
                    <Text
                      style={{
                        color: '#00ADB5',
                        fontWeight: '400',
                        fontSize: 15,
                      }}>
                      {item.quatation_date}
                    </Text>
                  </View>
                </View>
                {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: '3%',
                  marginHorizontal: '3%',
                  width: metrics.WIDTH * 0.83,
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: colors.themecolor,
                  }}
                />
              </View> */}
                <View style={{marginTop: '6%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: '4%',
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      Client Name :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.client_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '2%',
                      marginHorizontal: '4%',
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      Vendor Name :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.vendor_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '2%',
                      marginHorizontal: '4%',
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      Due Date :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.due_date}
                    </Text>
                  </View>
                </View>
                {/* <View
                  style={{
                    marginHorizontal: '4%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#009199',
                      width: metrics.WIDTH * 0.2,
                      paddingVertical: '1.7%',
                      borderRadius: 10,
                      borderWidth: 0.6,
                      borderColor: '#00ADB5',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="account-edit-outline"
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#009199',
                      width: metrics.WIDTH * 0.35,
                      borderWidth: 0.4,
                      borderColor: '#00ADB5',
                      paddingVertical: '1.7%',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '6%',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: 16,
                        marginRight: '8%',
                      }}>
                      Delete
                    </Text>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: '6%',
                    marginRight: '5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Edit')}>
                    <MaterialCommunityIcons
                      name="square-edit-outline"
                      color={colors.themecolor}
                      size={24}
                      style={{
                        backgroundColor: '#00ADB5',
                        paddingHorizontal: '4.5%',
                        paddingVertical: '3%',
                        borderRadius: 7,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      color={'#000'}
                      size={24}
                      style={{
                        backgroundColor: '#00ADB5',
                        paddingHorizontal: '4.5%',
                        paddingVertical: '3%',
                        borderRadius: 7,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="file-document-outline"
                      color={'#000'}
                      size={24}
                      style={{
                        backgroundColor: '#00ADB5',
                        paddingHorizontal: '4.5%',
                        paddingVertical: '3%',
                        borderRadius: 7,
                      }}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            </LinearGradient>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Createquatation')}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderWidth: 2,
          borderColor: '#00ADB5',
          backgroundColor: '#00ADB5',
          height: 55,
          width: 55,
          borderRadius: 55,
          alignItems: 'center',
          justifyContent: 'center',

          shadowColor: '#67707e',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.17,
          shadowRadius: 2.54,
          elevation: 3,
        }}>
        <Feather name="plus" color={'#fff'} size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default Quatation;

const style = StyleSheet.create({
  textinputview: {
    // marginTop: metrics.HEIGHT * 0.02,
    marginHorizontal: '5%',
    elevation: 3,
    borderRadius: 5,
    backgroundColor: colors.white,
    height: metrics.HEIGHT * 0.07,
    justifyContent: 'center',
  },
  serchview: {
    width: '90%',
    flexDirection: 'row',
    borderRadius: 15,
    // height: metrics.HEIGHT * 0.07,
    // marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 8,
    marginHorizontal: '5%',
    marginBottom: '2%',
    background: 'transparent',
    paddingHorizontal: '3%',
    padding: 5,
  },
  searchtextin: {
    width: '80%',
    marginLeft: '5%',
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
});

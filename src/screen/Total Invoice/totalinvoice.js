import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import metrics from '../../utils/metrics';

const data = [
  {
    id: 1,
    Proname: 'gantt test',
    clientname: 'suriya',
    invodate: '01/06/2023',
    duedate: '31/06/2023',
    totalaemount: '10,500',
    status: 'done',
  },
  {
    id: 2,
    Proname: 'gantt test',
    clientname: 'suriya',
    invodate: '01/06/2023',
    duedate: '31/06/2023',
    totalaemount: '10,500',
    status: 'done',
  },
  {
    id: 3,
    Proname: 'gantt test',
    clientname: 'suriya',
    invodate: '01/06/2023',
    duedate: '31/06/2023',
    totalaemount: '10,500',
    status: 'done',
  },
  {
    id: 4,
    Proname: 'gantt test',
    clientname: 'suriya',
    invodate: '01/06/2023',
    duedate: '31/06/2023',
    totalaemount: '10,500',
    status: 'done',
  },
];

const TotalInvoice = props => {
  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Total Invoice" navigation={props.navigation} />
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
                marginTop: '3%',
                marginBottom: '2%',
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
                elevation: 3,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: "red",
                    width: metrics.WIDTH * 0.9,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <FontAwesome5
                      name="home"
                      size={20}
                      style={{
                        marginHorizontal: '5%',
                        color: '#1864ab',
                      }}
                    /> */}
                    <Image
                      source={require('../../assets/totaldoc.png')}
                      style={{
                        height: metrics.HEIGHT * 0.03,
                        width: metrics.WIDTH * 0.06,
                        marginLeft: '9%',
                        marginRight: '7%',
                        // backgroundColor: '#00ADB5',
                      }}
                    />
                    <Text
                      style={{
                        color: '#00ADB5',
                        fontWeight: '600',
                        marginLeft: '2%',
                        fontSize: 16,
                      }}>
                      {item.id}
                    </Text>
                  </View>
                </View>

                <View style={{marginVertical: '6%'}}>
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
                      Project Name :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.Proname}
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
                      Client Name :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.clientname}
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
                      Invoice No :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      FY2324006
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
                      Invoice Date :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.invodate}
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
                      {item.duedate}
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
                      Total Amount:
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.totalaemount}
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
                      Status :
                    </Text>
                    <Text
                      style={{
                        color: '#CCD6DD',
                        marginLeft: '3%',
                        fontWeight: '550',
                        fontSize: 15,
                      }}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: '4%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ViewInvoice');
                    }}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#009199',
                      width: metrics.WIDTH * 0.35,
                      paddingVertical: '1.7%',
                      borderRadius: 10,
                      borderWidth: 0.6,
                      borderColor: '#00ADB5',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: 16,
                        marginRight: '8%',
                      }}>
                      View
                    </Text>
                    <MaterialCommunityIcons
                      name="eye"
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
                      PDF
                    </Text>
                    <MaterialCommunityIcons
                      name="file-pdf-box"
                      size={25}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          );
        }}
      />
    </View>
  );
};

export default TotalInvoice;

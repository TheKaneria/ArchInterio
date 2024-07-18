import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
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
import fonts from '../../utils/fonts';

const quotation = [
  {id: 1, Qdate: '01/06/2023', Ddate: '31/06/2023', Qty: '500', Amount: '1000'},
  {id: 2, Qdate: '01/06/2023', Ddate: '31/06/2023', Qty: '500', Amount: '1000'},
  {id: 3, Qdate: '01/06/2023', Ddate: '31/06/2023', Qty: '500', Amount: '1000'},
];

const milestone = [
  {
    id: 1,
    name: 'milestone1',
    Sdate: '31/06/2023',
    Ddate: '31/06/2023',
    Status: 'Penging',
  },
  {
    id: 2,
    name: 'milestone2',
    Sdate: '31/06/2023',
    Ddate: '31/06/2023',
    Status: 'Penging',
  },
];

const tasks = [
  {
    id: 1,
    name: 'milestone1',
    taskname: 'Test 1',
    AssEm: 'employee 1',
    Assven: 'vender 1',
    Sdate: '31/06/2023',
    Ddate: '31/06/2023',
    Status: 'Penging',
  },
  {
    id: 2,
    name: 'milestone2',
    taskname: 'Test 2',
    AssEm: 'employee 2',
    Assven: 'vender 3',
    Sdate: '31/06/2023',
    Ddate: '31/06/2023',
    Status: 'Penging',
  },
];

const notes = [
  {id: 1, title: 'title', Subject: 'subject'},
  {id: 2, title: 'title', Subject: 'subject'},
];

const invoice = [
  {
    id: 1,
    Indate: '01/06/2023',
    Ddate: '31/06/2023',
    amount: '10,500',
    status: 'Done',
  },
];

const Report = props => {
  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Report" navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '20%',
        }}>
        {/* Basic Details */}
        <View
          style={{
            backgroundColor: colors.backgroundcolor,
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.colortext,
              left: 5,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Basic Details
          </Text>
          {/* <Feather
          name="chevron-down"
          size={25}
          color={colors.colortext}
          style={{right: 5}}
        /> */}
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Project Code :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            LD-002
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Project Name :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            gantt test
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Client Name :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            Suriya
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Phone Number :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            0000000000
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Email :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            SURESH@ABC.COM
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Company Name :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            jinometals
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Location :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            dsa
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Website :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}></Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Start Date :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            01/06/2023
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Deadline :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            31/06/2023
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Type Name :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            Landscape Design
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Price :</Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}></Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>
            Project Details :
          </Text>
        </View>
        <View
          style={{
            paddingTop: metrics.HEIGHT * 0.04,
            paddingBottom: metrics.HEIGHT * 0.04,
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: '5%',
            borderRadius: 5,
            backgroundColor: '#393E46',
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            gantt test
          </Text>
        </View>
        {/* Quotation */}
        <View
          style={{
            backgroundColor: colors.backgroundcolor,
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.colortext,
              left: 5,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Quotation
          </Text>
          <Feather
            name="chevron-down"
            size={25}
            color={colors.colortext}
            style={{right: 5}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={quotation}
            style={{marginTop: 10}}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <LinearGradient
                  animation="slideInLeft"
                  colors={['#393E46', '#393E46', '#393E46']}
                  style={{
                    padding: '3%',
                    elevation: 2,
                    borderRadius: 13,
                    backgroundColor: '#393E46',
                    marginTop: '3%',
                    marginBottom: '2%',
                    flexDirection: 'row',

                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Quotation No.
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            // marginTop: 5,
                            left: 5,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          {item.id}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Quotation Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.Qdate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Due Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          left: 5,
                        }}>
                        {item.Ddate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Quantity
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          left: 5,
                        }}>
                        {item.Qty}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Amount
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          left: 5,
                        }}>
                        {item.Amount}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>
        {/* Milestone */}
        <View
          style={{
            backgroundColor: colors.backgroundcolor,
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.colortext,
              left: 5,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Milestone
          </Text>
          <Feather
            name="chevron-down"
            size={25}
            color={colors.colortext}
            style={{right: 5}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={milestone}
            style={{marginTop: 10}}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <LinearGradient
                  animation="slideInLeft"
                  colors={['#393E46', '#393E46', '#393E46']}
                  style={{
                    padding: '3%',
                    elevation: 2,
                    borderRadius: 13,
                    backgroundColor: '#393E46',
                    marginTop: '3%',
                    marginBottom: '2%',
                    flexDirection: 'row',

                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Name.
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            // marginTop: 5,
                            left: 5,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Start Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.Sdate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Due Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          left: 5,
                        }}>
                        {item.Ddate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Status
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          left: 5,
                        }}>
                        {item.Status}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>
        {/* Tasks */}
        <View
          style={{
            backgroundColor: colors.backgroundcolor,
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.colortext,
              left: 5,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Tasks
          </Text>
          <Feather
            name="chevron-down"
            size={25}
            color={colors.colortext}
            style={{right: 5}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={tasks}
            style={{marginTop: 10}}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <LinearGradient
                  animation="slideInLeft"
                  colors={['#393E46', '#393E46', '#393E46']}
                  style={{
                    padding: '3%',
                    elevation: 2,
                    borderRadius: 13,
                    backgroundColor: '#393E46',
                    marginTop: '3%',
                    marginBottom: '2%',
                    flexDirection: 'row',

                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Name.
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            // marginTop: 5,
                            left: 5,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Task Name
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.taskname}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Assigned Employee
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.AssEm}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Assigned Vendor
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.Assven}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Start Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.Sdate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Due Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          left: 5,
                        }}>
                        {item.Ddate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Status
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          left: 5,
                        }}>
                        {item.Status}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>
        {/* Notes */}
        <View
          style={{
            backgroundColor: colors.backgroundcolor,
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.colortext,
              left: 5,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Notes
          </Text>
          <Feather
            name="chevron-down"
            size={25}
            color={colors.colortext}
            style={{right: 5}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={notes}
            style={{marginTop: 10}}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <LinearGradient
                  animation="slideInLeft"
                  colors={['#393E46', '#393E46', '#393E46']}
                  style={{
                    padding: '3%',
                    elevation: 2,
                    borderRadius: 13,
                    backgroundColor: '#393E46',
                    marginTop: '3%',
                    marginBottom: '2%',
                    flexDirection: 'row',

                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Title.
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            // marginTop: 5,
                            left: 5,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Subject
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.Subject}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>
        {/* Invoice */}
        <View
          style={{
            backgroundColor: colors.backgroundcolor,
            marginTop: metrics.HEIGHT * 0.02,
            marginHorizontal: '2%',
            paddingTop: metrics.HEIGHT * 0.02,
            paddingBottom: metrics.HEIGHT * 0.02,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.colortext,
              left: 5,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Invoice
          </Text>
          <Feather
            name="chevron-down"
            size={25}
            color={colors.colortext}
            style={{right: 5}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={invoice}
            style={{marginTop: 10}}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <LinearGradient
                  animation="slideInLeft"
                  colors={['#393E46', '#393E46', '#393E46']}
                  style={{
                    padding: '3%',
                    elevation: 2,
                    borderRadius: 13,
                    backgroundColor: '#393E46',
                    marginTop: '3%',
                    marginBottom: '2%',
                    flexDirection: 'row',

                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Invoice No.
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            // marginTop: 5,
                            left: 5,
                          }}>
                          {item.id}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Invoice Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.Indate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Due Date
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.Ddate}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Amount
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.amount}
                      </Text>
                    </View>
                    <View style={{marginTop: 15, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Status
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          //   marginTop: 5,
                          left: 5,
                        }}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Report;

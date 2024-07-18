import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import metrics from '../../utils/metrics';

const childdata = [
  {
    id: 1,
    itname: 'demo',
    qty: '200',
    price: '50',
    gst: '5',
    gstamt: '500',
    amount: '10500',
  },
];

const ViewInvoice = props => {
  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="View Invoice" navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '20%',
        }}>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Invoice No :</Text>
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
            FY2324004
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Invoice Date :</Text>
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
          <Text style={{color: '#00ADB5', fontSize: 15}}>Due Date :</Text>
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
            SURIYO
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Project :</Text>
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
            KEVAL JOSHI
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>
            Billing Address :
          </Text>
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
            bye
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>Invoice Header :</Text>
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
            PROFORMA INVOICE
          </Text>
        </View>
        <View style={{marginTop: 15, marginHorizontal: '5%'}}>
          <Text style={{color: '#00ADB5', fontSize: 15}}>GST No :</Text>
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
            marginBottom: metrics.HEIGHT * 0.05,
          }}>
          <Text
            style={{
              width: '90%',
              color: '#fff',
            }}>
            aaaaaajj4541
          </Text>
        </View>
        {/* <View style={{marginTop: 5}}> */}
        <FlatList
          data={childdata}
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
                    }}></View>

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
                        Item Name :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.itname}
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
                        Qty :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.qty}
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
                        Price :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.price}
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
                        GST(%) :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.gst}
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
                        GST Amt :
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.gstamt}
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
                        Amount:
                      </Text>
                      <Text
                        style={{
                          color: '#CCD6DD',
                          marginLeft: '3%',
                          fontWeight: '550',
                          fontSize: 15,
                        }}>
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            );
          }}
        />
        {/* </View> */}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.backgroundcolor,
          paddingTop: metrics.HEIGHT * 0.02,
          paddingBottom: metrics.HEIGHT * 0.02,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: '2%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: colors.colortext,
                fontSize: 16,
              }}>
              Discount(%)
            </Text>
            <Text
              style={{
                color: colors.white,
              }}>
              0
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.colortext,
                fontSize: 16,
              }}>
              Discount Amt
            </Text>
            <Text
              style={{
                color: colors.white,
              }}>
              0
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Text style={{color: colors.colortext}}>
            Total Amount <Text style={{color: colors.white}}>10500</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
export default ViewInvoice;

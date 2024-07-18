/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import metrics from '../../../utils/metrics';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {useProjectContext} from '../../../context/project_context';

const Overview = props => {
  const [pDetails, SetPDetails] = useState('');
  const {post_data, mainid} = useProjectContext();

  const data = [
    {value: 10, color: '#2caffe', text: '10%'},
    {value: 30, color: '#544fc5', text: '30%'},
    {value: 20, color: '#00e272', text: '20%'},
    {value: 20, color: '#fe6a35', text: '20%'},
    {value: 20, color: '#6b8abc', text: '20%'},
  ];

  const data2 = [
    {value: 70, color: '#2caffe', text: '70%'},
    {value: 30, color: '#544fc5', text: '30%'},
  ];

  const data3 = [
    {value: 60, color: '#2caffe', text: '60%'},
    {value: 10, color: '#544fc5', text: '10%'},
    {value: 30, color: '#00e272', text: '30%'},
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.themecolor,
        paddingBottom: '1%',
      }}>
      <Backcom title="Overview" navigation={props.navigation} />
      <ScrollView style={{marginHorizontal: '5%'}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: '4%'}}>
          <Text
            style={{
              color: '#00ADB5',
              fontSize: 30,
              fontWeight: '600',
            }}>
            {post_data?.name}
          </Text>
          <Text
            style={{
              backgroundColor: '#393E46',
              color: '#fff',
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 5,
              marginLeft: '3%',
              fontWeight: '600',
            }}>
            {post_data?.code}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <EvilIcons name="calendar" color={'#fff'} size={22} />
          <Text
            style={{
              color: '#EEEEEE',
              fontSize: 13,
              fontWeight: '500',
              marginLeft: '2%',
            }}>
            {post_data?.start_date} - {post_data?.deadline}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: '9%',
          }}>
          <Text style={styles.ttxt}>Company Name - {post_data?.com_name}</Text>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center'}}>
          <EvilIcons name="location" color={'#00ADB5'} size={20} />
          <Text style={styles.dtxt}> {post_data?.location}</Text>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center'}}>
          <SimpleLineIcons name="phone" color={'#00ADB5'} size={15} />
          <Text style={styles.dtxt}> {post_data?.phone_no}</Text>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center'}}>
          <Fontisto name="email" color={'#00ADB5'} size={15} />
          <Text style={styles.dtxt}> {post_data?.email}</Text>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center'}}>
          <MaterialCommunityIcons name="web" color={'#00ADB5'} size={18} />
          <Text style={styles.dtxt}> {post_data?.website}</Text>
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: '9%'}}>
          <Text style={styles.ttxt}>Project Details</Text>
        </View>
        <View
          style={{
            backgroundColor: '#393E46',
            borderColor: '#393E46',

            marginTop: '5%',
            padding: '5%',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#fff',
            }}>
            {post_data?.details}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '9%',
          }}>
          <Text style={styles.ttxt}>
            Client Name - {post_data?.clients?.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '3%',
            marginLeft: '1%',
            alignItems: 'center',
          }}>
          <Fontisto name="email" color={'#00ADB5'} size={15} />
          <Text style={styles.dtxt}> {post_data?.clients?.email}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '3%',
            marginLeft: '1%',
            alignItems: 'center',
          }}>
          <SimpleLineIcons name="phone" color={'#00ADB5'} size={15} />
          <Text style={styles.dtxt}> {post_data?.clients?.contact}</Text>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Contact Person Name :{' '}
          </Text>
          <Text style={styles.dtxt}>
            {post_data?.clients?.contact_person_name}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '3%', alignItems: 'center'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Contact Person Number :{' '}
          </Text>
          <Text style={styles.dtxt}>
            {post_data?.clients?.contact_person_number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '10%',
            marginHorizontal: '2%',
          }}>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#393E46',
              elevation: 9,
              backgroundColor: '#393E46',
              borderRadius: 12,
              width: metrics.WIDTH * 0.4,
            }}>
            <View
              style={{
                paddingLeft: '12%',
                paddingRight: '5%',
                paddingTop: '4%',
                paddingBottom: '7%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#00ADB5',
                    fontSize: 25,
                    fontWeight: '600',
                  }}>
                  0
                </Text>
                <Image
                  style={{width: 60, height: 60}}
                  resizeMode="contain"
                  source={require('../../../assets/totaldoc.png')}
                />
              </View>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: '600',
                  fontSize: 16,
                  paddingTop: 10,
                }}>
                Total Qotation Amount
              </Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#393E46',
              elevation: 9,
              backgroundColor: '#393E46',
              borderRadius: 12,
              width: metrics.WIDTH * 0.4,
            }}>
            <View
              style={{
                paddingLeft: '12%',
                paddingRight: '5%',
                paddingTop: '4%',
                paddingBottom: '7%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#00ADB5',
                    fontSize: 25,
                    fontWeight: '600',
                  }}>
                  0
                </Text>
                <Image
                  style={{width: 60, height: 60}}
                  resizeMode="contain"
                  source={require('../../../assets/totaldoc.png')}
                />
              </View>
              <Text
                style={{
                  marginBottom: 10,
                  color: colors.white,
                  paddingTop: 10,
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Total Invoice Amount
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: metrics.HEIGHT * 0.024,
            marginHorizontal: '1%',
            borderWidth: 0.5,
            borderColor: '#393E46',
            elevation: 9,
            marginBottom: '2%',
            backgroundColor: '#393E46',
            borderRadius: 13,
          }}>
          <View
            style={{
              paddingLeft: '6%',
              paddingRight: '5%',
              paddingTop: '2%',
              paddingBottom: '7%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#00ADB5',
                  fontSize: 25,
                  fontWeight: '600',
                }}>
                {post_data?.balance}
              </Text>
              <Text
                style={{
                  color: '#ca513f',
                  fontWeight: '600',
                  fontSize: 40,
                  paddingRight: '6%',
                }}>
                ₹
              </Text>
            </View>
            <Text
              style={{
                color: colors.white,
                paddingTop: 10,
                fontWeight: '700',
                fontSize: 16,
              }}>
              Pending Balance
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: '7%',
            alignItems: 'center',
            width: metrics.WIDTH * 1,
          }}>
          <Text
            style={{
              color: '#00ADB5',
              fontSize: 24,
              fontWeight: '600',
              marginBottom: '4%',
              marginRight: '4%',
            }}>
            Task
          </Text>
          <PieChart
            radius={150}
            textSize={18}
            showText
            // isThreeD
            textColor="white"
            focusOnPress
            // showTextBackground
            textBackgroundRadius={26}
            data={data}
            fontWeight="bold"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Octicons name="dot-fill" color={'#2caffe'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              To Do
            </Text>
            <Octicons name="dot-fill" color={'#544fc5'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              Working
            </Text>
            <Octicons name="dot-fill" color={'#00e272'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              To Check
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Octicons name="dot-fill" color={'#fe6a35'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              To Completed
            </Text>
            <Octicons name="dot-fill" color={'#6b8abc'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              Client
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: '10%',
            alignItems: 'center',
            width: metrics.WIDTH * 1,
          }}>
          <Text
            style={{
              color: '#00ADB5',
              fontSize: 24,
              fontWeight: '600',
              marginBottom: '4%',
              marginRight: '4%',
            }}>
            Milestone
          </Text>
          <PieChart
            radius={150}
            textSize={18}
            showText
            // isThreeD
            textColor="white"
            focusOnPress
            // showTextBackground
            textBackgroundRadius={26}
            data={data2}
            fontWeight="bold"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Octicons name="dot-fill" color={'#2caffe'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              Panding
            </Text>
            <Octicons name="dot-fill" color={'#544fc5'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              Completed
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: '10%',
            alignItems: 'center',
            width: metrics.WIDTH * 1,
            marginBottom: '4%',
          }}>
          <Text
            style={{
              color: '#00ADB5',
              fontSize: 24,
              fontWeight: '600',
              marginBottom: '4%',
              marginRight: '4%',
            }}>
            Site-Visit / Meeting
          </Text>
          <PieChart
            radius={150}
            textSize={18}
            showText
            // isThreeD
            textColor="white"
            focusOnPress
            // showTextBackground
            textBackgroundRadius={26}
            data={data3}
            fontWeight="bold"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Octicons name="dot-fill" color={'#2caffe'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              Pending
            </Text>
            <Octicons name="dot-fill" color={'#544fc5'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              Done
            </Text>
            <Octicons name="dot-fill" color={'#00e272'} size={26} />
            <Text
              style={{
                color: '#EEEEEE',
                marginLeft: '2%',
                marginRight: '5%',
                marginTop: '0.5%',
              }}>
              Cancelled
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dtxt: {
    color: '#EEEEEE',
    fontSize: 16,
    fontWeight: '400',
    marginRight: '3%',
    marginLeft: '2%',
  },
  icon: {
    width: metrics.WIDTH * 0.04,
    height: metrics.HEIGHT * 0.02,
    marginTop: '3%',
    marginRight: '3%',
  },
  ticon: {
    width: metrics.WIDTH * 0.07,
    height: metrics.HEIGHT * 0.035,
  },
  ttxt: {
    color: '#00ADB5',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Overview;

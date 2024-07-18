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
  PermissionsAndroid,
  Platform,
  Modal,
  AsyncStorage,
} from 'react-native';
import colors from '../../../utils/colors';
import Backcom from '../../../component/backcom';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../../../utils/metrics';
import * as Animatable from 'react-native-animatable';
import fonts from '../../../utils/fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';

const Addinvoice = props => {
  const [isDatePickerinvoice, setDatePickerinvoice] = useState(false);
  const [getdateinvoice, setdateinvoice] = useState('');

  const showDatePickerinvoice = () => {
    setDatePickerinvoice(true);
  };

  const hideDatePickerinvoice = () => {
    setDatePickerinvoice(false);
  };
  const handleConfirminvoice = date => {
    setdateinvoice(date);
    hideDatePickerinvoice();
  };
  ///

  const [isDatePickerdue, setDatePickerdue] = useState(false);
  const [getdatedue, setdatedue] = useState('');
  const [sectionmodel, setsectionmodel] = useState(false);
  const [getsubject, setsubject] = useState('');
  const [get_array, set_array] = useState([]);
  const [itemName, setitemname] = useState('');
  const [qty, setqty] = useState('');
  const [price, setprice] = useState('');
  const [gst, setgst] = useState('');
  const [gstamount, setgstamount] = useState('');
  const [amount, setamount] = useState('');
  const [discount, setdiscount] = useState('');
  const [damount, setdamount] = useState('');

  const addvalue = async () => {
    const obj = {
      itemname: itemName,
      qty: qty,
      price: price,
      gst: gst,
      gstamount: gstamount,
      amount: amount,
    };
    console.log('dataobj --->', obj);
    const data = obj;
    setsectionmodel(false);
    await set_array([...get_array, data]);
    await setitemname('');
    await setqty('');
    await setprice('');
    await setgst('');
    await setgstamount('');
    await setamount('');
  };

  const removePerson = index => {
    let filteredArray = get_array.filter((item, i) => i !== index);
    set_array(filteredArray);
  };

  const showDatePickerdue = () => {
    setDatePickerdue(true);
  };

  const hideDatePickerdue = () => {
    setDatePickerinvoice(false);
  };
  const handleConfirmdue = date => {
    setdatedue(date);
    hideDatePickerdue();
  };

  const [focusedInputs, setFocusedInputs] = useState([]);
  const [focusedInputs1, setFocusedInputs1] = useState([]);
  const [focusedInputs2, setFocusedInputs2] = useState([]);
  const [focusedInputs3, setFocusedInputs3] = useState(false);

  const handleFocus = index => {
    setFocusedInputs(prevFocusedInputs => {
      const updatedFocusedInputs = [...prevFocusedInputs];
      updatedFocusedInputs[index] = true;
      return updatedFocusedInputs;
    });
  };

  const handleBlur = index => {
    setFocusedInputs(prevFocusedInputs => {
      const updatedFocusedInputs = [...prevFocusedInputs];
      updatedFocusedInputs[index] = false;
      return updatedFocusedInputs;
    });
  };

  const handleFocus1 = index => {
    setFocusedInputs1(prevFocusedInputs => {
      const updatedFocusedInputs = [...prevFocusedInputs];
      updatedFocusedInputs[index] = true;
      return updatedFocusedInputs;
    });
  };

  const handleBlur1 = index => {
    setFocusedInputs1(prevFocusedInputs => {
      const updatedFocusedInputs = [...prevFocusedInputs];
      updatedFocusedInputs[index] = false;
      return updatedFocusedInputs;
    });
  };

  const handleFocus2 = index => {
    setFocusedInputs2(prevFocusedInputs => {
      const updatedFocusedInputs = [...prevFocusedInputs];
      updatedFocusedInputs[index] = true;
      return updatedFocusedInputs;
    });
  };

  const handleBlur2 = index => {
    setFocusedInputs2(prevFocusedInputs => {
      const updatedFocusedInputs = [...prevFocusedInputs];
      updatedFocusedInputs[index] = false;
      return updatedFocusedInputs;
    });
  };

  const handleFocus3 = () => {
    setFocusedInputs3(true);
  };

  const handleBlur3 = () => {
    setFocusedInputs3(false);
  };

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

  const rinputs = [
    {label: 'Invoice Header', placeholder: 'Enter Invoice Header'},
    {label: 'GST No', placeholder: 'Enter GST No'},
  ];

  const inputs = [
    {label: 'Invoice No', placeholder: 'Enter Invoice No'},
    {label: 'Client', placeholder: 'Enter Client Name'},
    {label: 'Project', placeholder: 'Enter Project Name'},
  ];

  const ainputs = [
    {label: 'Discout (%)', placeholder: 'Enter Discout (%)'},
    {label: 'Discout Amount', placeholder: 'Enter Discout Amount'},
    {label: 'Total Amount', placeholder: 'Enter Total Amount'},
  ];

  const renderRInputs = () => {
    return rinputs.map((input, index) => (
      <>
        <Text style={styles.txt}>{input.label}</Text>
        <TextInput
          key={index}
          style={[styles.input, focusedInputs[index] && styles.focusedInput]}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          placeholder={input.placeholder}
          placeholderTextColor={colors.gray}
        />
      </>
    ));
  };

  const renderInputs = () => {
    return inputs.map((input, index) => (
      <>
        <Text style={styles.txt}>{input.label}</Text>
        <TextInput
          key={index}
          style={[styles.input, focusedInputs1[index] && styles.focusedInput]}
          onFocus={() => handleFocus1(index)}
          onBlur={() => handleBlur1(index)}
          placeholder={input.placeholder}
          placeholderTextColor={colors.gray}
        />
      </>
    ));
  };

  const renderAInputs = () => {
    return ainputs.map((input, index) => (
      <>
        <Text style={styles.txt}>{input.label}</Text>
        <TextInput
          key={index}
          style={[styles.input, focusedInputs2[index] && styles.focusedInput]}
          onFocus={() => handleFocus2(index)}
          onBlur={() => handleBlur2(index)}
          placeholder={input.placeholder}
          placeholderTextColor={colors.gray}
        />
      </>
    ));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Add Invoice" navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '20%',
        }}>
        <View style={{marginHorizontal: '3%'}}>{renderInputs()}</View>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.txt}>Quotation Date</Text>
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
        <View style={{marginHorizontal: '3%'}}>{renderRInputs()}</View>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.txt}>Billing Address</Text>
          <TextInput
            style={[styles.ainput, focusedInputs3 && styles.focusedInput]}
            onFocus={() => handleFocus3()}
            onBlur={() => handleBlur3()}
            placeholder={'Enter Billing Address'}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor={colors.gray}
          />
        </View>

        <View style={{marginTop: 10}}>
          <FlatList
            data={get_array}
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
                    // width: '90%',
                    // alignItems: 'flex-start',
                    // alignSelf: 'center',
                    marginHorizontal: '3%',
                  }}>
                  <View style={{width: '100%'}}>
                    <View
                      style={{
                        right: '1%',
                        position: 'absolute',
                      }}>
                      <Ionicons
                        name="close-circle-sharp"
                        size={28}
                        color={'#00ADB5'}
                        style={{}}
                        onPress={() => removePerson(index)}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            color: '#00ADB5',
                            fontSize: 16,
                            fontFamily: fonts.NeueHaasDisplayRomandark,
                          }}>
                          Item Name
                        </Text>
                        <Text
                          style={{
                            color: colors.white,
                            fontWeight: '500',
                            marginTop: 5,
                          }}>
                          {item.itemname}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Qty
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginTop: 5,
                        }}>
                        {item.qty}
                      </Text>
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        Price
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginTop: 5,
                        }}>
                        {item.price}
                      </Text>
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        GST (%)
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginTop: 5,
                        }}>
                        {item.gst}
                      </Text>
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text
                        style={{
                          color: '#00ADB5',
                          fontSize: 16,
                          fontFamily: fonts.NeueHaasDisplayRomandark,
                        }}>
                        GST Amount
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: '500',
                          marginTop: 5,
                        }}>
                        {item.gstamount}
                      </Text>
                    </View>
                    <View style={{marginTop: 15}}>
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
                          marginTop: 5,
                        }}>
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              );
            }}
          />
        </View>
        {get_array.length == 0 ? null : (
          <>
            <View style={{marginHorizontal: '3%'}}>{renderAInputs()}</View>
          </>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 20,
          width: '90%',
          marginHorizontal: '5%',
        }}>
        {get_array == 0 ? null : (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderRadius: 30,
              backgroundColor: '#00ADB5',
              paddingHorizontal: '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // paddingTop: '5%',
              // paddingBottom: '5%',
              width: '35%',
            }}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={25}
              color={'#fff'}
            />
            <Text style={{color: colors.white}}>Submit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            setsectionmodel(true);
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00ADB5',
            width: 50,
            height: 50,
            borderRadius: 50,
            // right: 15,
          }}>
          <AntDesign name="plus" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={sectionmodel}
        onRequestClose={() => {
          setsectionmodel(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: colors.themecolor,
          }}>
          <ScrollView
            style={{
              backgroundColor: colors.themecolor,
              width: metrics.WIDTH * 1,
            }}>
            <View
              style={{
                marginTop: '5%',
                marginRight: '5%',
                alignItems: 'flex-end',
              }}>
              <Ionicons
                name="close-circle-sharp"
                size={30}
                color={'#00ADB5'}
                style={{}}
                onPress={() => {
                  setsectionmodel(false);
                }}
              />
            </View>
            <View style={styles.boxtaxview} />
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>Item Name :</Text>
            </View>
            <View
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                alignItems: 'center',
                marginHorizontal: '5%',
                borderRadius: 13,
                backgroundColor: '#393E46',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  color: '#fff',
                  backgroundColor: '#393E46',
                }}
                multiline
                placeholder="Enter Item Name "
                placeholderTextColor={colors.gray}
                onChangeText={text => {
                  setitemname(text);
                }}
              />
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>Qty :</Text>
            </View>
            <View
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                alignItems: 'center',
                marginHorizontal: '5%',
                borderRadius: 13,
                backgroundColor: '#393E46',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  color: '#fff',
                  backgroundColor: '#393E46',
                }}
                multiline
                placeholder="Enter Qty"
                placeholderTextColor={colors.gray}
                onChangeText={text => {
                  setqty(text);
                }}
              />
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>Price :</Text>
            </View>
            <View
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                alignItems: 'center',
                marginHorizontal: '5%',
                borderRadius: 13,
                backgroundColor: '#393E46',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  color: '#fff',
                  backgroundColor: '#393E46',
                }}
                multiline
                placeholder="Enter Price"
                placeholderTextColor={colors.gray}
                onChangeText={text => {
                  setprice(text);
                }}
              />
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>GST(%) :</Text>
            </View>
            <View
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                alignItems: 'center',
                marginHorizontal: '5%',
                borderRadius: 13,
                backgroundColor: '#393E46',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  color: '#fff',
                  backgroundColor: '#393E46',
                }}
                multiline
                placeholder="Enter GST(%)"
                placeholderTextColor={colors.gray}
                onChangeText={text => {
                  setgst(text);
                }}
              />
            </View>
            <View style={{marginTop: 10, marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>GST Amount :</Text>
            </View>
            <View
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                alignItems: 'center',
                marginHorizontal: '5%',
                borderRadius: 13,
                backgroundColor: '#393E46',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  color: '#fff',
                  backgroundColor: '#393E46',
                }}
                multiline
                placeholder="Enter GST Amount"
                placeholderTextColor={colors.gray}
                onChangeText={text => {
                  setgstamount(text);
                }}
              />
            </View>
            <View style={{marginTop: '1%', marginHorizontal: '5%'}}>
              <Text style={{color: '#00ADB5', fontSize: 15}}>Amount :</Text>
            </View>
            <View
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                alignItems: 'center',
                marginHorizontal: '5%',
                borderRadius: 13,
                backgroundColor: '#393E46',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  color: '#fff',
                  backgroundColor: '#393E46',
                }}
                multiline
                placeholder="Enter Amount"
                placeholderTextColor={colors.gray}
                onChangeText={text => {
                  setamount(text);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                addvalue();
              }}
              style={{
                marginTop: metrics.HEIGHT * 0.1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00ADB5',
                marginHorizontal: '5%',
                width: metrics.WIDTH * 0.35,
                alignSelf: 'center',
                paddingTop: metrics.HEIGHT * 0.02,
                paddingBottom: metrics.HEIGHT * 0.02,
                borderRadius: 5,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                ADD
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
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

export default Addinvoice;

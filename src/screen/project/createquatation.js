/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../../utils/colors';
import Backcom from '../../component/backcom';
import fonts from '../../utils/fonts';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import metrics from '../../utils/metrics';

const Createquatation = props => {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  const [focusedInputs, setFocusedInputs] = useState([]);
  const [focusedInputs3, setFocusedInputs3] = useState([]);

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const [isDatePickerquatation, setDatePickerquatation] = useState(false);
  const [isDatePickerquatation1, setDatePickerquatation1] = useState(false);
  const [getdatequatation, setdatequatation] = useState('');
  const [getdatequatation1, setdatequatation1] = useState('');

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

  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
    console.log('true');
  };

  const handleBlur3 = () => {
    setIsFocused3(false);
  };

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

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const inputs = [
    {label: 'Quotation No', placeholder: 'Enter Quotation No'},
    {label: 'Project', placeholder: 'Enter Project'},
    {label: 'Client', placeholder: 'Enter Client'},
    {label: 'Phone Number', placeholder: 'Enter Phone Number'},
    {label: 'Company Name', placeholder: 'Enter Company Name'},
    {label: 'Type', placeholder: 'Enter Type'},
    {label: 'Particulars', placeholder: 'Enter Particulars'},
    {label: 'Quantity', placeholder: 'Enter Quantity'},
    {label: 'Amount', placeholder: 'Enter Amount'},
    {label: 'Client Location', placeholder: 'Enter Client Location'},
    {label: 'Project Location', placeholder: 'Enter Project Location'},
  ];

  const renderInputs = () => {
    return inputs.map((input, index) => (
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

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Add Quatation" navigation={props.navigation} />
      <ScrollView>
        {/* <View style={styles.container}>
          <Text style={styles.txt}>Franchise</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.txt}>Type Name</Text>
          <Dropdown
            style={[styles.dropdown, isFocus1 && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus1 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value1}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={item => {
              setValue1(item.value);
              setIsFocus1(false);
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.txt}>Client name</Text>
          <Dropdown
            style={[styles.dropdown, isFocus2 && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus2 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value2}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={item => {
              setValue2(item.value);
              setIsFocus2(false);
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.txt}>Assign Day</Text>
          <Dropdown
            style={[styles.dropdown, isFocus3 && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus3 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value3}
            onFocus={() => setIsFocus3(true)}
            onBlur={() => setIsFocus3(false)}
            onChange={item => {
              setValue3(item.value);
              setIsFocus3(false);
            }}
          />
        </View> */}
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
        <View style={styles.container}>
          <Text style={styles.txt}>Vendor</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.txt}>Time Frame</Text>
          <Dropdown
            style={[styles.dropdown, isFocus1 && {borderColor: '#00ADB5'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.constyle}
            dropdownPosition="bottom"
            itemContainerStyle={styles.itemconstyle}
            itemTextStyle={{
              color: '#fff',
            }}
            data={data}
            activeColor="#00ADB5"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus1 ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value1}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={item => {
              setValue1(item.value);
              setIsFocus1(false);
            }}
          />
        </View>
        <View style={{marginHorizontal: '3%', marginBottom: '10%'}}>
          <Text style={styles.txt}>Address</Text>
          <TextInput
            style={[styles.ainput, isFocused1 && styles.focusedInput]}
            onFocus={() => handleFocus1}
            onBlur={() => handleBlur1}
            placeholder={'Enter Project Details'}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor={colors.gray}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10%',
            paddingHorizontal: '10%',
          }}>
          <TouchableOpacity
            style={{backgroundColor: '#00ADB5', borderRadius: 7}}>
            <Text
              style={{
                color: '#fff',
                paddingHorizontal: '13%',
                paddingVertical: '3.5%',
                fontWeight: '500',
                fontSize: 18,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#393E46',
              borderRadius: 7,
              borderWidth: 0.7,
              borderColor: '#00ADB5',
            }}>
            <Text
              style={{
                color: '#00ADB5',
                paddingHorizontal: '13%',
                paddingVertical: '3.5%',
                fontWeight: '500',
                fontSize: 18,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            margin: '4%',
            elevation: 2,
            borderWidth: 0.5,
            borderColor: colors.themecolor,
            borderRadius: 20,
            backgroundColor: colors.white,
          }}>
          <Text
            style={{
              color: colors.themecolor,
              fontSize: 26,
              fontWeight: '500',
              textAlign: 'center',
              paddingBottom: 20,
              paddingTop: 20,
            }}>
            Applified
          </Text>
          <View style={{marginHorizontal: '6%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/project.png')}
                style={{
                  width: metrics.WIDTH * 0.07,
                  height: metrics.HEIGHT * 0.035,
                }}
              />
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Project Details
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Project Name:</Text>
              <TextInput
                value={pName}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetPName(text)}
                />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Project Type:</Text>
              <TextInput
                value={pType}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetPType(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Project Code:</Text>
              <TextInput
                value={pCode}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetPCode(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Project Location:</Text>
              <TextInput
                value={pLocation}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetPLocation(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Project Details:</Text>
              <TextInput
                value={pDetails}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetPDetails(text)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              <Image
                source={require('../../../assets/avatar.png')}
                style={{
                  width: metrics.WIDTH * 0.07,
                  height: metrics.HEIGHT * 0.035,
                }}
              />
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Client Details
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Client Name:</Text>
              <TextInput
                value={cName}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetCName(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Phone No.:</Text>
              <TextInput
                value={phoneNo}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetPhoneNo(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Email:</Text>
              <TextInput
                value={email}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetEmail(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Client Location:</Text>
              <TextInput
                value={cLocation}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetCLocation(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Website:</Text>
              <TextInput
                value={website}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetWebsite(text)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              <Image
                source={require('../../../assets/calendar.png')}
                style={{
                  width: metrics.WIDTH * 0.07,
                  height: metrics.HEIGHT * 0.035,
                }}
              />
              <Text
                style={{
                  color: colors.themecolor,
                  fontSize: 18,
                  fontWeight: '700',
                  marginLeft: '2%',
                }}>
                Schedule
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Start Date:</Text>
              <TextInput
                value={startDate}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetStartDate(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Due Date:</Text>
              <TextInput
                value={duetDate}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetDueDate(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Start On Date:</Text>
              <TextInput
                value={starOntDate}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetStartOnDate(text)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: '5%'}}>
              <Text style={styles.txt}>Assign Day:</Text>
              <TextInput
                value={assignDay}
                style={styles.txtinput}
                activeUnderlineColor={colors.themecolor}
                onChangeText={text => SetAssignDay(text)}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.themecolor,
                borderRadius: 5,
                alignSelf: 'center',
                marginVertical: '8%',
              }}>
              <Text
                style={{
                  color: colors.white,
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  fontWeight: '800',
                }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
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
});

export default Createquatation;

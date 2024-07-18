/* eslint-disable prettier/prettier */
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
import colors from '../../../utils/colors';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Backcom from '../../../component/backcom';
import fonts from '../../../utils/fonts';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import metrics from '../../../utils/metrics';

const Addexpanse = props => {
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

  const [focusedInputs, setFocusedInputs] = useState([]);

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

  const inputs = [
    {label: 'Item Name', placeholder: 'Enter Item Name'},
    {label: 'Price', placeholder: 'Enter Price'},
    {label: 'Purchase From', placeholder: 'Enter Purchase From'},
    {label: 'Expense Category', placeholder: 'Enter Expense Category'},
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

  const [isDatePickerquatation, setDatePickerquatation] = useState(false);
  const [getdatequatation, setdatequatation] = useState('');

  const handleConfirmquatation = date => {
    setdatequatation(date);
    hideDatePickerquatation();
  };

  const showDatePickerquatation = () => {
    setDatePickerquatation(true);
  };

  const hideDatePickerquatation = () => {
    setDatePickerquatation(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.themecolor}}>
      <Backcom title="Add Expanse" navigation={props.navigation} />
      <ScrollView>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.txt}>Project</Text>
          <TextInput style={styles.input} value="value" editable={false} />
        </View>
        <View style={{marginHorizontal: '3%'}}>
          <Text style={styles.txt}>Quotation Date</Text>
          <View
            style={{
              height: metrics.HEIGHT * 0.06,
              borderWidth: 0.5,
              borderColor: '#393E46',
              borderRadius: 13,
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
        <View style={{marginHorizontal: '3%'}}>{renderInputs()}</View>
        <View
          style={{
            marginTop: 30,
            alignSelf: 'center',
            width: metrics.WIDTH * 0.4,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: '#00ADB5',
              paddingHorizontal: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: '7%',
              marginBottom: 10,
            }}>
            <Text
              style={{color: colors.white, fontSize: 17, fontWeight: '600'}}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>
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

export default Addexpanse;

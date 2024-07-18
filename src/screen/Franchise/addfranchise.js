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
  Modal,
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
import {Dropdown} from 'react-native-element-dropdown';
import fonts from '../../utils/fonts';

const AddFranchise = props => {
  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Add Franchise" navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '20%',
        }}>
        <View style={styles.container}>
          <View style={{marginTop: 10, marginHorizontal: '4%'}}>
            <Text style={styles.txt}>Name </Text>
          </View>
          <View
            style={{
              marginTop: '2%',
              marginBottom: '2%',

              // paddingTop: metrics.HEIGHT * 0.01,
              // paddingBottom: metrics.HEIGHT * 0.01,
              alignItems: 'center',
              marginHorizontal: '3%',
              borderRadius: 5,
              backgroundColor: '#393E46',
            }}>
            <TextInput
              style={{
                width: '90%',
                color: '#fff',

                backgroundColor: '#393E46',
              }}
              multiline
              placeholder="Enter Name"
              placeholderTextColor={colors.gray}
              // onChangeText={text => {
              //   setitemname(text);
              // }}
            />
          </View>
          <View style={{marginTop: 10, marginHorizontal: '4%'}}>
            <Text style={styles.txt}>E-Mail </Text>
          </View>
          <View
            style={{
              marginTop: '2%',
              marginBottom: '2%',

              // paddingTop: metrics.HEIGHT * 0.01,
              // paddingBottom: metrics.HEIGHT * 0.01,
              alignItems: 'center',
              marginHorizontal: '3%',
              borderRadius: 5,
              backgroundColor: '#393E46',
            }}>
            <TextInput
              style={{
                width: '90%',
                color: '#fff',

                backgroundColor: '#393E46',
              }}
              multiline
              placeholder="Enter E-Mail"
              placeholderTextColor={colors.gray}
              // onChangeText={text => {
              //   setitemname(text);
              // }}
            />
          </View>
          <View style={{marginTop: 10, marginHorizontal: '4%'}}>
            <Text style={styles.txt}>Password </Text>
          </View>
          <View
            style={{
              marginTop: '2%',
              marginBottom: '2%',

              // paddingTop: metrics.HEIGHT * 0.01,
              // paddingBottom: metrics.HEIGHT * 0.01,
              alignItems: 'center',
              marginHorizontal: '3%',
              borderRadius: 5,
              backgroundColor: '#393E46',
            }}>
            <TextInput
              style={{
                width: '90%',
                color: '#fff',

                backgroundColor: '#393E46',
              }}
              multiline
              placeholder="Enter Password"
              placeholderTextColor={colors.gray}
              // onChangeText={text => {
              //   setitemname(text);
              // }}
            />
          </View>
          <View style={{marginTop: 10, marginHorizontal: '4%'}}>
            <Text style={styles.txt}>Contacts </Text>
          </View>
          <View
            style={{
              marginTop: '2%',
              marginBottom: '2%',

              // paddingTop: metrics.HEIGHT * 0.01,
              // paddingBottom: metrics.HEIGHT * 0.01,
              alignItems: 'center',
              marginHorizontal: '3%',
              borderRadius: 5,
              backgroundColor: '#393E46',
            }}>
            <TextInput
              style={{
                width: '90%',
                color: '#fff',

                backgroundColor: '#393E46',
              }}
              multiline
              placeholder="Enter Contacts"
              placeholderTextColor={colors.gray}
              // onChangeText={text => {
              //   setitemname(text);
              // }}
            />
          </View>
          <View style={{marginTop: 10, marginHorizontal: '4%'}}>
            <Text style={styles.txt}>Employee Suffix </Text>
          </View>
          <View
            style={{
              marginTop: '2%',
              marginBottom: '2%',

              // paddingTop: metrics.HEIGHT * 0.01,
              // paddingBottom: metrics.HEIGHT * 0.01,
              alignItems: 'center',
              marginHorizontal: '3%',
              borderRadius: 5,
              backgroundColor: '#393E46',
            }}>
            <TextInput
              style={{
                width: '90%',
                color: '#fff',

                backgroundColor: '#393E46',
              }}
              multiline
              placeholder="Enter Employee Suffix"
              placeholderTextColor={colors.gray}
              // onChangeText={text => {
              //   setitemname(text);
              // }}
            />
          </View>
          <View style={{marginTop: 10, marginHorizontal: '4%'}}>
            <Text style={styles.txt}>Client Suffix </Text>
          </View>
          <View
            style={{
              marginTop: '2%',
              marginBottom: '2%',

              // paddingTop: metrics.HEIGHT * 0.01,
              // paddingBottom: metrics.HEIGHT * 0.01,
              alignItems: 'center',
              marginHorizontal: '3%',
              borderRadius: 5,
              backgroundColor: '#393E46',
            }}>
            <TextInput
              style={{
                width: '90%',
                color: '#fff',

                backgroundColor: '#393E46',
              }}
              multiline
              placeholder="Enter Client Suffix"
              placeholderTextColor={colors.gray}
              // onChangeText={text => {
              //   setitemname(text);
              // }}
            />
          </View>
          <View style={{marginTop: 10, marginHorizontal: '4%'}}>
            <Text style={styles.txt}>Vendor Suffix </Text>
          </View>
          <View
            style={{
              marginTop: '2%',
              marginBottom: '2%',

              // paddingTop: metrics.HEIGHT * 0.01,
              // paddingBottom: metrics.HEIGHT * 0.01,
              alignItems: 'center',
              marginHorizontal: '3%',
              borderRadius: 5,
              backgroundColor: '#393E46',
            }}>
            <TextInput
              style={{
                width: '90%',
                color: '#fff',

                backgroundColor: '#393E46',
              }}
              multiline
              placeholder="Enter Vendor Suffix"
              placeholderTextColor={colors.gray}
              // onChangeText={text => {
              //   setitemname(text);
              // }}
            />
          </View>
        </View>
        <TouchableOpacity
          //   onPress={() => {
          //     addvalue();
          //   }}
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
            // marginBottom: 20,
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
  );
};

export default AddFranchise;
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

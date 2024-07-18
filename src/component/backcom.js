import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import colors from '../utils/colors';
import metrics from '../utils/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../utils/fonts';

const Backcom = props => {
  return (
    <View>
      <View style={{backgroundColor: colors.themecolor}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: '5%',
            // paddingVertical: ,
            elevation: 5,
            paddingTop: 12,
            paddingBottom: 12,
            backgroundColor: colors.themecolor,
          }}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="chevron-back-sharp"
              size={30}
              color={colors.white}
            />
          </TouchableOpacity>
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                color: colors.white,
                fontSize: 18,
                fontFamily: fonts.NeueHaasDisplayRomandark,
                fontWeight: '700',
              }}>
              {props.title}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Backcom;

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Backcom from '../../../component/backcom';
import colors from '../../../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useProjectContext} from '../../../context/project_context';

const Edit = props => {
  const data = [
    // {
    //   name: 'Basic',
    //   screen: 'Basic',
    // },
    {
      name: 'Overview',
      screen: 'Overview',
    },
    // {
    //   name: 'Quotation',
    //   screen: 'Quotation',
    // },
    {
      name: 'Members',
      screen: 'Members',
    },
    // {
    //   name: 'Files',
    //   screen: 'Files',
    // },
    {
      name: 'Milestones',
      screen: 'Milestones',
    },
    {
      name: 'Site-Vitit / Meeting',
      screen: 'Sitevisit',
    },
    {
      name: 'Tasks',
      screen: 'Task',
    },
    {
      name: 'Notes',
      screen: 'Notes',
    },

    {
      name: 'AMC',
      screen: 'Amc',
    },
    {
      name: 'Space Type',
      screen: 'SpaceType',
    },
    {
      name: 'Selection',
      screen: 'Selection',
    },
    // {
    //   name: 'Invoice',
    //   screen: 'Invoice',
    // },
    // {
    //   name: 'Expense',
    //   screen: 'Expanse',
    // },
    // {
    //   name: 'Ledger',
    //   screen: 'Ledger',
    // },
  ];

  const [getmainid, SetMainId] = useState(props.route.params.idd);
  const {GetProject} = useProjectContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetProject(props, getmainid);
    });
    return unsubscribe;
  }, [props]);

  return (
    <View style={{backgroundColor: colors.themecolor, flex: 1}}>
      <Backcom title="Edit" navigation={props.navigation} />
      <View style={{marginHorizontal: '3%', marginTop: '3%'}}>
        <FlatList
          data={data}
          contentContainerStyle={{paddingBottom: '25%'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.etview}
                onPress={() => props.navigation.navigate(item.screen)}>
                <Text style={styles.txt}>{item.name}</Text>
                <MaterialIcons
                  name="arrow-right"
                  color={'#00ADB5'}
                  size={40}
                  style={{
                    paddingVertical: '2%',
                    marginRight: '3%',
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  etview: {
    marginBottom: '4%',
    backgroundColor: '#393E46',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
  },
  txt: {
    color: '#00ADB5',
    paddingHorizontal: '6%',
    paddingVertical: '5%',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default Edit;

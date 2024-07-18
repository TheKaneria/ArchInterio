import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Splash from './screen/splash';
import Welcome from './screen/welcome';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Login from './screen/login';
import Home from './screen/home';
import Profile from './screen/profile';
import Mytabs from './screen/maintab';
import Project from './screen/project/project';
import Createbasic from './screen/project/createbasic';
import Quotation from './screen/project/quatation';
import Createquatation from './screen/project/createquatation';
import Members from './screen/project/member/member';
import CreateMember from './screen/project/member/createmember';
import Files from './screen/project/files/files';
import Createfile from './screen/project/files/createfile';
import Milestones from './screen/project/milestone/milestone';
import Sitevisit from './screen/project/sitevisit/sitevisit';
import Createsitevisit from './screen/project/sitevisit/createsitevisit';
import Task from './screen/project/task/task';
import CreateTask from './screen/project/task/createtask';
import Notes from './screen/project/notes/notes';
import Createnote from './screen/project/notes/createnote';
import Invoice from './screen/project/invoice/invoice';
import Addinvoice from './screen/project/invoice/addinvoice';
import Basic from './screen/project/edit/basic';
import Overview from './screen/project/edit/overview';
import Expanse from './screen/project/Expanse/expanse';
import Addexpanse from './screen/project/Expanse/addexpanse';
import Totalclient from './screen/Total Client/totalclient';
import Addclient from './screen/Total Client/addclient';
import Edit from './screen/project/edit/edit';
import Ledger from './screen/project/Ledger/ledger';
import Amc from './screen/project/AMC/amc';
import SpaceType from './screen/project/SpaceType/spacetype';
import Selection from './screen/project/Selection/selection';
import Report from './screen/project/report';
import TotalInvoice from './screen/Total Invoice/totalinvoice';
import ViewInvoice from './screen/Total Invoice/viewinvoice';

import MaterialType from './screen/MaterialType/materialtype';
import AddMaterialType from './screen/MaterialType/addmaterialtype';

import Type from './screen/Type/type';
import AddType from './screen/Type/addtype';

import Franchise from './screen/Franchise/franchise';
import AddFranchise from './screen/Franchise/addfranchise';

import Vendor from './screen/Vendor/vendor';
import AddVendor from './screen/Vendor/addvendor';

import Employee from './screen/employee/employee';
import Addemployee from './screen/employee/addemployee';

import ReraRegistration from './screen/ReraRegistration/reraregistration';
import AddReraRegistration from './screen/ReraRegistration/addreraregistration';

import {Easing} from 'react-native';
import {TransitionSpecs} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const RootStack = createSharedElementStackNavigator();

const options = {
  gestureEnabled: true,
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 300}},
    close: {animation: 'timing', config: {duration: 300}},
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const config = {
  animation: 'spring',
  config: {
    damping: 100,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 400,
    easing: Easing.linear,
  },
};

const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },

          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 5],
                })
              : 1,
          },
        ],
      },
    };
  },
};

const Navigation = () => (
  <NavigationContainer>
    <RootStack.Navigator
      screenOptions={{headerShown: false, ...customTransition}}
      initialRouteName="Splash">
      <RootStack.Screen name="Splash" component={Splash} />
      <RootStack.Screen name="Welcome" component={Welcome} />
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Profile" component={Profile} />
      <RootStack.Screen name="Mytabs" component={Mytabs} />
      <RootStack.Screen name="Project" component={Project} />
      <RootStack.Screen name="Createbasic" component={Createbasic} />
      <RootStack.Screen name="Quotation" component={Quotation} />
      <RootStack.Screen name="Createquatation" component={Createquatation} />
      <RootStack.Screen name="Members" component={Members} />
      <RootStack.Screen name="CreateMember" component={CreateMember} />
      <RootStack.Screen name="Files" component={Files} />
      <RootStack.Screen name="Createfile" component={Createfile} />
      <RootStack.Screen name="Milestones" component={Milestones} />
      <RootStack.Screen name="Sitevisit" component={Sitevisit} />
      <RootStack.Screen name="Createsitevisit" component={Createsitevisit} />
      <RootStack.Screen name="Task" component={Task} />
      <RootStack.Screen name="CreateTask" component={CreateTask} />
      <RootStack.Screen name="Notes" component={Notes} />
      <RootStack.Screen name="Createnote" component={Createnote} />
      <RootStack.Screen name="Invoice" component={Invoice} />
      <RootStack.Screen name="Addinvoice" component={Addinvoice} />
      <RootStack.Screen name="Basic" component={Basic} />
      <RootStack.Screen name="Overview" component={Overview} />
      <RootStack.Screen name="Expanse" component={Expanse} />
      <RootStack.Screen name="Addexpanse" component={Addexpanse} />
      <RootStack.Screen name="Totalclient" component={Totalclient} />
      <RootStack.Screen name="Addclient" component={Addclient} />
      <RootStack.Screen name="Edit" component={Edit} />
      <RootStack.Screen name="Ledger" component={Ledger} />
      <RootStack.Screen name="Amc" component={Amc} />
      <RootStack.Screen name="SpaceType" component={SpaceType} />
      <RootStack.Screen name="Selection" component={Selection} />
      <RootStack.Screen name="Report" component={Report} />
      <RootStack.Screen name="TotalInvoice" component={TotalInvoice} />
      <RootStack.Screen name="ViewInvoice" component={ViewInvoice} />
      <RootStack.Screen name="MaterialType" component={MaterialType} />
      <RootStack.Screen name="AddMaterialType" component={AddMaterialType} />
      <RootStack.Screen name="Type" component={Type} />
      <RootStack.Screen name="AddType" component={AddType} />
      <RootStack.Screen name="Franchise" component={Franchise} />
      <RootStack.Screen name="AddFranchise" component={AddFranchise} />
      <RootStack.Screen name="Vendor" component={Vendor} />
      <RootStack.Screen name="AddVendor" component={AddVendor} />
      <RootStack.Screen name="Employee" component={Employee} />
      <RootStack.Screen name="Addemployee" component={Addemployee} />
      <RootStack.Screen name="ReraRegistration" component={ReraRegistration} />
      <RootStack.Screen
        name="AddReraRegistration"
        component={AddReraRegistration}
      />

      <RootStack.Screen
        name="Login"
        component={Login}
        sharedElements={(route, otherRoute, showing) => {
          return ['item.photo'];
        }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default Navigation;

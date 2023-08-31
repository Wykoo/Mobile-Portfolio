import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import List from './List';
import Options from './Options';
import Api from './Api';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function App() {


  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Functions"
        component={List}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="function" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Api"
        component={Api}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cloud" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Options}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="information" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import { StyleSheet } from "react-native";
import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import List from "./List";
import Options from "./Options";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen name="Camera" component={List} />
      <Tab.Screen name="GPS" component={Options} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

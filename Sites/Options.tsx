import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import Gps from "../components/gps";

const Options = () => {
  const [isGpsOn, setIsGpsOn] = useState(false);
  return (
    <View style={styles.container}>
      <Button onPress={() => FIREBASE_AUTH.signOut()}>Logout</Button>
      <Button
        mode="contained"
        onPress={() => {
          setIsGpsOn(!isGpsOn);
        }}
      >
        GPS Location
      </Button>
      {isGpsOn && <Gps />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Options;

import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import MyCam from "../components/camera";

interface Routerprops {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: Routerprops) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.buttonUp}>
        <Button
          mode="contained"
          onPress={() => {
            setIsCameraOpen(!isCameraOpen);
          }}
        >
          Open/Close Camera
        </Button>
        {isCameraOpen && <MyCam />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonUp: {
    flex: 1,
  },
});

export default List;

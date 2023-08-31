import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import MyCam from "../components/camera";
import Gps from "../components/gps";
import TextAnimation from "../components/TextAnimation";


interface Routerprops {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: Routerprops) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isGpsOn, setIsGpsOn] = useState(false);

  const animatedValueForBanner = new Animated.Value(0); 

  const toggleBanner = () => {
    setIsBannerVisible(!isBannerVisible);
    if (!isBannerVisible) {
      Animated.timing(animatedValueForBanner, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(() => {
        animatedValueForBanner.setValue(0);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Przykładowe funkcje, które potrafię wykonać:</Text>
      <View style={styles.flyingButtons}>
        <TouchableOpacity
          style={[styles.flyingButton, styles.bigButton]}
          onPress={() => {
            setIsCameraOpen(!isCameraOpen);
          }}
        >
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flyingButton, styles.smallButton]}
          onPress={toggleBanner}
        >
          <Text style={styles.buttonText}>Show Banner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flyingButton, styles.smallButton]}
          onPress={() => {
            setIsGpsOn(!isGpsOn);
          }}
        >
          <Text style={styles.buttonText}>Gps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flyingButton, styles.smallButton]}
          onPress={() => {
          }}
        >
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        
        {/* Additional Buttons */}
        <TouchableOpacity
          style={[styles.flyingButton, styles.mediumButton]}
          onPress={() => {
            // Add functionality for additional button
          }}
        >
          <Text style={styles.buttonText}>Medium Button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flyingButton, styles.largeButton]}
          onPress={() => {
            // Add functionality for additional button
          }}
        >
          <Text style={styles.buttonText}>Large Button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flyingButton, styles.halfWidthButton]}
          onPress={() => {
            // Add functionality for additional button
          }}
        >
          <Text style={styles.buttonText}>Half Width Button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.flyingButton, styles.fullWidthButton]}
          onPress={() => {
            // Add functionality for additional button
          }}
        >
          <Text style={styles.buttonText}>Full Width Button</Text>
        </TouchableOpacity>
      </View>
      {isBannerVisible && (
        <View style={styles.bannerContainer}>
          <TextAnimation animatedValue={animatedValueForBanner} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleBanner}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      {isCameraOpen && <MyCam />}
      {isGpsOn && <Gps />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  flyingButtons: {
    position: "absolute",
    top: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  flyingButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 5,
    width: 100,
    height: 100,
    elevation: 3,
  },
  buttonText: {
    textAlign: "center",
  },
  bigButton: {
    backgroundColor: "blue",
  },
  smallButton: {
    backgroundColor: "green",
  },
  mediumButton: {
    backgroundColor: "orange",
    width: 120,
    height: 120,
  },
  largeButton: {
    backgroundColor: "purple",
    width: 150,
    height: 150,
  },
  halfWidthButton: {
    backgroundColor: "pink",
    width: "50%",
  },
  fullWidthButton: {
    backgroundColor: "red",
    width: "100%",
  },
  bannerContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 4,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default List;

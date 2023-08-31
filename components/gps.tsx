import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, BackHandler } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Clipboard from 'expo-clipboard';
import * as Location from "expo-location";
import { PermissionsAndroid } from 'react-native';

export default function UserLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isClipboardReady, setIsClipboardReady] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== PermissionsAndroid.RESULTS.GRANTED) {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setIsClipboardReady(true);
      } catch (error) {
        setErrorMsg("Error fetching location");
      }
    })();

    // Listener do obsługi przycisku "Exit"
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });

    return () => backHandler.remove(); // Usunięcie listenera przy wyjściu z komponentu
  }, []);

  const copyToClipBoard = () => {
    if (isClipboardReady && location) {
      const copyText = `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`;
      try {
        Clipboard.setString(copyText);
        alert(`\nText copied to clipboard: ${copyText}`);
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your location!"
            description="You are here!"
          />
        </MapView>
      ) : null}
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={copyToClipBoard}>
          <Text style={styles.overlaytext}>
            Lat: {location.coords.latitude}
          </Text>
          <Text style={styles.overlaytext}>
            Lng: {location.coords.longitude}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          <Text style={styles.exitButton}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 5,
  },
  overlaytext: {
    color: "#fff",
    fontSize: 14,
  },
  exitButton: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome } from "@expo/vector-icons";




export default function App() {
  let cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >();
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const [showCamera, setShowCamera] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current?.takePictureAsync(options);
    if (newPhoto) {
      setPhoto(newPhoto);
      setShowCamera(false);
    }
  };

  let resetCamera = () => {
    setShowCamera(true);
    setPhoto(undefined);
  };

  function toggleCameraType(): void {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  if (showCamera) {
    const camerStyle = { 
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").width * (3 / 4),
      flex: 1,
    };
    return (
      <Camera style={camerStyle} ref={cameraRef} type={type}> 
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleCameraType}>
            <FontAwesome name="refresh" size={50} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePic}>
            <FontAwesome name="camera" size={50} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCamera(false)}> 
            <FontAwesome name="times-circle" size={50} color="black" />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </Camera>
    );
  }

  if (photo) {

    const cameraWidth = Dimensions.get("window").width;
    const cameraHeight = Dimensions.get("window").width * (3/4);

    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        resetCamera();
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        resetCamera();
      });
    };
 
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={{ width: cameraWidth, height: cameraHeight, flex: 1 }}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          resizeMode="cover"
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={sharePic}>
          <FontAwesome name="share" size={40} color="black" />
        </TouchableOpacity>
        {hasMediaLibraryPermission ? (
          <TouchableOpacity onPress={savePhoto}>
            <FontAwesome name="save" size={40} color="black" />
          </TouchableOpacity>
        ) : undefined}
        <TouchableOpacity onPress={resetCamera}>
          <FontAwesome name="undo" size={40} color="black" />
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
    padding: 2,
  },
  preview: {
    flex: 1,
    resizeMode: "cover",
  },
});

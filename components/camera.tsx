import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

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
    console.log(type);
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
    return (
      <Camera style={styles.container} ref={cameraRef} type={type}>
        <View style={styles.buttonContainer}>
          <Button title="Take Pic" onPress={takePic} />
          <Button title="Flip Camera" onPress={toggleCameraType} />
        </View>
        <StatusBar style="auto" />
      </Camera>
    );
  }

  if (photo) {
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
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Retake" onPress={resetCamera} />
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
    justifyContent: "flex-end",
    alignItems: "stretch",
    marginBottom: 10,
    padding: 2,
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

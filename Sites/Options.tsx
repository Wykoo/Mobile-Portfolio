import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import ikon z biblioteki Expo
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const Options = () => {
  const [profileImage, setProfileImage] = useState(require("../photos/beta.jpg"));
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(true); 


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setProfileImage({ uri: pickerResult.assets[0].uri });
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
  };
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={pickImage}
        >
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.infoHeader}>Information:</Text>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              onChangeText={(text) => setSurname(text)}
              value={surname}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Zapisz</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <Text style={styles.displayText}>
              Name: {name}
            </Text>
            <Text style={styles.displayText}>
              Surname: {surname}
            </Text>
            <Text style={styles.displayText}>
              Phone Number: {phoneNumber}
            </Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.buttonText}>Edytuj</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.buttonsContainer}>
      <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => FIREBASE_AUTH.signOut()}
          >
            <AntDesign name="logout" size={30} color="black" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoHeader: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 205,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  displayText: {
    fontSize: 17,
    marginVertical: 3,
    textAlign: "left"
  },
  editButton: {
    marginVertical: 10,
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  iconButton: {
    marginHorizontal: 20,
  },
  roundButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
    borderRadius: 50,
    padding: 10,
  },
  bottomButtonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: 200,
  },
});

export default Options;

import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Avatar } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Auth from "./components/authentification";
import { User, onAuthStateChanged } from "firebase/auth";
import Inside from "./Sites/Inside";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user:", user);
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView>
          <View style={appstyles.container}>
            <StatusBar style="auto" />
            <Avatar.Text label="APP" />
            <NavigationContainer>
              {user ? <Inside /> : <Auth />}
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const appstyles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
});

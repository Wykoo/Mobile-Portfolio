import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Auth from "./components/authentification";
import { User, onAuthStateChanged } from "firebase/auth";
import Inside from "./Sites/Inside";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

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
            <View style={appstyles.headerContainer}>
            {!user && (
                <View style={appstyles.iconContainer}>
                  <Icon name="rocket" size={70} color="blue" />
                </View>       
              )}
            </View>
            <NavigationContainer>
              {user ? <Inside /> : <Auth />}
            </NavigationContainer>
          </View>
          {!user && (
            <View style={appstyles.bottomText}>
              <Text style={appstyles.footerText}>Mateusz Wykowski</Text>
            </View>
          )}
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const appstyles = StyleSheet.create({
  container: {
    backgroundColor: "#D0B1ED",
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    paddingTop: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  iconContainer: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
  },
  bottomText: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#D0B1ED",
    paddingVertical: 15,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'serif',
  },
});

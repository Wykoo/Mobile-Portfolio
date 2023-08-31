import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Button, Text, ActivityIndicator, TextInput } from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = FIREBASE_AUTH;

  const SignIn = async () => {
    setLoading(true);
    setError(""); // Clear any previous errors
    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password.");
      }
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    setError(""); // Clear any previous errors
    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password.");
      }

      const response = await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign Up Correctly!");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator animating={true} color="#0000ff" size="large" />
        ) : (
          <>
            <Button title="Login" onPress={SignIn} color="#8e388e" />
            <View style={styles.buttonSpacer} />
            <Button title="Create Account" onPress={signUp} color="#8e388e" />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginVertical: 7,
    height: 57, // Increased height for better visibility
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 9,
    backgroundColor: "#9b869b",
  },
  errorText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
  buttonSpacer: {
    height: 8, // Added space between buttons
  },
  button: {
    color: "cyan",
    fontFamily: 'serif'
  }
});

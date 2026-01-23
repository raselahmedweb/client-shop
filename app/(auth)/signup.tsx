import React from "react";

import Button from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useCreateUserMutation } from "@/redux/api/baseApi";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Media
const bubble2 = require("@/assets/bubble/bubble2.png");
const bubble3 = require("@/assets/bubble/bubble3.png");

export default function Signup() {
  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);

  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [phone, onChangePhone] = React.useState("");

  const [createAccount] = useCreateUserMutation();

  const onSubmit = () => {
    createAccount({ name, email, password, phone }).then((response) => {
      console.log("Response from createAccount:", response);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decorative Background Bubbles */}
      <Image source={bubble2} style={styles.bubble2} />
      <Image source={bubble3} style={styles.bubble3} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Create</Text>
          <Text style={styles.title}>Account</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={{ marginBottom: 20, ...styles.input }}
            onChangeText={onChangeName}
            value={name}
            placeholder="Write your Name"
          />
          <TextInput
            style={{ marginBottom: 20, ...styles.input }}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Write your Email"
          />
          <TextInput
            style={{ marginBottom: 20, ...styles.input }}
            onChangeText={onChangePhone}
            value={phone}
            placeholder="Write your Phone"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Write your Password"
          />
        </View>

        <View style={styles.actions}>
          <Button
            press={onSubmit}
            txt="Login"
            bg={theme.primary}
            color="#fff"
          />
          <Link href="/login" style={styles.cancelLink}>
            Already have an account? Log in
          </Link>
        </View>

        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyle(colorScheme: string) {
  const theme = Colors[colorScheme as "light" | "dark"];
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingBottom: 40,
      backgroundColor: theme.background,
    },
    headingContainer: {
      width: "100%",
      marginBottom: 40,
      zIndex: 3,
    },
    title: {
      fontSize: 42,
      fontFamily: "Raleway_800ExtraBold",
      color: theme.text,
    },
    subtitle: {
      fontSize: 20,
      fontFamily: "Raleway_500Medium",
      color: "gray",
      marginTop: 8,
    },
    form: {
      width: "100%",
      marginBottom: 30,
      zIndex: 3,
    },
    actions: {
      width: "100%",
      alignItems: "center",
      gap: 20,
      zIndex: 3,
    },
    cancelLink: {
      fontSize: 18,
      fontFamily: "Raleway_500Medium",
      color: "gray",
    },
    bubble1: {
      position: "absolute",
      top: -10,
      left: -10,
      zIndex: 2,
    },
    bubble2: {
      position: "absolute",
      top: -10,
      left: -10,
      zIndex: 1,
    },
    bubble3: {
      position: "absolute",
      top: 200,
      right: -10,
      zIndex: 1,
    },
    bubble4: {
      position: "absolute",
      bottom: -10,
      right: -10,
      zIndex: 1,
    },
    input: {
      height: 50,
      borderColor: "gray",
      backgroundColor: "#f0efef",
      paddingHorizontal: 10,
      borderRadius: 10,
    },
  });
}

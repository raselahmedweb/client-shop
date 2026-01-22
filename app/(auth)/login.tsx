import React, { useContext } from "react";

import Button from "@/components/ui/Button";
import { ThemeContext } from "@/context/ThemeProvider";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Media
const bubble1 = require("@/assets/bubble/bubble1.png");
const bubble2 = require("@/assets/bubble/bubble2.png");
const bubble3 = require("@/assets/bubble/bubble3.png");
const bubble4 = require("@/assets/bubble/bubble4.png");

export default function Login() {
  const { theme, colorScheme } = useContext(ThemeContext);
  const styles = createStyle(theme, colorScheme);

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const onSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decorative Background Bubbles */}
      <View style={styles.background}>
        <Image source={bubble2} style={styles.bubble2} />
        <Image source={bubble1} style={styles.bubble1} />
        <Image source={bubble3} style={styles.bubble3} />
        <Image source={bubble4} style={styles.bubble4} />
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Good to see you back</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={{ marginBottom: 10, ...styles.input }}
            onChangeText={onChangeEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
          />
        </View>

        <View style={styles.actions}>
          <Button
            press={onSubmit}
            txt="Login"
            bg={theme.primary}
            color="#fff"
          />
          <Link href="/signup" style={styles.cancelLink}>
            Go signup page
          </Link>
        </View>

        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyle(theme, colorScheme) {
  return StyleSheet.create({
    background: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0,
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingBottom: 40,
      zIndex: 1,
      position: "relative",
    },

    headingContainer: {
      width: "100%",
      marginBottom: 40,
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
    },
    input: {
      height: 40,
      borderColor: "gray",
      backgroundColor: "#f0efef",
      paddingHorizontal: 10,
      borderRadius: 50,
    },
    actions: {
      width: "100%",
      alignItems: "center",
      gap: 20,
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
      zIndex: 0,
    },
    bubble2: {
      position: "absolute",
      top: -10,
      left: -10,
      zIndex: 0,
    },
    bubble3: {
      position: "absolute",
      top: 200,
      right: -10,
      zIndex: 0,
    },
    bubble4: {
      position: "absolute",
      bottom: -10,
      right: -10,
      zIndex: 0,
    },
  });
}

import React, { useEffect } from "react";

import Button from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useCreateUserMutation } from "@/redux/api/baseApi";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
// Media
const bubble2 = require("@/assets/bubble/bubble2.png");
const bubble3 = require("@/assets/bubble/bubble3.png");

export default function Signup() {
  const { isLoading, isAuthorized } = useAuthGuard();
  useEffect(() => {
    if (!isLoading && isAuthorized) {
      router.replace("/profile");
    }
  }, [isLoading, isAuthorized]);
  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);

  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [phone, onChangePhone] = React.useState("");
  const [viewPassword, setViewPassword] = React.useState(false);

  const [createAccount, { data, isSuccess, isError }] = useCreateUserMutation();

  const onSubmit = () => {
    createAccount({ name, email, password, phone })
      .then((res) => {
        if (res.error) {
          const errorMessage =
            (res.error as any)?.data?.message ||
            "Failed to create account. Please try again.";
          Toast.error(errorMessage);
        } else {
          Toast.success(
            "Account created successfully! Please verify your email.",
          );
          onChangeName("");
          onChangeEmail("");
          onChangePassword("");
          onChangePhone("");
        }
      })
      .catch((err) => {
        Toast.error("An unexpected error occurred. Please try again.");
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TextInput
              style={[{ width: "100%" }, styles.input]}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Your password"
              secureTextEntry={viewPassword ? false : true}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setViewPassword(!viewPassword)}
            >
              {!viewPassword ? (
                <AntDesign name="eye" size={24} color="black" />
              ) : (
                <AntDesign name="eye-invisible" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
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
      paddingHorizontal: 10,
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
    eyeButton: {
      position: "absolute",
      right: 10,
      padding: 5,
    },
  });
}

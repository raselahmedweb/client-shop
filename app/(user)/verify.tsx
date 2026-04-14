import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";

import Button from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useVerifyOtpMutation } from "@/redux/api/baseApi";
import { router, useLocalSearchParams } from "expo-router";
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
const bubble1 = require("@/assets/bubble/bubble1.png");
const bubble2 = require("@/assets/bubble/bubble2.png");
const bubble3 = require("@/assets/bubble/bubble3.png");
const bubble4 = require("@/assets/bubble/bubble4.png");

export default function OtpVerification() {
  const { email } = useLocalSearchParams();
  const { isLoading, isAuthorized } = useAuthGuard();
  useEffect(() => {
    if (!isLoading && isAuthorized) {
      router.replace("/profile");
    }
  }, [isLoading, isAuthorized]);
  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);

  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();

  const [otp, onChangeOtp] = React.useState("");

  if (isLoading) return null;

  const onSubmit = async () => {
    const res = await verifyOtp({ otp, email }).unwrap();
    console.log("Error data", res.data.message);
    if (Platform.OS !== "web") {
      await SecureStore.setItemAsync("accessToken", res.data.accessToken);
      await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);
    }
    onChangeOtp("");
    window.location.reload();
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
          <Text style={styles.title}>OTP verification</Text>
          <Text style={styles.subtitle}>
            Please enter your OTP sent to your registered email to complete
            account creation
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={{ marginBottom: 20, ...styles.input }}
            onChangeText={onChangeOtp}
            value={otp}
            placeholder="Your OTP"
          />
        </View>

        <View style={styles.actions}>
          <Button
            press={onSubmit}
            txt={isVerifyOtpLoading ? "Verifying..." : "Verify OTP"}
            bg={theme.primary}
            color="#fff"
          />
        </View>

        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyle(colorScheme: string) {
  const theme = Colors[colorScheme as "light" | "dark"];
  return StyleSheet.create({
    background: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0,
    },
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

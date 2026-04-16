import * as SecureStore from "expo-secure-store";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toast } from "toastify-react-native";

import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/api/baseApi";

export default function OtpVerification() {
  const { email } = useLocalSearchParams();
  const { isLoading, isAuthorized } = useAuthGuard();

  const { theme } = useTheme();
  const styles = createStyle(theme);

  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
  const [resendOtp] = useSendOtpMutation();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  // resend timer
  const [seconds, setSeconds] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  useEffect(() => {
    if (!isLoading && isAuthorized) {
      router.replace("/profile");
    }
  }, [isLoading, isAuthorized]);

  if (isLoading) return null;

  // handle OTP input
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      Toast.error("Enter full OTP");
      return;
    }

    try {
      const res = await verifyOtp({
        otp: finalOtp,
        email,
      }).unwrap();

      await SecureStore.setItemAsync("accessToken", res.accessToken);
      await SecureStore.setItemAsync("refreshToken", res.refreshToken);

      Toast.success("Verified successfully!");
      router.replace("/profile");
    } catch (err: any) {
      const msg = err?.data?.message || "Verification failed";

      Toast.error(msg);

      // OTP expired case
      if (err?.data?.err?.statusCode === 410) {
        setSeconds(120);
      }
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      await resendOtp({ email }).unwrap();

      Toast.success("OTP resent successfully!");
      setSeconds(120);
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } catch (err: any) {
      Toast.error(err?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to {email}
      </Text>

      {/* OTP Boxes */}
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref!;
            }}
            value={digit}
            onChangeText={(v) => handleChange(v, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpBox}
          />
        ))}
      </View>

      <Button
        press={onSubmit}
        txt={verifying ? "Verifying..." : "Verify OTP"}
        bg={theme.primary}
        color="#fff"
      />

      {/* Resend */}
      <Pressable onPress={handleResend} disabled={seconds > 0 || resending}>
        <Text
          style={[
            styles.resend,
            (seconds > 0 || resending) && { opacity: 0.5 },
          ]}
        >
          {seconds > 0
            ? `Resend OTP (${seconds}s)`
            : resending
              ? "Sending..."
              : "Resend OTP"}
        </Text>
      </Pressable>

      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

function createStyle(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      marginBottom: 6,
    },
    subtitle: {
      color: "gray",
      marginBottom: 30,
    },
    otpRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    otpBox: {
      width: 45,
      height: 55,
      borderWidth: 1,
      borderColor: "#ccc",
      textAlign: "center",
      fontSize: 20,
      borderRadius: 10,
      backgroundColor: "#f5f5f5",
    },
    resend: {
      marginTop: 20,
      textAlign: "center",
      color: theme.primary,
      fontWeight: "600",
    },
  });
}

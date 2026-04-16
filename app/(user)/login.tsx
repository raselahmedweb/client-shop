import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

import Button from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useLoginUserMutation } from "@/redux/api/baseApi";

export default function Login() {
  const { isLoading, isAuthorized } = useAuthGuard();

  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);

  const [login, { isLoading: loggingIn }] = useLoginUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthorized) {
      router.replace("/profile");
    }
  }, [isLoading, isAuthorized]);

  if (isLoading) return null;

  // ✅ validation
  const validate = () => {
    if (!email || !password) {
      Toast.error("Email and password required");
      return false;
    }
    if (!email.includes("@")) {
      Toast.error("Invalid email");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await login({ email, password }).unwrap();
      await SecureStore.setItemAsync("accessToken", res.data.accessToken);
      await SecureStore.setItemAsync("refreshToken", res.data.refreshToken);

      Toast.success("Welcome back!");

      setEmail("");
      setPassword("");

      router.replace("/(tabs)/profile");
    } catch (err: any) {
      Toast.error(err?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue 🚀</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Password */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <AntDesign
                  name={showPassword ? "eye-invisible" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              press={onSubmit}
              txt={loggingIn ? "Logging in..." : "Login"}
              bg={theme.primary}
              color="#fff"
            />

            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.linkText}>
                Don’t have an account?{" "}
                <Text style={{ color: theme.primary }}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <StatusBar style="dark" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 🔹 Reusable Input
const Input = ({ ...props }: any) => (
  <View style={inputStyles.wrapper}>
    <TextInput style={inputStyles.input} {...props} />
  </View>
);

const inputStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#dddcdc",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 55,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
  },
});

// 🎨 Styles
function createStyle(colorScheme: string) {
  const theme = Colors[colorScheme as "light" | "dark"];
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    header: {
      marginBottom: 30,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: theme.text,
    },
    subtitle: {
      color: "gray",
      marginTop: 5,
    },
    form: {
      gap: 15,
      marginBottom: 30,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#dddcdc",
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 55,
    },
    input: {
      flex: 1,
      fontSize: 16,
    },
    actions: {
      gap: 20,
      alignItems: "center",
    },
    linkText: {
      color: "gray",
    },
  });
}

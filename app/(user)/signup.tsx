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
import { useCreateUserMutation } from "@/redux/api/baseApi";

export default function Signup() {
  const { isLoading, isAuthorized } = useAuthGuard();

  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);

  const [createAccount, { isLoading: creating }] = useCreateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthorized) {
      router.replace("/profile");
    }
  }, [isLoading, isAuthorized]);

  if (isLoading) return null;

  // 🔐 simple validation
  const validate = () => {
    if (!name || !email || !phone || !password) {
      Toast.error("All fields are required");
      return false;
    }
    if (!email.includes("@")) {
      Toast.error("Invalid email");
      return false;
    }
    if (password.length < 6) {
      Toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      await createAccount({
        name,
        email,
        phone,
        password,
      }).unwrap();

      Toast.success("Account created! Verify your email");

      router.push(`/verify?email=${encodeURIComponent(email)}`);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (err: any) {
      Toast.error(err?.data?.message || "Failed to create account");
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us and start your journey 🚀
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />

            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
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
              txt={creating ? "Creating..." : "Create Account"}
              bg={theme.primary}
              color="#fff"
            />

            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={{ color: theme.primary }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <StatusBar style="dark" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 🔹 Reusable Input Component
const Input = ({ ...props }: any) => {
  return (
    <View style={inputStyles.wrapper}>
      <TextInput style={inputStyles.input} {...props} />
    </View>
  );
};

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
    },
    header: {
      marginBottom: 30,
    },
    title: {
      fontSize: 34,
      fontWeight: "800",
      color: theme.text,
    },
    subtitle: {
      fontSize: 16,
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
    loginText: {
      fontSize: 14,
      color: "gray",
    },
  });
}

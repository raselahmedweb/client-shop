import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useGetMeQuery } from "@/redux/api/baseApi";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Media
const bubble1 = require("@/assets/bubble/bubble1.png");
const bubble2 = require("@/assets/bubble/bubble2.png");
const bubble3 = require("@/assets/bubble/bubble3.png");
const bubble4 = require("@/assets/bubble/bubble4.png");

export default function FlashSellProducts() {
  const { theme, colorScheme } = useTheme();
  const { data, isLoading } = useGetMeQuery({});

  const role = data?.data?.role;
  const isAuthorized = role === "ADMIN" || role === "CUSTOMER";

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.replace("/login");
    }
  }, [isLoading, isAuthorized]);

  if (isLoading) return null;
  const styles = createStyle(colorScheme);
  const goHome = () => {
    router.push("/profile");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decorative Background Bubbles */}
      <Image source={bubble2} style={styles.bubble2} />
      <Image source={bubble1} style={styles.bubble1} />
      <Image source={bubble3} style={styles.bubble3} />
      <Image source={bubble4} style={styles.bubble4} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Good to see you back</Text>
        </View>

        <View style={styles.form}>
          <Input
            style={{}}
            key={1}
            placeholder="Your email"
            value=""
            onChangeText={(e: any) => console.log(e)}
          />
        </View>

        <View style={styles.actions}>
          <Button press={goHome} txt="Next" bg={theme.primary} color="#fff" />
          <Link href="/" style={styles.cancelLink}>
            Cancel
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
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "android" ? 20 : 0,
      backgroundColor: theme.background,
      gap: 20,
      overflow: "visible",
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
  });
}

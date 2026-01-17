
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ThemeContext } from "@/context/ThemeProvider";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
// Media
const bubble2 =require("@/assets/bubble/bubble2.png");
const bubble3 =require("@/assets/bubble/bubble3.png");

export default function Signup() {
  const { theme, colorScheme } = useContext(ThemeContext);
  const styles = createStyle(theme, colorScheme);

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
          <Input placeholder="Full Name" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Phone number" />
        </View>

        <View style={styles.actions}>
          <Button txt="Next" bg={theme.primary} color="#fff" />
          <Link href="/" style={styles.cancelLink}>Cancel</Link>
        </View>

        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyle(theme, colorScheme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: "center",
      paddingHorizontal: 24,
      paddingBottom: 40,
      backgroundColor: theme.bg,
    },
    headingContainer: {
      width: "100%",
      marginBottom: 40,
      zIndex: 3
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
      zIndex: 3
    },
    actions: {
      width: "100%",
      alignItems: "center",
      gap: 20,
      zIndex: 3
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

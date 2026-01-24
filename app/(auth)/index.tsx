import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isLoading, isAuthorized } = useAuthGuard();
  useEffect(() => {
    if (!isLoading && isAuthorized) {
      router.replace("/profile");
    }
  }, [isLoading, isAuthorized]);
  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ color: theme.text }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const goSignUp = () => {
    router.push("/signup");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.introwrapper}>
          <View style={styles.logo}>
            <Icon name="shopify" size={100} color={theme.primary} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>Shoppe</Text>
            <Text style={styles.desc}>
              Beautiful eCommerce UI Kit for your online store
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Button
            txt="Lets get started"
            press={goSignUp}
            bg={theme.primary}
            color="#fff"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Link
              href="/login"
              style={{
                color: "gray",
                fontSize: 20,
                fontFamily: "Raleway_500Medium",
                textAlign: "center",
                lineHeight: 35,
              }}
            >
              I already have an account
            </Link>
            <Link href="/login">
              <Icon name="arrow-right-alt" size={30} color={theme.primary} />
            </Link>
          </View>
        </View>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </View>
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
    introwrapper: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      flex: 1,
    },
    logo: {
      backgroundColor: "#f4f4f4",
      width: 150,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "100%",
    },
    textWrapper: {
      width: 250,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    },
    actions: {
      width: "100%",
      alignItems: "center",
      gap: 20,
      zIndex: 3,
    },
    text: {
      color: theme.text,
      fontSize: 18,
    },
    heading: {
      color: theme.text,
      fontSize: 40,
      fontWeight: "bold",
      fontFamily: "Raleway_800ExtraBold",
    },
    desc: {
      color: "gray",
      fontSize: 20,
      fontFamily: "Raleway_500Medium",
      textAlign: "center",
      lineHeight: 35,
    },
  });
}

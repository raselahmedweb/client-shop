import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/IconSymbol";
import { ThemeContext } from "@/context/ThemeProvider";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const { theme, colorScheme } = useContext(ThemeContext);
  const styles = createStyle(theme, colorScheme);
  const goSignUp = () => {
    router.push("/signup");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={styles.container}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#f4f4f4",
              width: 150,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
            }}
          >
            <Icon name="shopify" size={100} color={theme.primary} />
          </View>
          <View
            style={{
              width: 250,
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 40,
                fontWeight: "bold",
                fontFamily: "Raleway_800ExtraBold",
              }}
            >
              Shoppe
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 20,
                fontFamily: "Raleway_500Medium",
                textAlign: "center",
                lineHeight: 35,
              }}
            >
              Beautiful eCommerce UI Kit for your online store
            </Text>
          </View>
        </View>
        <View
          style={styles.actions}
        >
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

function createStyle(theme, colorScheme) {
  return StyleSheet.create({
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
      backgroundColor: theme.bg,
    },
       actions: {
      width: "100%",
      alignItems: "center",
      gap: 20,
      zIndex: 3
    },
    text: {
      color: theme.text,
      fontSize: 18,
    },
  });
}

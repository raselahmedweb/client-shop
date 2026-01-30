import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { colorScheme } = useTheme();

  const { isLoading, isAuthorized } = useAuthGuard();
  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.replace("/login");
    }
  }, [isLoading, isAuthorized]);
  if (isLoading) return null;

  const styles = createStyle(colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "Raleway_700Bold",
              }}
            >
              Your Settings
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyle(colorScheme: string) {
  const theme = Colors[colorScheme as "light" | "dark"];
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
      position: "relative",
    },
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 10,
      // paddingTop: Platform.OS === "android" ? 20 : 0,
      backgroundColor: theme.background,
      gap: 20,
      overflow: "visible",
    },
  });
}

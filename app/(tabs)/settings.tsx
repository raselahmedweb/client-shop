import ConfirmModal from "@/components/ConfirmationModal";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useLogoutMutation } from "@/redux/api/baseApi";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { colorScheme } = useTheme();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();

      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      setLogoutModalVisible(false);
      window.location.reload();
    } catch (error) {
      console.log("Logout failed", error);
    }
    setLogoutModalVisible(false);
  };

  const styles = createStyle(colorScheme);
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center", // 👈 center everything
              width: "100%",
              position: "relative",
            }}
          >
            {/* Back button (absolute) */}
            <Link
              href="/(tabs)/profile"
              style={{
                position: "absolute",
                left: 0,
                padding: 5,
              }}
            >
              <AntDesign name="arrow-left" size={24} color="black" />
            </Link>

            {/* Center title */}
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Raleway_600Medium",
              }}
            >
              Settings
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Raleway_700Bold",
                color: "#fff",
                backgroundColor: "#ff4d4f",
                padding: 10,
                borderRadius: 5,
                width: "100%",
                textAlign: "center",
              }}
            >
              Sign out
            </Text>
          </TouchableOpacity>
          <ConfirmModal
            visible={logoutModalVisible}
            title="Logout"
            message="Do you really want to logout?"
            confirmText="Logout"
            confirmColor="#ff4d4f"
            onCancel={() => setLogoutModalVisible(false)}
            onConfirm={handleLogout}
          />
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
      backgroundColor: theme.background,
      gap: 20,
      overflow: "visible",
    },
  });
}

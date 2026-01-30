import CreateCategory from "@/components/admin-action/CreateCategory";
import CategoryAll from "@/components/CategoryAll";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const { theme, colorScheme } = useTheme();
  const [openCategory, setOpenCategory] = useState(false);
  const { isLoading, isAuthorized, role } = useAuthGuard();
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
        {/* Only if user is admin this create category button will be visible */}
        {role === "ADMIN" && (
          <Pressable onPress={() => setOpenCategory(!openCategory)}>
            <Text
              style={{
                color: theme.primary,
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              {openCategory ? "Cancel" : "Open Create Category"}
            </Text>
          </Pressable>
        )}
        {openCategory && <CreateCategory />}
        {!openCategory && <CategoryAll theme={theme} isCategory={true} />}
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
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 10,
      backgroundColor: theme.background,
      overflow: "visible",
    },
  });
}

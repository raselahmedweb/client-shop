import CategoryAll from "@/components/CategoryAll";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";

import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <CategoryAll theme={theme} isCategory={true} />
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

import CategoryAll from "@/components/CategoryAll";
import { Icon } from "@/components/ui/IconSymbol";
import { ThemeContext } from "@/context/ThemeProvider";
import { ITheme } from "@/type/type";
import { useContext } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Category() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  const { theme, colorScheme } = themeContext;

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
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
              Shop
            </Text>
          </View>
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              marginTop: 5,
            }}
          >
            <View style={{ width: "100%" }}>
              <TextInput
                placeholder="Search"
                placeholderTextColor="gray"
                style={{
                  height: 40,
                  backgroundColor: "#f8f8f8",
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  borderRadius: 100,
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                top: 8,
                right: 10,
              }}
            >
              <Icon name="camera-alt" size={24} color={theme.primary} />
            </View>
          </View>
        </View>
        <CategoryAll theme={theme} isCategory={true} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyle(theme: ITheme, colorScheme: string) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    container: {
      // flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "android" ? 20 : 0,
      backgroundColor: theme.bg,
      overflow: "visible",
    },
  });
}

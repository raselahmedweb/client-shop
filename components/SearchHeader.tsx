import { useTheme } from "@/context/ThemeProvider";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Install this!
import { Icon } from "./ui/IconSymbol";

export default function SearchHeader() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchProduct, changeSearchProduct] = React.useState("");

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: "#fff" },
      ]}
    >
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          onChangeText={changeSearchProduct}
          value={searchProduct}
          style={styles.input}
          // Important: trigger search on keyboard "Enter"
          onSubmitEditing={() => router.push(`/shop?query=${searchProduct}`)}
        />
        {searchProduct && (
          <Pressable
            onPress={() => router.push(`/shop?query=${searchProduct}`)}
            style={styles.iconButton}
          >
            <Icon name="search" size={20} color={theme.primary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 0,
    height: 50,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  iconButton: {
    padding: 5,
  },
});

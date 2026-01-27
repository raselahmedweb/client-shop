import React, { useEffect } from "react";

import Button from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useCreateCategoryMutation } from "@/redux/api/baseApi";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateCategory() {
  const { isLoading, isAuthorized, role } = useAuthGuard();
  useEffect(() => {
    if (!isLoading && !isAuthorized && role !== "ADMIN") {
      router.replace("/login");
    }
  }, [isLoading, isAuthorized, role]);
  const { theme, colorScheme } = useTheme();
  const styles = createStyle(colorScheme);

  const [name, onChangeName] = React.useState("");
  const [slug, onChangeSlug] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [imageUrl, onChangeImageUrl] = React.useState([""]);
  const handleTextChange = (text: string) => {
    const arrayValues = text.split(",").map((item) => item.trim());
    onChangeImageUrl(arrayValues);
  };
  const [createCategory, { isLoading: isLoadingCreateCategory }] =
    useCreateCategoryMutation();

  const onSubmit = () => {
    createCategory({ name, slug, description, imageUrl }).then((response) => {
      if (response?.data?.success) {
        alert(response?.data?.message);
        onChangeDescription("");
        onChangeName("");
        onChangeSlug("");
        onChangeImageUrl([""]);
      } else {
        alert(response?.data?.message || "Error creating category");
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.title}>Create Category</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={{ marginBottom: 20, ...styles.input }}
          onChangeText={onChangeName}
          value={name}
          placeholder="Write category Name"
        />
        <TextInput
          style={{ marginBottom: 20, ...styles.input }}
          onChangeText={onChangeSlug}
          value={slug}
          placeholder="Write your Slug"
        />
        <TextInput
          style={{ marginBottom: 20, ...styles.input }}
          onChangeText={onChangeDescription}
          value={description}
          placeholder="Write your Description"
        />
        <TextInput
          style={styles.input}
          value={imageUrl.join(", ")}
          onChangeText={handleTextChange}
          placeholder="url1, url2, url3, url4"
          placeholderTextColor="gray"
          multiline={true}
        />
      </View>

      <View style={styles.actions}>
        <Button
          press={onSubmit}
          txt={isLoadingCreateCategory ? "Creating..." : "Create"}
          bg={theme.primary}
          color="#fff"
        />
      </View>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </KeyboardAvoidingView>
  );
}

function createStyle(colorScheme: string) {
  const theme = Colors[colorScheme as "light" | "dark"];
  return StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    headingContainer: {
      width: "100%",
      marginBottom: 5,
    },
    title: {
      fontSize: 20,
      fontFamily: "Raleway_800ExtraBold",
      color: theme.text,
      marginBottom: 8,
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
    input: {
      height: 50,
      borderColor: "gray",
      backgroundColor: "#f0efef",
      paddingHorizontal: 10,
      borderRadius: 10,
    },
  });
}

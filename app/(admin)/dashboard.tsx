// app/admin/AdminDashboard.tsx
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import {
  useCreateCategoryMutation,
  useCreateProductMutation,
  useCreateSubCategoriesMutation,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/redux/api/baseApi";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tab = "overview" | "category" | "subcategory" | "product";

export default function AdminDashboard() {
  const { isLoading: authLoading, isAuthorized, role } = useAuthGuard();

  React.useEffect(() => {
    if (!authLoading && (!isAuthorized || role !== "ADMIN")) {
      router.replace("/login");
    }
  }, [authLoading, isAuthorized, role]);

  const { theme, colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // ── Stats ───────────────────────────────────────────────
  //   const { data: stats, isLoading: statsLoading } = useGetStatsQuery(); // you'll need to create this endpoint

  const { data: categoriesData } = useGetCategoriesQuery(
    {},
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );
  const categories = categoriesData?.data || [];

  const { data: subCategoriesData } = useGetSubCategoriesQuery(
    {},
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );
  const subCategories = subCategoriesData?.data || [];

  // ── Category Form ───────────────────────────────────────
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catImages, setCatImages] = useState<string[]>([""]);

  const [createCategory, { isLoading: creatingCat }] =
    useCreateCategoryMutation();
  const handleTextChange = (text: string) => {
    const arrayValues = text.split(",").map((item) => item.trim());
    setCatImages(arrayValues);
  };
  const handleCreateCategory = async () => {
    if (!catName.trim() || !catSlug.trim()) {
      Alert.alert("Error", "Name and Slug are required");
      return;
    }

    try {
      const res = await createCategory({
        name: catName.trim(),
        slug: catSlug.trim().toLowerCase().replace(/\s+/g, "-"),
        description: catDesc.trim(),
        imageUrl: catImages.filter(Boolean),
      }).unwrap();

      if (res.success) {
        Alert.alert("Success", res.message || "Category created");
        // reset form
        setCatName("");
        setCatSlug("");
        setCatDesc("");
        setCatImages([""]);
      }
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "Failed to create category");
    }
  };

  // ── Subcategory Form (similar structure) ────────────────
  const [subName, setSubName] = useState("");
  const [subImage, setSubImage] = useState("");

  const [createSubCategory, { isLoading: creatingSub }] =
    useCreateSubCategoriesMutation();

  const handleCreateSubCategory = async () => {
    if (!subName.trim() || !subImage.trim()) {
      Alert.alert("Error", "Name and Image are required");
      return;
    }

    try {
      await createSubCategory({
        name: subName.trim(),
        imageUrl: subImage.trim(),
      }).unwrap();

      Alert.alert("Success", "Subcategory created");
      setSubName("");
      setSubImage("");
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "Failed");
    }
  };

  // ── Product Form (minimal version - can be extended) ─────
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodSalePrice, setProdSalePrice] = useState("");
  const [prodCate, setProdCate] = useState("");
  const [prodSubCate, setProdSubCate] = useState("");
  const [prodVariation, setProdVariation] = useState("");
  const [prodSize, setProdSize] = useState("");
  const [prodBrand, setProdBrand] = useState("");
  const [prodStock, setProdStock] = useState("");
  const [prodImages, setProdImages] = useState<string[]>([""]);

  const [createProduct, { isLoading: creatingProd }] =
    useCreateProductMutation();

  const handleCreateProduct = async () => {
    if (
      !prodName ||
      !prodPrice ||
      !prodSubCate ||
      !prodCate ||
      !prodSize ||
      !prodStock ||
      !prodImages[0]
    ) {
      Alert.alert("Error", "Name, Image and Price are required");
      return;
    }

    try {
      await createProduct({
        name: prodName.trim(),
        description: prodDesc.trim(),
        price: Number(prodPrice),
        salePrice: Number(prodSalePrice) || 0,
        stock: Number(prodStock) || 0,
        images: prodImages.filter(Boolean),
        categoryId: prodCate.trim(),
        subCategoryId: prodSubCate.trim(),
        variations: prodVariation.trim(),
        sizes: prodSize.trim(),
        brand: prodBrand.trim(),
      }).unwrap();

      Alert.alert("Success", "Product created");
      // reset...
      setProdName("");
      setProdDesc("");
      setProdPrice("");
      setProdStock("");
      setProdImages([""]);
      setProdBrand("");
      setProdCate("");
      setProdSubCate("");
      setProdVariation("");
      setProdSize("");
      setProdSalePrice("");
    } catch (err: any) {
      Alert.alert("Error", err?.data?.message || "Failed to create product");
    }
  };

  const renderOverview = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Dashboard Overview</Text>

      <View style={styles.statsGrid}>
        <StatCard icon="people-outline" title="Users" value={"20"} />
        <StatCard icon="cube-outline" title="Products" value={"156"} />
        <StatCard icon="layers-outline" title="Categories" value={"6"} />
        <StatCard icon="cart-outline" title="Orders" value={"30"} />
        <StatCard icon="flash-off" title="Flash Sales" value={"30"} />
        <StatCard icon="cube" title="Products Sold" value={"120"} />
        <StatCard icon="book-outline" title="Story" value={"120"} />
        <StatCard
          icon="megaphone-outline"
          title="Announcements"
          value={"120"}
        />
        <StatCard icon="image-outline" title="Banners" value={"120"} />
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setActiveTab("category")}
          >
            <Ionicons
              name="add-circle-outline"
              size={28}
              color={theme.primary}
            />
            <Text style={styles.actionText}>New Category</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setActiveTab("subcategory")}
          >
            <Ionicons name="layers-outline" size={28} color={theme.primary} />
            <Text style={styles.actionText}>New Subcategory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setActiveTab("product")}
          >
            <Ionicons name="shirt-outline" size={28} color={theme.primary} />
            <Text style={styles.actionText}>New Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          style={{ backgroundColor: theme.bg }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Admin Panel</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabBar}>
            {(["overview", "category", "subcategory", "product"] as Tab[]).map(
              (tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabItem,
                    activeTab === tab && {
                      borderBottomColor: theme.primary,
                      borderBottomWidth: 3,
                    },
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && {
                        color: theme.primary,
                        // fontWeight: "600",
                      },
                    ]}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {activeTab === "overview" && renderOverview()}

            {activeTab === "category" && (
              <FormSection title="Create Category">
                <TextInput
                  style={styles.textInput}
                  value={catName}
                  onChangeText={setCatName}
                  placeholder="Summer Collection"
                />
                <TextInput
                  style={styles.textInput}
                  value={catSlug}
                  onChangeText={setCatSlug}
                  placeholder="summer-collection"
                />
                <TextInput
                  style={styles.textInput}
                  value={catDesc}
                  onChangeText={setCatDesc}
                  placeholder="Short description..."
                  multiline
                />
                <TextInput
                  style={styles.textInput}
                  value={catImages.join(", ")}
                  onChangeText={handleTextChange}
                  placeholder="url1, url2, url3, url4"
                  multiline={true}
                />

                <Button
                  press={handleCreateCategory}
                  txt={creatingCat ? "Creating..." : "Create Category"}
                  bg={theme.primary}
                  color="#fff"
                  disabled={creatingCat}
                />
              </FormSection>
            )}

            {activeTab === "subcategory" && (
              <FormSection title="Create Subcategory">
                <TextInput
                  placeholder="Sub category name"
                  style={styles.textInput}
                  value={subName}
                  onChangeText={setSubName}
                />
                <TextInput
                  placeholder="Sub category image URL"
                  style={styles.textInput}
                  value={subImage}
                  onChangeText={setSubImage}
                />

                <Button
                  press={handleCreateSubCategory}
                  txt={creatingSub ? "Creating..." : "Create Subcategory"}
                  bg={theme.primary}
                  color="#fff"
                />
              </FormSection>
            )}

            {activeTab === "product" && (
              <FormSection title="Create Product">
                <TextInput
                  style={styles.textInput}
                  placeholder="Product Name"
                  value={prodName}
                  onChangeText={setProdName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Price (number)"
                  value={prodPrice}
                  onChangeText={setProdPrice}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Sale Price (number)"
                  value={prodSalePrice}
                  onChangeText={setProdSalePrice}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Stock"
                  value={prodStock}
                  onChangeText={setProdStock}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Description"
                  value={prodDesc}
                  onChangeText={setProdDesc}
                  multiline
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Image URLs (comma separated)"
                  value={prodImages.join(", ")}
                  onChangeText={(t: any) =>
                    setProdImages(t.split(",").map((s: any) => s.trim()))
                  }
                  multiline
                />

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    backgroundColor: theme.card,
                    overflow: "hidden",
                    marginBottom: 14,
                  }}
                >
                  <Picker
                    selectedValue={prodCate}
                    onValueChange={(itemValue) => setProdCate(itemValue)}
                    style={{ color: theme.text }}
                    // itemStyle={{ height: 52 }}
                    dropdownIconColor={theme.text}
                  >
                    <Picker.Item
                      label="Select a category..."
                      value=""
                      color={theme.text}
                    />
                    {categories.map((cat: any) => (
                      <Picker.Item
                        key={cat._id}
                        label={cat.name}
                        value={cat._id}
                        color={theme.text}
                      />
                    ))}
                  </Picker>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    backgroundColor: theme.card,
                    overflow: "hidden",
                    marginBottom: 14,
                  }}
                >
                  <Picker
                    selectedValue={prodSubCate}
                    onValueChange={(itemValue) => setProdSubCate(itemValue)}
                    style={{
                      color: theme.text,
                      backgroundColor: theme.card,
                    }}
                    // itemStyle={{ height: 52 }}
                    dropdownIconColor={theme.text}
                  >
                    <Picker.Item
                      label="Select a sub category..."
                      value=""
                      color={theme.text}
                      style={{ backgroundColor: theme.card }}
                    />
                    {subCategories.map((cat: any) => (
                      <Picker.Item
                        key={cat._id}
                        label={cat.name}
                        value={cat._id}
                        color={theme.text}
                      />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Brand"
                  value={prodBrand}
                  onChangeText={setProdBrand}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Sizes (comma separated)"
                  value={prodSize}
                  onChangeText={setProdSize}
                  multiline
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Variations (comma separated)"
                  value={prodVariation}
                  onChangeText={setProdVariation}
                  multiline
                />
                <Button
                  press={handleCreateProduct}
                  txt={creatingProd ? "Creating..." : "Create Product"}
                  bg={theme.primary}
                  color="#fff"
                />
              </FormSection>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Reusable Components ────────────────────────────────────────

function StatCard({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: number | string;
}) {
  const { theme } = useTheme();
  return (
    <View style={[cardStyles.card, { backgroundColor: theme.card }]}>
      <Ionicons
        name={icon}
        size={28}
        color={theme.primary}
        style={{ marginBottom: 8 }}
      />
      <Text style={[cardStyles.title, { color: theme.text }]}>{title}</Text>

      <Text style={[cardStyles.value, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <View style={formStyles.container}>
      <Text style={[formStyles.sectionTitle, { color: theme.text }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────

const getStyles = (colorScheme: string) => {
  const theme = Colors[colorScheme as "light" | "dark"];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 10,
      //   paddingTop: Platform.OS === "android" ? 20 : 0,
      backgroundColor: theme.background,
      gap: 20,
      overflow: "visible",
    },
    header: {
      //   paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "#ccc",
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
      fontFamily: "Raleway_700Bold", // if you have it
    },
    tabBar: {
      flexDirection: "row",
      backgroundColor: theme.card,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "#ccc",
    },
    tabItem: {
      flex: 1,
      paddingVertical: 14,
      alignItems: "center",
    },
    tabText: {
      fontSize: 15,
      color: theme.text,
      fontWeight: "500",
    },
    scrollContent: {
      paddingVertical: 16,
      paddingBottom: 60,
    },
    statsContainer: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 16,
      marginTop: 8,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 24,
    },
    quickActions: {
      marginTop: 16,
    },
    actionButtons: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    actionBtn: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      flex: 1,
      minWidth: 100,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    actionText: {
      marginTop: 8,
      fontSize: 14,
      color: theme.text,
      textAlign: "center",
    },
    textInput: {
      height: 52,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: 15,
      color: theme.text,
      backgroundColor: theme.card,
      marginBottom: 14,
    },
  });
};

const cardStyles = StyleSheet.create({
  card: {
    // flex: 1,
    minWidth: "45%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
  },
});

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "100%",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
});

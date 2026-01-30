import SubCategory from "@/components/SubCategory";
import { Icon } from "@/components/ui/IconSymbol";
import ProductCard from "@/components/ui/ProductCard";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { useProductsData } from "@/hooks/products-data";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopFull() {
  const { theme, colorScheme } = useTheme();
  const { isLoading, isAuthorized } = useAuthGuard();
  const { data: productsData } = useProductsData();

  const products = productsData?.data || [];
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
        <SubCategory />
        <View style={{ width: "100%", flexDirection: "column" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 26,
                fontFamily: "Raleway_800ExtraBold",
              }}
            >
              All Items
            </Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="filter-alt" color="#000" size={20} />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 15,
              paddingHorizontal: 5,
              overflow: "visible",
            }}
          >
            {products?.length > 0 ? (
              products.map((item: any, index: number) => (
                <ProductCard
                  key={index}
                  w={"47%"}
                  img={item.images[0]}
                  description={item.description}
                  title={item.name}
                  price={item.price}
                  id={item._id}
                />
              ))
            ) : (
              <View
                style={{
                  marginTop: 10,
                  width: "100%",
                  backgroundColor: theme.card,
                  alignItems: "center",
                  paddingVertical: 20,
                }}
              >
                <Text
                  style={{
                    color: Colors[colorScheme].text,
                    fontSize: 18,
                    textAlign: "center",
                    fontFamily: "Raleway_800ExtraBold",
                  }}
                >
                  No Products Found 🤦‍♂️
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* <FlashBox /> */}
        {/* {products?.length && (
          <View
            style={{
              width: "100%",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  fontSize: 26,
                  fontFamily: "Raleway_800ExtraBold",
                }}
              >
                New Items
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Link
                  style={{
                    color: theme.text,
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                  href={"/shop"}
                >
                  See All
                </Link>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.primary,
                  }}
                >
                  <Icon name="arrow-right-alt" color="#fff" size={28} />
                </View>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  paddingHorizontal: 5,
                  overflow: "visible",
                }}
              >
                {nearestProducts.map((item, index) => (
                  <ProductCard
                    key={index}
                    img={item.images[0]}
                    description={item.description}
                    title={item.name}
                    price={item.price}
                    id={item._id}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )} */}
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

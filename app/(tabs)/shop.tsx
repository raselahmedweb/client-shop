import FlashBox from "@/components/FlashBox";
import SubCategory from "@/components/SubCategory";
import { Icon } from "@/components/ui/IconSymbol";
import ProductCard from "@/components/ui/ProductCard";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeProvider";
import { products } from "@/data/Data";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopFull() {
  const { theme, colorScheme } = useTheme();
  const { isLoading, isAuthorized } = useAuthGuard();
  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.replace("/login");
    }
  }, [isLoading, isAuthorized]);
  if (isLoading) return null;
  const parseDate = (date: any) => {
    if (typeof date === "number") return new Date(date);
    if (typeof date === "string") {
      // for "6/18/25" format
      const [month, day, year] = date.split("/").map(Number);
      return new Date(2000 + year, month - 1, day);
    }
    return new Date(); // fallback
  };
  const today: any = new Date();

  const sortedProducts = [...products].sort((a, b) => {
    const dateA: any = parseDate(a.createdAt);
    const dateB: any = parseDate(b.createdAt);
    return Math.abs(dateA - today) - Math.abs(dateB - today);
  });

  const nearestProducts = sortedProducts.slice(0, 6);

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
            {products.map((item, index) => (
              <ProductCard
                key={index}
                w={"47%"}
                img={item.image[0]}
                description={item.description}
                title={item.title}
                price={item.price}
                id={item.id}
              />
            ))}
          </View>
        </View>
        <FlashBox />
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
                  img={item.image[0]}
                  description={item.description}
                  title={item.title}
                  price={item.price}
                  id={item.id}
                />
              ))}
            </View>
          </ScrollView>
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
    },
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 24,
      // paddingTop: Platform.OS === "android" ? 20 : 0,
      backgroundColor: theme.background,
      gap: 20,
      overflow: "visible",
    },
  });
}

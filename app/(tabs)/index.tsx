import CategoryAll from "@/components/CategoryAll";
import FlashBox from "@/components/FlashBox";
import ForYouBox from "@/components/ForYouBox";
import SwipBanner from "@/components/SwipableBanner";
import TopProduct from "@/components/TopProduct";
import { Icon } from "@/components/ui/IconSymbol";
import ProductCard from "@/components/ui/ProductCard";
import { ThemeContext } from "@/context/ThemeProvider";
import { products } from "@/data/Data";
import { ITheme } from "@/type/type";
import { Link } from "expo-router";
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

export default function Profile() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  const { theme, colorScheme } = themeContext;

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
        <SwipBanner />
        <FlashBox />
        <CategoryAll theme={theme} />
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
        <TopProduct theme={theme} />
        <ForYouBox />
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
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "android" ? 20 : 0,
      backgroundColor: theme.bg,
      gap: 20,
      overflow: "visible",
    },
  });
}

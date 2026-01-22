import { ThemeContext } from "@/context/ThemeProvider";
import { ITheme } from "@/type/type";
import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import TopProduct from "@/components/TopProduct";
import { Icon } from "@/components/ui/IconSymbol";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/Data";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";

export default function ShopById() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  const { theme, colorScheme } = themeContext;
  const { id }: any = useLocalSearchParams();
  const intId = parseInt(id);
  const originalProduct = intId - 1;
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
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ width: "100%" }}>
          <Image
            style={{
              width: "100%",
              height: 400,
            }}
            source={{ uri: products[originalProduct]?.image[0] }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 22,
                fontFamily: "Raleway_700Bold",
              }}
            >{`$${products[originalProduct]?.salePrice}`}</Text>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: "#f5f200",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="share" size={24} color="black" />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 16,
              }}
            >
              {products[originalProduct]?.description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 22,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Variation
                </Text>
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 4,
                    backgroundColor: "#004CFF25",
                  }}
                >
                  <Text style={{ color: theme.text, fontSize: 18 }}>
                    {products[originalProduct]?.colors[0]}
                  </Text>
                </View>
                {products[originalProduct]?.sizes.length > 0 && (
                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 4,
                      backgroundColor: "#004CFF25",
                    }}
                  >
                    <Text style={{ color: theme.text, fontSize: 18 }}>
                      {products[originalProduct]?.sizes[0]}
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  backgroundColor: "#004CFF",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="arrow-right" size={24} color="white" />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
                width: "100%",
              }}
            >
              {products[originalProduct]?.image?.map((item, idx) => {
                return (
                  <Image
                    key={idx}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 4,
                    }}
                    source={{ uri: item }}
                  />
                );
              })}
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              width: "100%",
              gap: 10,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 22,
                fontFamily: "Raleway_700Bold",
              }}
            >
              Brand
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 4,
                  backgroundColor: "#004CFF25",
                }}
              >
                <Text>{products[originalProduct]?.brand}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 22,
                fontFamily: "Raleway_700Bold",
              }}
            >
              Size guide
            </Text>

            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: "#004CFF",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrow-right" size={24} color="white" />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              gap: 5,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 22,
                fontFamily: "Raleway_700Bold",
              }}
            >
              Delivery
            </Text>
            <View
              style={{
                width: "100%",
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderColor: "#004CFF",
                borderWidth: 2,
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
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text>Standard</Text>
                  <View
                    style={{
                      backgroundColor: "#004CFF10",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ color: "#004CFF" }}>5-7 days</Text>
                  </View>
                </View>
                <Text>$3</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              gap: 5,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 22,
                fontFamily: "Raleway_700Bold",
              }}
            >
              Rating & Reviews
            </Text>
          </View>
          <TopProduct theme={theme} />
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
                    img={item?.image[0]}
                    description={item?.description}
                    title={item?.title}
                    price={item?.price}
                    id={item?.id}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function createStyle(theme: ITheme, colorScheme: string) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.bg,
      position: "relative",
    },
    container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: theme.bg,
      gap: 20,
      overflow: "visible",
    },
  });
}

import { ThemeContext } from "@/context/ThemeProvider";
import { products } from "@/data/Data";
import { ITheme } from "@/type/type";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Cart() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  const { theme, colorScheme } = themeContext;

  const [imageSize, setImageSize] = useState(0);

  const styles = createStyle(theme, colorScheme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
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
              Cart
            </Text>
          </View>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#004CFF10",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Raleway_700Bold",
              }}
            >
              1
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "#f2f2f2",
            padding: 15,
            borderRadius: 20,
            gap: 5,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 22,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            Shipping Address
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: theme.text,
                  fontSize: 16,
                  fontFamily: "Raleway_400Regular",
                }}
              >
                26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh
                city
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => console.log("first")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  backgroundColor: "#007bff",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="pen" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <View
            style={{
              width: 100,
              borderWidth: 5,
              borderColor: "#fff",
              borderRadius: 8,
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowColor: "#000",
              // Android shadow
              elevation: 8,
              backgroundColor: "#fff",
            }}
            onLayout={(event) => {
              const width = event.nativeEvent.layout.width;
              setImageSize(width);
            }}
          >
            <Image
              source={{ uri: products[0].image[0] }}
              style={{
                width: "100%",
                height: imageSize,
                borderRadius: 8,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {products[0].title}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                }}
              >
                PINK, SIZE M
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "900" }}>
                {`$${products[0].salePrice}`}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: "#004CFF",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="plus" size={24} color="black" />
                </View>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    backgroundColor: "#004CFF20",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#004CFF",
                      fontSize: 15,
                    }}
                  >
                    1
                  </Text>
                </View>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: "#004CFF",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="minus" size={24} color="black" />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
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
              From your wishlist
            </Text>
          </View>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#004CFF10",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Raleway_700Bold",
              }}
            >
              1
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <View
            style={{
              width: 100,
              borderWidth: 5,
              borderColor: "#fff",
              borderRadius: 8,
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowColor: "#000",
              // Android shadow
              elevation: 8,
              backgroundColor: "#fff",
            }}
            onLayout={(event) => {
              const width = event.nativeEvent.layout.width;
              setImageSize(width);
            }}
          >
            <Image
              source={{ uri: products[10].image[0] }}
              style={{
                width: "100%",
                height: imageSize,
                borderRadius: 8,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {products[10].title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "900" }}>
                {`$${products[10].salePrice}`}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 8,
                      backgroundColor: "#004CFF25",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                      }}
                    >
                      PINK
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: 8,
                      backgroundColor: "#004CFF25",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                      }}
                    >
                      M
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="cart-plus" size={28} color="#004CFF" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 10,
          backgroundColor: "#004CFF25",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Raleway_800ExtraBold",
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Raleway_800ExtraBold",
              }}
            >{`$${products[0].salePrice}`}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#004CFF",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Pressable onPress={() => console.log("object")}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "Raleway_700Bold",
                }}
              >
                Checkout
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "android" ? 20 : 0,
      backgroundColor: theme.bg,
      gap: 20,
      overflow: "visible",
    },
  });
}

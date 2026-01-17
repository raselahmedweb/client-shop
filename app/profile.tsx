import CategoryAll from "@/components/CategoryAll";
import FlashBox from "@/components/FlashBox";
import ForYouBox from "@/components/ForYouBox";
import RecentlyViewd from "@/components/RecentlyViewd";
import Stories from "@/components/stories";
import TopProduct from "@/components/TopProduct";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/IconSymbol";
import ProductCard from "@/components/ui/ProductCard";
import { ThemeContext } from "@/context/ThemeProvider";
import { announcement, products, stories } from "@/data/Data";
import { IAnnounce, ITheme } from "@/type/type";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const profile = require("@/assets/images/profile.jpg");

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

  const announce: IAnnounce[] = announcement;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IAnnounce | null>(null);

  const openModal = (item: IAnnounce) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#fff",
                shadowOffset: {
                  width: 5,
                  height: 5,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                shadowColor: "#000",
                // Android shadow
                elevation: 8,
                backgroundColor: "#fff",
              }}
            >
              <Image
                source={profile}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
              />
            </View>

            <Pressable
              style={{
                backgroundColor: theme.primary,
                height: 40,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 15,
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Raleway_400Regular",
                  fontSize: 18,
                }}
              >
                My activity
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#004CFF25",
              }}
            >
              <Icon name="receipt-long" color={theme.primary} size={24} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#004CFF25",
              }}
            >
              <Icon name="menu" color={theme.primary} size={24} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#004CFF25",
              }}
            >
              <Icon name="settings" color={theme.primary} size={24} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 30,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            Hello Rasel
          </Text>
        </View>
        {announce &&
          announce.length > 0 &&
          announce.map((data) => (
            <View
              key={data.id}
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
                  fontSize: 26,
                  fontFamily: "Raleway_800ExtraBold",
                }}
              >
                {data.title}
              </Text>

              <View
                style={{
                  flexDirection: "column",
                  gap: 5,
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 18,
                    fontFamily: "Raleway_400Regular",
                  }}
                >
                  {data.description && data.description.length > 90
                    ? `${data.description.slice(0, 90)}...`
                    : data.description}
                </Text>

                {data.description.length > 90 && (
                  <TouchableOpacity onPress={() => openModal(data)}>
                    <Text style={{ color: "#007bff", fontWeight: "bold" }}>
                      Read More
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        {/* modal after click in announce */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedItem?.description}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <RecentlyViewd />
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 26,
              fontFamily: "Raleway_800ExtraBold",
            }}
          >
            My Orders
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Button
              txt="To Pay"
              width={90}
              paddingVertical={10}
              press={console.log("object")}
              bg="#007bff10"
              color={theme.primary}
              radius={100}
            />
            <Button
              txt="To Receive"
              width={120}
              paddingVertical={10}
              press={console.log("object")}
              bg="#007bff10"
              color={theme.primary}
              radius={100}
            />
            <Button
              txt="To Review"
              width={120}
              paddingVertical={10}
              press={console.log("object")}
              bg="#007bff10"
              color={theme.primary}
              radius={100}
            />
          </View>
        </View>
        {/* {story && story.length > 0 && <Stories theme={theme} story={story} />} */}
        {stories.length > 0 && (
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Stories story={stories} theme={theme} />
          </View>
        )}
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
        <CategoryAll theme={theme} />
        <FlashBox />
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
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
      padding: 20,
    },
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalDescription: {
      fontSize: 16,
      color: "#444",
    },
    closeButton: {
      marginTop: 20,
      alignSelf: "flex-end",
      backgroundColor: "#007bff",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
  });
}

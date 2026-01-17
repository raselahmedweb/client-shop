import { products } from "@/data/Data";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Icon } from "./ui/IconSymbol";
import TopProductCard from "./ui/TopProductCard";

export default function TopProduct({ theme }: any) {
  const topProducts = [...products]
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 6);

  return (
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
          Top Products
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
            paddingVertical: 15,
          }}
        >
          {topProducts.map((item, index) => (
            <TopProductCard
              key={index}
              img={item.image[0]}
              totalSold={item.totalSold}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

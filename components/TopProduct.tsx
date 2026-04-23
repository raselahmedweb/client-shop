import { products } from "@/data/Data";
import { ScrollView, Text, View } from "react-native";
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
          justifyContent: "flex-start",
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

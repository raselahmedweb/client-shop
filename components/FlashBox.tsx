import { ThemeContext } from "@/context/ThemeProvider";
import { flashproducts, flashtime, products } from "@/data/Data";
import { useContext } from "react";
import { Text, View } from "react-native";
import FlashCard from "./ui/FlashCard";
import FlashTimer from "./ui/FlashTimer";

export default function FlashBox() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  const { theme } = themeContext;
  const flash = flashproducts;

  const flashTime = flashtime[0];
  const now = new Date();
  const start = new Date(flashTime.startTime);

  // If flash hasn't started yet, return null
  if (now < start) return null;

  // Prepare flash product list
  const flashProduct = flash.map((flashItem) => {
    const matchedProduct = products.find((p) => p.id === flashItem.productId);
    return {
      id: flashItem.productId,
      image: matchedProduct?.image || [],
      discount: flashItem.discount,
    };
  });

  return (
    <View style={{ width: "100%", flexDirection: "column" }}>
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
          Flash Sell
        </Text>
        <View style={{ paddingHorizontal: 10 }}>
          <FlashTimer />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 5,
          overflow: "visible",
          paddingVertical: 15,
          gap: 5,
        }}
      >
        {flashProduct &&
          flashProduct.length > 0 &&
          flashProduct.map((item, index) => (
            <FlashCard
              key={index}
              img={item.image[0]}
              discount={item.discount}
            />
          ))}
      </View>
    </View>
  );
}

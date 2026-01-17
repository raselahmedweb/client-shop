import { useState } from "react";
import { Image, Text, View } from "react-native";
export default function TopProductCard(props: {
  img: string;
  totalSold?: number;
}) {
  const [imageSize, setImageSize] = useState(0);
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 5,
        width: 100,
        overflow: "visible",

          borderWidth: 5,
          borderColor: "#fff",
          borderRadius: 8,
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
      <View
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width;
          setImageSize(width);
        }}
      >
        <Image
          source={{ uri: props.img }}
          style={{
            width: "100%",
            height: imageSize,
            borderRadius: 8
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 3
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {props.totalSold}
        </Text>
        <Text style={{
          fontSize: 16,
          color: 'gray'
        }}>sold</Text>
      </View>
    </View>
  );
}

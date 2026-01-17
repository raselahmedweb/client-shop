import { useState } from "react";
import { Image, Text, View } from "react-native";
export default function FlashCard(props: { img: string; discount?: number }) {
  const [imageSize, setImageSize] = useState(0);
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 5,
        width: '32%',
        overflow: "visible",
        position: 'relative',
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
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "red",
          paddingHorizontal: 4,
          paddingVertical: 2,
          borderRadius: 6,
          position:'absolute',
          top: 0,
          right: 0
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: '#fff'
          }}
        >
          {`-${props.discount}%`}
        </Text>
      </View>
    </View>
  );
}

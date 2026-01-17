import { useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function CategoryCard(props: {
  img: string[];
  name?: string;
  slug?: string;
  totalProduct?: number;
}) {
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: boolean;
  }>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const handleImageLoad = (index: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleImageError = (index: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <View
      style={{
        padding: 4,
        width: "50%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 8,
          width: "100%",
          borderWidth: 1,
          borderColor: "#f0f0f0",
          borderRadius: 12,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowColor: "#000",
          // Android shadow
          elevation: 3,
          backgroundColor: "#fff",
          padding: 8,
        }}
      >
        {/* 2x2 Grid Container */}
        <View
          style={{
            width: "100%",
            aspectRatio: 1, // Makes it square
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {/* Top Row */}
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              flex: 1,
            }}
          >
            {/* Top Left Image */}
            <View
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "#f5f5f5",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {loadingStates[0] && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <ActivityIndicator size="small" color="#ccc" />
                </View>
              )}
              <Image
                source={{ uri: props.img[0] }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
                onLoad={() => handleImageLoad(0)}
                onError={() => handleImageError(0)}
              />
            </View>

            {/* Top Right Image */}
            <View
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "#f5f5f5",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {loadingStates[1] && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <ActivityIndicator size="small" color="#ccc" />
                </View>
              )}
              <Image
                source={{ uri: props.img[1] }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
                onLoad={() => handleImageLoad(1)}
                onError={() => handleImageError(1)}
              />
            </View>
          </View>

          {/* Bottom Row */}
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              flex: 1,
              marginTop: 8,
            }}
          >
            {/* Bottom Left Image */}
            <View
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "#f5f5f5",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {loadingStates[2] && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <ActivityIndicator size="small" color="#ccc" />
                </View>
              )}
              <Image
                source={{ uri: props.img[2] }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
                onLoad={() => handleImageLoad(2)}
                onError={() => handleImageError(2)}
              />
            </View>

            {/* Bottom Right Image */}
            <View
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "#f5f5f5",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {loadingStates[3] && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <ActivityIndicator size="small" color="#ccc" />
                </View>
              )}
              <Image
                source={{ uri: props.img[3] }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
                onLoad={() => handleImageLoad(3)}
                onError={() => handleImageError(3)}
              />
            </View>
          </View>
        </View>

        {/* Category Info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#333",
              marginBottom: 2,
            }}
            numberOfLines={1}
          >
            {props.name}
          </Text>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#004CFF19",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                fontWeight: "bold",
              }}
            >
              {props.totalProduct}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

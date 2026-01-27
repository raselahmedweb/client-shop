import { useGetCategoriesQuery } from "@/redux/api/baseApi";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import CategoryCard from "./ui/CategoryCard";
import { Icon } from "./ui/IconSymbol";

export default function CategoryAll({ theme, isCategory = false }: any) {
  const { data } = useGetCategoriesQuery(
    {},
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );
  const category = data?.data || [];
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
          Category
        </Text>
        {!isCategory && (
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
              href={"/category"}
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
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",

          paddingHorizontal: 5,
          overflow: "visible",
          paddingVertical: 15,
        }}
      >
        {category &&
          category.length > 0 &&
          category.map((item: any, index: number) => (
            <CategoryCard
              key={index}
              img={item.imageUrl}
              name={item.name}
              slug={item.slug}
            />
          ))}
      </View>
    </View>
  );
}

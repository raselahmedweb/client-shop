import { useGetSubCategoriesQuery } from "@/redux/api/baseApi";
import { ISubCategory } from "@/type/type";
import { Dimensions, Image, View } from "react-native";

export default function SubCategory() {
  const { data: subCategoriesData, isLoading: subCategoriesLoading } =
    useGetSubCategoriesQuery(
      {},
      {
        pollingInterval: 30000,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
      },
    );

  if (subCategoriesLoading) return null;
  const subCategories: ISubCategory[] = subCategoriesData?.data || [];
  const screenWidth = Dimensions.get("window").width;
  const gap = 6;
  const numColumns = 6;
  const totalGap = (numColumns - 1) * gap;
  const itemWidth = (screenWidth - totalGap) / numColumns;
  return (
    <View
      style={{
        paddingTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap,
      }}
    >
      {subCategories.map((item) => {
        return (
          <View
            key={item._id}
            style={{
              width: itemWidth,
              height: itemWidth, // Equal height and width
              marginBottom: gap,
              borderRadius: 100,
              borderWidth: 5,
              borderColor: "#fff",
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowColor: "#000",
              elevation: 8,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

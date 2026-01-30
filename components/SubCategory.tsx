import { useGetSubCategoriesQuery } from "@/redux/api/baseApi";
import { ISubCategory } from "@/type/type";
import { Image, View } from "react-native";

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
  return (
    <View
      style={{
        paddingTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: 6,
      }}
    >
      {subCategories.map((item) => {
        return (
          <View
            key={item._id}
            style={{
              width: 60,
              height: 60, // Equal height and width
              // marginBottom: gap,
              borderRadius: 100,
              borderWidth: 2,
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

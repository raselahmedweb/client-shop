import { useGetMeQuery } from "@/redux/api/baseApi";
import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function TabsLayout() {
  const { data, isLoading } = useGetMeQuery({});

  const role = data?.data?.role;
  const isAuthorized = role === "ADMIN" || role === "CUSTOMER";

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.replace("/login");
    }
  }, [isLoading, isAuthorized]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Checking access...</Text>
      </View>
    );
  }

  return <Slot />;
}

import { useGetMeQuery } from "@/redux/api/baseApi";
import { router } from "expo-router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const { data, isLoading } = useGetMeQuery({});

  const role = data?.data?.role;
  const isAuthorized = role === "ADMIN" || role === "CUSTOMER";

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.replace("/login");
    }
  }, [isLoading, isAuthorized]);

  return { isLoading, isAuthorized };
};

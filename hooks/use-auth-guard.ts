import { useGetMeQuery } from "@/redux/api/baseApi";

export const useAuthGuard = () => {
  const { data, isLoading } = useGetMeQuery({});

  const role = data?.data?.role;
  const isAuthorized = role === "ADMIN" || role === "CUSTOMER";

  return { isLoading, isAuthorized, data, role };
};

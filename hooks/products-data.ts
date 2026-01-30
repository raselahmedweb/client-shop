import { useGetProductsQuery } from "@/redux/api/baseApi";

export const useProductsData = () => {
  const { data, isLoading } = useGetProductsQuery(
    {},
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );
  return { isLoading, data };
};

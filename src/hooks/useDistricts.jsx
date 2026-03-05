import { useCrud } from "./useCrud";


const useDistricts = () => {
  const { useList } = useCrud({
    entity: "district",
    listUrl: "/district/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    districts: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useDistricts;
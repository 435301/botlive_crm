import { useCrud } from "./useCrud";


const useSchools = () => {
  const { useList } = useCrud({
    entity: "/skillCenter",
    listUrl: "/skillCenter/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
    centerType: 2,
  });

  return {
    schools: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useSchools;
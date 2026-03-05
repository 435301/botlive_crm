import { useCrud } from "./useCrud";


const useCategory = () => {
  const { useList } = useCrud({
    entity: "category",
    listUrl: "/category/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    categories: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useCategory;
import { useCrud } from "./useCrud";


const useFounder = () => {
  const { useList } = useCrud({
    entity: "founder",
    listUrl: "/founder/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    founders: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useFounder;
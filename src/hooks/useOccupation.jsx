import { useCrud } from "./useCrud";


const useOccupation = () => {
  const { useList } = useCrud({
    entity: "occupation",
    listUrl: "/occupation/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    occupations: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useOccupation;
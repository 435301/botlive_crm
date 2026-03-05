import { useCrud } from "./useCrud";


const useStates = () => {
  const { useList } = useCrud({
    entity: "state",
    listUrl: "/state/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    states: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useStates;
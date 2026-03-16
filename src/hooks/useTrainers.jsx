import { useCrud } from "./useCrud";


const useTrainers = () => {
  const { useList } = useCrud({
    entity: "trainer",
    listUrl: "/trainer/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    trainers: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useTrainers;
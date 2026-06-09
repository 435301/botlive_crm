import { useCrud } from "./useCrud";


const useAreaOfInterest = () => {
  const { useList } = useCrud({
    entity: "/areaOfInterest",
    listUrl: "/volunteer/areaOfInterest/list",
  });

  const query = useList({
    search: "",
    status: 1,
    page: "",
  });

  return {
    areaOfInterest: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useAreaOfInterest;
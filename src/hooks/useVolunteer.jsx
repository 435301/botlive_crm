import { useCrud } from "./useCrud";


const useVolunteer = () => {
  const { useList } = useCrud({
    entity: "/volunteer",
    listUrl: "/volunteer/list",
  });

  const query = useList({
    search: "",
    status: 1,
    page: "",
  });

  return {
    volunteer: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useVolunteer;
import { useCrud } from "./useCrud";


const useModules = () => {
  const { useList } = useCrud({
    entity: "module",
    listUrl: "/module/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
    courseId:"",
  });

  return {
    modules: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useModules;
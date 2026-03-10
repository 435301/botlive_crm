import { useCrud } from "./useCrud";


const useChapters = () => {
  const { useList } = useCrud({
    entity: "chapter",
    listUrl: "/chapter/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
    courseId:"",
    moduleId:"",
  });

  return {
    chapters: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useChapters;
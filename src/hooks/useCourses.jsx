import { useCrud } from "./useCrud";


const useCourses = () => {
  const { useList } = useCrud({
    entity: "course",
    listUrl: "/course/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    courses: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useCourses;
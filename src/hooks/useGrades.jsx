import { useCrud } from "./useCrud";


const useGrades = () => {
  const { useList } = useCrud({
    entity: "grade",
    listUrl: "/grade/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
    centerType: 2,
  });

  return {
    grades: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useGrades;
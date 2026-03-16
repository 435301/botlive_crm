import { useCrud } from "./useCrud";


const useGrades = (centreType) => {
  const { useList } = useCrud({
    entity: "grade",
    listUrl: "/grade/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
    centreType,
  });

  return {
    grades: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useGrades;
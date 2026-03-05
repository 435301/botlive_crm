import { useCrud } from "./useCrud";


const useQualification = () => {
  const { useList } = useCrud({
    entity: "qualification",
    listUrl: "/qualification/list",
  });

  const query = useList({
    page: "",
    search: "",
    status: 1,
  });

  return {
    qualifications: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useQualification;
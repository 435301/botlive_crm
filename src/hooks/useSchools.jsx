import { useCrud } from "./useCrud";


const useSchools = () => {
  const { useList } = useCrud({
    entity: "/skillCenter",
    listUrl: "/skillCenter/list",
  });

  const query = useList({
    search: "",
    status: 1,
    founderId: "",
    stateId: "",
    districtId: "",
    centerType: "",
    page: "",
  });
console.log("Schools API response:", query.data);

  return {
    schoolsData: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useSchools;
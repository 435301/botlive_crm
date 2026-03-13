import { useCrud } from "./useCrud";


const useAdminGrades = () => {
  const { useGetAll } = useCrud({
    entity: "skillCenterSchoolAdmin",
    getAllUrl: "/skillCenterSchoolAdmin/getGradesBatches",
  });

  const query = useGetAll();

  return {
    adminGrades: query.data?.gradeBatches || [],
  };
};

export default useAdminGrades;
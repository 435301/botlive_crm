import { useCrud } from "./useCrud";


const useAdminCourses = (gradeId) => {
    const { useGetById } = useCrud({
        entity: "skillCenterSchoolAdmin",
        getUrl: (id) => `/skillCenterSchoolAdmin/getCourses/${id}`,
    });

  const query = useGetById(gradeId, {
    enabled: !!gradeId,
  });

    return {
        adminCourses: query.data?.courses || [],
    };
};

export default useAdminCourses;
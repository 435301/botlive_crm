import { useCrud } from "./useCrud";

const useAdminModules = (gradeId, courseId) => {
    const { useGetById } = useCrud({
        entity: "skillCenterSchoolAdmin",
        getUrl: ([gradeId, courseId]) =>
            `/skillCenterSchoolAdmin/getModules/${gradeId}/${courseId}`,
    });

    const query = useGetById(
        [gradeId, courseId],
        {
            enabled: !!gradeId && !!courseId,
        }
    );

    return {
        adminModules: query.data?.modules || [],
    };
};

export default useAdminModules;
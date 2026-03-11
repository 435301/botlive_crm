import { useCrud } from "./useCrud";


const useStudentModules = (courseId) => {
    const { useGetById } = useCrud({
        entity: "student",
        getUrl: (id) => `/student/getModules/${id}`,
    });

  const query = useGetById(courseId)

    return {
        studentModules: query.data?.modules || [],
    };
};

export default useStudentModules;
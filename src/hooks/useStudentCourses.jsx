import { useCrud } from "./useCrud";


const useStudentCourses = () => {
  const { useGetAll } = useCrud({
    entity: "student",
    getAllUrl: "/student/getCourses",
  });

  const query = useGetAll();

  return {
    studentCourses: query.data?.courses || [],
    gradeBatchId: query.data?.gradeBatchId || null,
    isLoading: query.isLoading,
  };
};

export default useStudentCourses;
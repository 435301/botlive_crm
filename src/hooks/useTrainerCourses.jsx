import { useCrud } from "./useCrud";


const useTrainerCourses = () => {
  const { useGetAll } = useCrud({
    entity: "trainerAdmin",
    getAllUrl: "/trainerAdmin/getCourses",
  });

  const query = useGetAll();

  return {
    trainerCourses: query.data?.courses || [],
    gradeBatchId: query.data?.gradeBatchId || null,
    isLoading: query.isLoading,
  };
};

export default useTrainerCourses;
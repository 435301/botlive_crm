import { useCrud } from "./useCrud";


const useTrainerCourses = (id) => {
  const { useGetById } = useCrud({
    entity: "trainerAdmin",
    getUrl:(id)=> `/trainerAdmin/getCourses/${id}`,
  });

  const query = useGetById(id);

  return {
    trainerCourses: query.data?.courses || [],
    gradeBatchId: query.data?.gradeBatchId || null,
    isLoading: query.isLoading,
  };
};

export default useTrainerCourses;
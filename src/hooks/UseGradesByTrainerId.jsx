import { useCrud } from "./useCrud";


const useGradesByTrainerId = (id) => {
     const { useGetById } = useCrud({
        entity: "trainerAdmin",
        getUrl: (id) => `/trainerAdmin/getGradeBatches/${id}`,
    });

  const query = useGetById(id, {
    enabled: !!id,
  });

    return {
        gradesByTrainerId: query.data || [],
        isLoading: query.isLoading,
    };
};

export default useGradesByTrainerId;
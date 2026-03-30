import { useCrud } from "./useCrud";


const useTrainerModules = (gradeBatchId, courseId) => {
    const { useGetById } = useCrud({
        entity: "trainerAdmin",
        getUrl: ([gradeBatchId, courseId]) => `/trainerAdmin/getModules/${gradeBatchId}/${courseId}`,
    });

  const query = useGetById(
        [gradeBatchId, courseId],
        {
            enabled: !!gradeBatchId && !!courseId,
        }
    );

    return {
        trainerModules: query.data?.modules || [],
    };
};

export default useTrainerModules;
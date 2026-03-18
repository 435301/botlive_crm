import { useCrud } from "./useCrud";


const useTrainerModules = (courseId) => {
    const { useGetById } = useCrud({
        entity: "trainerAdmin",
        getUrl: (id) => `/trainerAdmin/getModules/${id}`,
    });

  const query = useGetById(courseId)

    return {
        trainerModules: query.data?.modules || [],
    };
};

export default useTrainerModules;
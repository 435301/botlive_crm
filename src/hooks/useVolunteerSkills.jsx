import { useCrud } from "./useCrud";


const useVolunteerSkills = () => {
  const { useList } = useCrud({
    entity: "/volunteerSkills",
    listUrl: "/volunteer/volunteerSkills/list",
  });

  const query = useList({
    search: "",
    status: 1,
    page: "",
  });

  return {
    volunteerSkills: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useVolunteerSkills;
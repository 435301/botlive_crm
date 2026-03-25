import { useCrud } from "./useCrud";
import Cookies from "js-cookie";

const useTrainerStudents = () => {
    const schoolSkillCentreId = JSON.parse(Cookies.get("trainer") || "{}")?.centreId;
    const gradeBatchId = JSON.parse(Cookies.get("trainer") || "{}")?.gradeBatchId;
    const { useList } = useCrud({
        entity: "trainer",
        listUrl: "/trainerAdmin/student/list",
    });

    const query = useList({
        page: "",
        search: "",
        status: 1,
        gradeBatchId: gradeBatchId,
        centreId: schoolSkillCentreId,

    });

    return {
        trainerStudents: query.data?.data || [],
        isLoading: query.isLoading,
    };
};

export default useTrainerStudents;
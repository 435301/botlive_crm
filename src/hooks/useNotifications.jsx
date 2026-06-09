import { useCrud } from "./useCrud";

const useNotifications = () => {
  const { useGetAll } = useCrud({
    entity: "/notifications",
    getAllUrl: "/admin/getNotifications",
    updatePatchUrl:"/admin/updateNotifications",
  });

  const query = useGetAll();

  return {
    notifications: query.data?.data || [],
    isLoading: query.isLoading,
  };
};

export default useNotifications;
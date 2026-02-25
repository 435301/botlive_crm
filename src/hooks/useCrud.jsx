import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const useCrud = ({
    entity,
    listUrl,
    getUrl,
    createUrl,
    updateUrl,
    deleteUrl,
}) => {
    const queryClient = useQueryClient();

    // ================= LIST HOOK =================
    const useList = (payload) =>
        useQuery({
            queryKey: [entity, "list", payload],
            queryFn: async () => {
                const res = await axiosInstance.post(listUrl, payload);
                return res.data;
            },
            keepPreviousData: true,
        });

    // ================= GET BY ID HOOK =================
    const useGetById = (id) =>
        useQuery({
            queryKey: [entity, id],
            queryFn: async () => {
                const res = await axiosInstance.get(getUrl(id));
                return res.data.data;
            },
            enabled: !!id,
        });

    // ================= CREATE =================
    const createMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post(createUrl, data);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: [entity, "list"] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Create failed");
        },
    });

    // ================= UPDATE =================
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await axiosInstance.put(updateUrl(id), data);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: [entity, "list"] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Update failed");
        },
    });

    // ================= DELETE =================
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosInstance.delete(deleteUrl(id));
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: [entity, "list"] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Delete failed");
        },
    });

    return {
        useList,
        useGetById,
        createMutation,
        updateMutation,
        deleteMutation,
    };
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-common";

const useDeleteFormula = () => {
  const queryClient = useQueryClient();
  const useDeleteFormulaMutation = useMutation(
    async (id: number) => {
      await httpClient.delete(`/formulas/${id}`);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["formulas"],
          exact: true,
        });
      },
    }
  );

  return {
    deleteFormula: useDeleteFormulaMutation.mutate,
    isLoading: useDeleteFormulaMutation.isLoading,
  };
};

export default useDeleteFormula;

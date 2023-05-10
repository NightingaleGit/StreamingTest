import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../../../utils/http-common";
import { IEditingFormulaDto } from "../../../types/IEditingFormula";

const useUpdateFormula = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const useUpdateFormulaMutation = useMutation(
    async (editedFormula: { id: number; newFormula: IEditingFormulaDto }) => {
      await httpClient.patch(
        `/formulas/${editedFormula.id}`,
        editedFormula.newFormula
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["formulas"],
          exact: true,
        });
        if (onSuccess != null) {
          onSuccess();
        }
      },
    }
  );
  return {
    updateFormula: useUpdateFormulaMutation.mutate,
    isLoading: useUpdateFormulaMutation.isLoading,
  };
};

export default useUpdateFormula;

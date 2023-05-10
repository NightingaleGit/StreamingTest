import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INewFormula } from "../../../types/INewFormula";
import httpClient from "../../../utils/http-common";

const useAddNewFormula = () => {
  const queryClient = useQueryClient();
  const addNewFormulaMutation = useMutation(
    async (newFormula: INewFormula) => {
      await httpClient.post("/formulas", newFormula);
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
    addNewFormula: addNewFormulaMutation.mutate,
    isLoading: addNewFormulaMutation.isLoading,
  };
};

export default useAddNewFormula;

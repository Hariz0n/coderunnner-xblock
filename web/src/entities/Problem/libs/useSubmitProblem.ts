import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRuntimeContext } from "@/entities/Runtime";
import { submitData } from "./submitData";

export const useSubmitProblem = () => {
  const { data } = useRuntimeContext();
  const queryClient = useQueryClient();

  return useMutation<Problem.Data, void, Problem.Answer>({
    mutationFn: (body: Problem.Answer) => submitData(data!.submitUrl, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });
};

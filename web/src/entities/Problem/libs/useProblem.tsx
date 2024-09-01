import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./fetchData";
import { useRuntimeContext } from "@/entities/Runtime";

export const useProblem = () => {
  const { data } = useRuntimeContext();

  return useQuery<Problem.Data>({
    queryKey: ["data"],
    queryFn: () => fetchData(data!.dataUrl),
    enabled: Boolean(data?.dataUrl),
  });
};

import { ProblemBrief, ProblemExample, ProblemInfo, useProblem } from "@/entities/Problem";
import { FC } from "react";
import { DESCRIPTION_MOCK, INPUT_MOCK, MEMORY_LIMIT_MOCK, OUTPUT_MOCK, TIME_LIMIT_MOCK, TITLE_MOCK } from "../mocks/infoMock";

export const ProblemDescription: FC = () => {
  const data = useProblem()

  console.log(data.data)

  return <>
    <ProblemBrief title={TITLE_MOCK} description={DESCRIPTION_MOCK} />
    <ProblemInfo input={INPUT_MOCK} output={OUTPUT_MOCK} timeLimit={TIME_LIMIT_MOCK} memoryLimit={MEMORY_LIMIT_MOCK} />
    <ProblemExample input="123456789 673243342" output="123456789 673243342" />
  </>
}
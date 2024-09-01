import { ProblemBrief, ProblemExample, ProblemInfo } from "@/entities/Problem";
import { FC } from "react";
import { INPUT_MOCK, MEMORY_LIMIT_MOCK, OUTPUT_MOCK, TIME_LIMIT_MOCK } from "../mocks/infoMock";

export const ProblemDescription: FC = () => {
  return <>
    <ProblemBrief />
    <ProblemInfo input={INPUT_MOCK} output={OUTPUT_MOCK} timeLimit={TIME_LIMIT_MOCK} memoryLimit={MEMORY_LIMIT_MOCK} />
    <ProblemExample input="123456789 673243342" output="123456789 673243342" />
  </>
}
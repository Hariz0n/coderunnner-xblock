import { FC } from "react";
import { MainPageProps } from "../types/MainPageProps";
import { ProblemBrief, ProblemInfo } from "@/entities/Problem";
import { DESCRIPTION_MOCK, INPUT_MOCK, MEMORY_LIMIT_MOCK, OUTPUT_MOCK, TIME_LIMIT_MOCK, TITLE_MOCK } from "../mocks/infoMock";

export const MainPage: FC<MainPageProps> = () => {
  return <article className="p-5 flex flex-col gap-12">
    <ProblemBrief title={TITLE_MOCK} description={DESCRIPTION_MOCK} />
    <ProblemInfo input={INPUT_MOCK} output={OUTPUT_MOCK} timeLimit={TIME_LIMIT_MOCK} memoryLimit={MEMORY_LIMIT_MOCK} />
  </article>
}
import { FC } from "react";
import { MainPageProps } from "../types/MainPageProps";
import { ProblemInfo } from "@/entities/Problem";
import { DESCRIPTION_MOCK, TITLE_MOCK } from "../mocks/infoMock";

export const MainPage: FC<MainPageProps> = () => {
  return <article className="p-5">
    <ProblemInfo title={TITLE_MOCK} description={DESCRIPTION_MOCK} />
  </article>
}
import { FC } from "react";
import { MainPageProps } from "../types/MainPageProps";
import { ProblemDescription } from "@/widgets/ProblemDescription";
import { ProblemForm } from "@/widgets/ProblemForm";

export const MainPage: FC<MainPageProps> = () => {
  return <article className="p-5 flex flex-col gap-12">
    <ProblemDescription />
    <ProblemForm />
  </article>
}
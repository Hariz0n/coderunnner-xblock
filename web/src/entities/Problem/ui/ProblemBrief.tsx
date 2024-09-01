import { FC } from "react";
import { ProblemBriefProps } from "../types/ProblemBriefProps";

export const ProblemBrief: FC<ProblemBriefProps> = ({title, description}) => {
  return <section className="flex flex-col gap-4">
    <h1 className="font-bold text-[2rem] leading-9">{title}</h1>
    <p className="font-medium text-lg">{description}</p>
  </section>
}
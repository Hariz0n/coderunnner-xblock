import { FC } from "react";
import { useProblem } from "../libs/useProblem";

export const ProblemBrief: FC = () => {
  const { data } = useProblem();

  if (!data) {
    return null;
  }

  const { title, description } = data;

  return (
    <section className="flex flex-col gap-4">
      <h1 className="font-bold text-[2rem] leading-9">{title}</h1>
      <p className="font-medium text-lg">{description}</p>
    </section>
  );
};

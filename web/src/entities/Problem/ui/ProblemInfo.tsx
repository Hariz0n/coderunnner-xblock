import { FC } from "react";
import { ProblemInfoProps } from "../types/ProblemInfoProps";
import { Chip } from "@/shared";

export const ProblemInfo: FC<ProblemInfoProps> = ({
  input,
  output,
  timeLimit,
  memoryLimit,
}) => {
  return (
    <section className="flex flex-col gap-4 p-6 rounded-2xl shadow-[8px_8px_24px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-4 items-start">
        <Chip char="1" title="Формат ввода" />
        <p className="font-medium text-lg">{input}</p>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <Chip char="1" title="Формат вывода" />
        <p className="font-medium text-lg">{output}</p>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <Chip char="1" title="Ограничения" />
        <ul className="flex w-full">
          <li className="p-4 flex flex-col justify-between gap-2 relative after:content-[''] after:block after:w-[1px] after:h-10 after:absolute after:bg-our-light-gray after:-right-[1px] after:top-1/2 after:-translate-y-1/2 last:after:hidden flex-grow flex-shrink">
            <span className="text-our-gray text-sm font-medium">
              {timeLimit} секунд
            </span>
            <p className="text-sm font-semibold">Ограничение по времени</p>
          </li>
          <li className="p-4 flex flex-col justify-between gap-2 relative after:content-[''] after:block after:w-[1px] after:h-10 after:absolute after:bg-our-light-gray after:-right-[1px] after:top-1/2 after:-translate-y-1/2 last:after:hidden flex-grow flex-shrink">
            <span className="text-our-gray text-sm font-medium">
              {memoryLimit} Байт
            </span>
            <p className="text-sm font-semibold">Ограничение по памяти</p>
          </li>
          <li className="p-4 flex flex-col justify-between gap-2 relative after:content-[''] after:block after:w-[1px] after:h-10 after:absolute after:bg-our-light-gray after:-right-[1px] after:top-1/2 after:-translate-y-1/2 last:after:hidden flex-grow flex-shrink">
            <span className="text-our-gray text-sm font-medium">
              стандартный ввод или input.txt
            </span>
            <p className="text-sm font-semibold">Ввод</p>
          </li>
          <li className="p-4 flex flex-col justify-between gap-2 relative after:content-[''] after:block after:w-[1px] after:h-10 after:absolute after:bg-our-light-gray after:-right-[1px] after:top-1/2 after:-translate-y-1/2 last:after:hidden flex-grow flex-shrink">
            <span className="text-our-gray text-sm font-medium">
              стандартный вывод или output.txt
            </span>
            <p className="text-sm font-semibold">Вывод</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

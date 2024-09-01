import { FC } from "react";

type ChipProps = {
  char: string;
  title: string;
};

export const Chip: FC<ChipProps> = ({ char, title }) => {
  return <div className="bg-our-light-blue p-1 pr-2 flex items-center gap-2 rounded-xl">
    <span className="bg-our-blue text-our-white h-8 w-8 flex items-center justify-center font-semibold text-lg rounded-lg">{char}</span>
    <span className="font-semibold text-sm text-our-blue">{title}</span>
  </div>;
};

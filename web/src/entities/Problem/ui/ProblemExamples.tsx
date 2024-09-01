import { Chip } from "@/shared";
import { FC, MouseEventHandler } from "react";
import { ProblemExampleProps } from "../types/ProblemExampleProps";

export const ProblemExample: FC<ProblemExampleProps> = ({ input, output }) => {
  const onClickHandler: MouseEventHandler<SVGSVGElement> = (e) => {
    const span = e.currentTarget.parentElement?.firstElementChild;
    if (span && span.textContent) {
      navigator.clipboard.writeText(span.textContent)
    }
  } 

  return (
    <section className="flex flex-col gap-4 p-6 rounded-2xl shadow-[8px_8px_24px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-4 items-start">
        <Chip char="1" title="Формат ввода" />
        <ul className="flex w-full">
          <li className="p-4 flex flex-col justify-between gap-2 relative after:content-[''] after:block after:w-[1px] after:h-10 after:absolute after:bg-our-light-gray after:-right-[1px] after:top-1/2 after:-translate-y-1/2 last:after:hidden flex-grow flex-shrink">
            <div className="flex items-start justify-between">
              <span className="text-our-gray text-sm font-medium">{input}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={onClickHandler}
              >
                <g clipPath="url(#clip0_559_404)">
                  <path
                    d="M3.33325 10H2.66659C2.31296 10 1.97382 9.85952 1.72378 9.60947C1.47373 9.35943 1.33325 9.02029 1.33325 8.66666V2.66667C1.33325 2.31304 1.47373 1.9739 1.72378 1.72386C1.97382 1.47381 2.31296 1.33333 2.66659 1.33333H8.66658C9.02021 1.33333 9.35935 1.47381 9.60939 1.72386C9.85944 1.9739 9.99992 2.31304 9.99992 2.66667V3.33333M7.33325 6H13.3333C14.0696 6 14.6666 6.59695 14.6666 7.33333V13.3333C14.6666 14.0697 14.0696 14.6667 13.3333 14.6667H7.33325C6.59687 14.6667 5.99992 14.0697 5.99992 13.3333V7.33333C5.99992 6.59695 6.59687 6 7.33325 6Z"
                    stroke="#A2A2A2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_559_404">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-sm font-semibold">Ввод</p>
          </li>
          <li className="p-4 flex flex-col justify-between gap-2 relative after:content-[''] after:block after:w-[1px] after:h-10 after:absolute after:bg-our-light-gray after:-right-[1px] after:top-1/2 after:-translate-y-1/2 last:after:hidden flex-grow flex-shrink">
            <div className="flex items-start justify-between">
              <span className="text-our-gray text-sm font-medium">
                {output}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={onClickHandler}
              >
                <g clipPath="url(#clip0_559_404)">
                  <path
                    d="M3.33325 10H2.66659C2.31296 10 1.97382 9.85952 1.72378 9.60947C1.47373 9.35943 1.33325 9.02029 1.33325 8.66666V2.66667C1.33325 2.31304 1.47373 1.9739 1.72378 1.72386C1.97382 1.47381 2.31296 1.33333 2.66659 1.33333H8.66658C9.02021 1.33333 9.35935 1.47381 9.60939 1.72386C9.85944 1.9739 9.99992 2.31304 9.99992 2.66667V3.33333M7.33325 6H13.3333C14.0696 6 14.6666 6.59695 14.6666 7.33333V13.3333C14.6666 14.0697 14.0696 14.6667 13.3333 14.6667H7.33325C6.59687 14.6667 5.99992 14.0697 5.99992 13.3333V7.33333C5.99992 6.59695 6.59687 6 7.33325 6Z"
                    stroke="#A2A2A2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_559_404">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-sm font-semibold">Вывод</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

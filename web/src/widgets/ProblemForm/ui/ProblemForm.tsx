import { Editor } from "@/shared";
import { FC } from "react";

export const ProblemForm: FC = () => {
  return <>
    <Editor onChange={console.log} height="360px" />
  </>
}
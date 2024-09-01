/* eslint-disable @typescript-eslint/no-explicit-any */
export declare global {
  interface Problem {
    title: string;
    description: string;
  }

  interface Window {
    testApi: (runtime: unknown) => void;
  }

  let CodeRunnerXBlock: CodeRunnerXBlockType

}

type CodeRunnerXBlockType = (runtime: any, element: any) => void;

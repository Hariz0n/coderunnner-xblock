/* eslint-disable @typescript-eslint/no-explicit-any */
export declare global {
  namespace Problem {
    interface Data {
      title: string;
      description: string;
      input: string;
      output: string;
      code: string;
    }

    interface Answer {
      code: string;
    }
  }

  interface Window {
    testApi: (runtime: unknown) => void;
  }

  let CodeRunnerXBlock: CodeRunnerXBlockType
}

type CodeRunnerXBlockType = (runtime: any, element: any) => void;

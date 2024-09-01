import { FC, PropsWithChildren, useEffect, useState } from "react";
import { runtimeContext } from "../libs/runtime-context";
import { RuntimeContextType } from "../types/RuntimeContextType";
import { isDevMode } from "@/shared";

export const RuntimeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<RuntimeContextType>({});

  if (!CodeRunnerXBlock) {
    CodeRunnerXBlock = function(runtime, element) {
      setData({
        data: {
          dataUrl: runtime.handlerUrl(element, 'increment_count'),
          submitUrl: runtime.handlerUrl(element, 'submit')
        }
      })
    }
  }

  useEffect(() => {
    if (!data.data && isDevMode) {
      setData({
        data: {
          dataUrl: `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_DATA_URL}}`,
          submitUrl: `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_SUBMIT_URL}`
        }
      })
    }
  }, [data.data])

  return <runtimeContext.Provider value={data}>{children}</runtimeContext.Provider>;
};

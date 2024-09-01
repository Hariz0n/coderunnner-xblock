import { FC, PropsWithChildren, useState } from "react";
import { runtimeContext } from "../libs/runtime-context";
import { RuntimeContextType } from "../types/RuntimeContextType";

export const RuntimeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<RuntimeContextType>({});

  if (!CodeRunnerXBlock) {
    CodeRunnerXBlock = function(runtime, element) {
      setData({
        data: {
          dataUrl: runtime.handlerUrl(element, 'increment_count')
        }
      })
    }
  }

  return <runtimeContext.Provider value={data}>{children}</runtimeContext.Provider>;
};

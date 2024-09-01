import { createContext } from "react";
import { RuntimeContextType } from "../types/RuntimeContextType";

const DEFAULT_CONTENT: RuntimeContextType = {}

export const runtimeContext = createContext<RuntimeContextType>(DEFAULT_CONTENT)
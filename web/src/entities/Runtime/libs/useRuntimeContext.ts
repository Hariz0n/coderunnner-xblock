import { useContext } from "react"
import { runtimeContext } from "./runtime-context"

export const useRuntimeContext = () => {
  return useContext(runtimeContext)
}
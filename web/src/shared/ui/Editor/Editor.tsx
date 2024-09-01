import { FC } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import './Editor.css';

type EditorProps = {
  onChange: (value: string) => void;
  defaultValue?: string;
  height: string;
  
}

export const Editor: FC<EditorProps> = ({ onChange, defaultValue }) => {
  return <CodeMirror onChange={onChange} defaultValue={defaultValue} extensions={[python()]} />
}
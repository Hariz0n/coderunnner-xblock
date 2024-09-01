import { FC } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import './Editor.css';

type EditorProps = {
  onChange?: (value: string) => void;
  value?: string;
}

export const Editor: FC<EditorProps> = ({ value, onChange }) => {
  return <CodeMirror value={value} onChange={onChange} extensions={[python()]} />
}
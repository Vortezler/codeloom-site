import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <CodeMirror
        value={value}
        onChange={onChange}
        theme="dark"
        height="260px"
        extensions={[python()]}
        basicSetup={{ tabSize: 4 }}
      />
    </div>
  )
}

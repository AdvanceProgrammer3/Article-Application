"use client";

import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const RichTextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className="bg-white p-4 shadow-md">
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default RichTextEditor;

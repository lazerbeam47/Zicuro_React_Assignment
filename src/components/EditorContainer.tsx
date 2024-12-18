import React from 'react';
import { EditorState } from 'draft-js';
import TextEditor from './TextEditor';
import EditorToolbar from './EditorToolbar';

interface EditorContainerProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
  onSave: () => void;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  editorState,
  setEditorState,
  onSave,
}) => {
  return (
    <div className="space-y-6">
      <EditorToolbar onSave={onSave} />
      <TextEditor 
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </div>
  );
};

export default EditorContainer;
import React, { useCallback } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding,
} from 'draft-js';
import { useEditorStyles } from '../hooks/useEditorStyles';
import { useFormatHandler } from '../hooks/useFormatHandler';
import 'draft-js/dist/Draft.css';

interface TextEditorProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ editorState, setEditorState }) => {
  const { styleMap, blockStyleFn } = useEditorStyles();
  const { handleBeforeInput, handleReturn } = useFormatHandler(setEditorState);

  const handleKeyCommand = useCallback((command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }, [setEditorState]);

  const keyBindingFn = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      return 'split-block';
    }
    return getDefaultKeyBinding(e);
  }, []);

  return (
    <div className=" min-h-[700px] max-w-full border-blue-400 border-4 rounded-lg p-4 bg-white">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleBeforeInput={handleBeforeInput}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
        handleReturn={handleReturn}
        customStyleMap={styleMap}
        blockStyleFn={blockStyleFn}
        placeholder="Start typing... Use # for heading, * for bold, ** for red text, *** for underline"
      />
    </div>
  );
};

export default TextEditor;
// import React from 'react';
// import { Editor, EditorState } from 'draft-js';
// import { useEditorStyles } from '../hooks/useEditorStyles';

// interface TextEditorProps {
//   editorState: EditorState;
//   setEditorState: (state: EditorState) => void;
// }

// const TextEditor: React.FC<TextEditorProps> = ({ editorState, setEditorState }) => {
//   const { styleMap, blockStyleFn } = useEditorStyles();

//   return (
//     <div className="min-h-[300px] border border-gray-300 rounded-lg p-4 bg-white">
//       <Editor
//         editorState={editorState}
//         onChange={setEditorState}
//         customStyleMap={styleMap}
//         blockStyleFn={blockStyleFn}
//         placeholder="Start typing... Use # for heading, * for bold, ** for red text, *** for underline"
//       />
//     </div>
//   );
// };

// export default TextEditor;

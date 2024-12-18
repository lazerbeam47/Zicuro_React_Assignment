// import React, { useEffect, useCallback } from 'react';
// import {
//   Editor,
//   EditorState,
//   RichUtils,
//   ContentState,
//   convertToRaw,
//   convertFromRaw,
//   Modifier,
//   DraftHandleValue,
// } from 'draft-js';
// import 'draft-js/dist/Draft.css';

// interface TextEditorProps {
//   editorState: EditorState;
//   setEditorState: (state: EditorState) => void;
// }

// const TextEditor: React.FC<TextEditorProps> = ({ editorState, setEditorState }) => {
//   const handleBeforeInput = useCallback(
//     (chars: string, editorState: EditorState): DraftHandleValue => {
//       const selection = editorState.getSelection();
//       const content = editorState.getCurrentContent();
//       const block = content.getBlockForKey(selection.getStartKey());
//       const text = block.getText();

//       if (chars === ' ' && selection.getStartOffset() === 1) {
//         const firstChar = text.charAt(0);
//         let newEditorState = editorState;

//         if (firstChar === '#') {
//           // Remove the # character
//           const newContent = Modifier.replaceText(
//             content,
//             selection.merge({
//               anchorOffset: 0,
//               focusOffset: 1,
//             }),
//             ''
//           );
//           newEditorState = EditorState.push(editorState, newContent, 'change-block-type');
//           newEditorState = RichUtils.toggleBlockType(newEditorState, 'header-one');
//           setEditorState(newEditorState);
//           return 'handled';
//         } else if (firstChar === '*') {
//           // Remove the * character
//           const newContent = Modifier.replaceText(
//             content,
//             selection.merge({
//               anchorOffset: 0,
//               focusOffset: 1,
//             }),
//             ''
//           );
//           newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
//           newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'BOLD');
//           setEditorState(newEditorState);
//           return 'handled';
//         }
//       }

//       if (chars === ' ' && selection.getStartOffset() === 2) {
//         const prefix = text.substring(0, 2);
//         if (prefix === '**') {
//           // Remove the ** characters
//           const newContent = Modifier.replaceText(
//             content,
//             selection.merge({
//               anchorOffset: 0,
//               focusOffset: 2,
//             }),
//             ''
//           );
//           newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
//           newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'RED_TEXT');
//           setEditorState(newEditorState);
//           return 'handled';
//         }
//       }

//       if (chars === ' ' && selection.getStartOffset() === 3) {
//         const prefix = text.substring(0, 3);
//         if (prefix === '***') {
//           // Remove the *** characters
//           const newContent = Modifier.replaceText(
//             content,
//             selection.merge({
//               anchorOffset: 0,
//               focusOffset: 3,
//             }),
//             ''
//           );
//           newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
//           newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE');
//           setEditorState(newEditorState);
//           return 'handled';
//         }
//       }

//       return 'not-handled';
//     },
//     [setEditorState]
//   );

//   const styleMap = {
//     'RED_TEXT': {
//       color: 'red',
//     },
//   };

//   return (
//     <div className="min-h-[300px] border border-gray-300 rounded-lg p-4 bg-white">
//       <Editor
//         editorState={editorState}
//         onChange={setEditorState}
//         handleBeforeInput={handleBeforeInput}
//         customStyleMap={styleMap}
//         placeholder="Start typing... Use # for heading, * for bold, ** for red text, *** for underline"
//       />
//     </div>
//   );
// };

// export default TextEditor;
import React, { useEffect, useCallback } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  DraftHandleValue,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

interface TextEditorProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ editorState, setEditorState }) => {
  const handleBeforeInput = useCallback(
    (chars: string, editorState: EditorState): DraftHandleValue => {
      const selection = editorState.getSelection();
      const content = editorState.getCurrentContent();
      const block = content.getBlockForKey(selection.getStartKey());
      const text = block.getText();

      if (chars === ' ' && selection.getStartOffset() === 1) {
        const firstChar = text.charAt(0);
        let newEditorState = editorState;

        if (firstChar === '#') {
          // Remove the # character and apply header-one
          const newContent = Modifier.replaceText(
            content,
            selection.merge({
              anchorOffset: 0,
              focusOffset: 1,
            }),
            ''
          );
          newEditorState = EditorState.push(editorState, newContent, 'change-block-type');
          newEditorState = RichUtils.toggleBlockType(newEditorState, 'header-one');
          setEditorState(newEditorState);
          return 'handled';
        } else if (firstChar === '*') {
          // Remove the * character and apply bold
          const newContent = Modifier.replaceText(
            content,
            selection.merge({
              anchorOffset: 0,
              focusOffset: 1,
            }),
            ''
          );
          newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
          newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'BOLD');
          setEditorState(newEditorState);
          return 'handled';
        }
      }

      if (chars === ' ' && selection.getStartOffset() === 2) {
        const prefix = text.substring(0, 2);
        if (prefix === '**') {
          // Remove the ** characters and apply red text
          const newContent = Modifier.replaceText(
            content,
            selection.merge({
              anchorOffset: 0,
              focusOffset: 2,
            }),
            ''
          );
          const newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
          setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'RED_TEXT'));
          return 'handled';
        }
      }

      if (chars === ' ' && selection.getStartOffset() === 3) {
        const prefix = text.substring(0, 3);
        if (prefix === '***') {
          // Remove the *** characters and apply underline
          const newContent = Modifier.replaceText(
            content,
            selection.merge({
              anchorOffset: 0,
              focusOffset: 3,
            }),
            ''
          );
          const newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
          setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE'));
          return 'handled';
        }
      }

      return 'not-handled';
    },
    [setEditorState]
  );

  const handleReturn = useCallback(
    (e: React.KeyboardEvent, editorState: EditorState): DraftHandleValue => {
      const selection = editorState.getSelection();

      if (selection.isCollapsed()) {
        const contentState = Modifier.setBlockType(
          editorState.getCurrentContent(),
          selection,
          'unstyled' // Reset block type to default
        );

        // Clear all inline styles
        const currentInlineStyle = editorState.getCurrentInlineStyle();
        let newEditorState = EditorState.push(editorState, contentState, 'change-block-type');
        currentInlineStyle.forEach((style) => {
          newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
        });

        // Update the editor state and force selection
        setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
        return 'handled';
      }

      return 'not-handled';
    },
    [setEditorState]
  );

  const styleMap = {
    RED_TEXT: {
      color: 'red',
    },
  };

  return (
    <div className="min-h-[300px] border-gray-300 rounded-lg p-4 bg-white">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleBeforeInput={handleBeforeInput}
        handleReturn={handleReturn}
        customStyleMap={styleMap}
        placeholder="Start typing... Use # for heading, * for bold, ** for red text, *** for underline"
      />
    </div>
  );
};

export default TextEditor;

import { EditorState, RichUtils, Modifier, DraftHandleValue } from 'draft-js';
import { getBlockText, replaceText } from '../editorUtils';

export const handleHeadingFormat = (
  editorState: EditorState,
  setEditorState: (state: EditorState) => void
): DraftHandleValue => {
  const { text, selection, content } = getBlockText(editorState);
  
  if (text.charAt(0) !== '#') return 'not-handled';

  const newContent = replaceText(content, selection, 0, 1, '');
  let newEditorState = EditorState.push(editorState, newContent, 'change-block-type');
  newEditorState = RichUtils.toggleBlockType(newEditorState, 'header-one');
  
  setEditorState(newEditorState);
  return 'handled';
};
// import { EditorState, RichUtils, DraftHandleValue } from 'draft-js';
// import { getBlockText, replaceText } from '../editorUtils';

// export const handleHeadingFormat = (
//   editorState: EditorState,
//   setEditorState: (state: EditorState) => void
// ): DraftHandleValue => {
//   const { text, selection, content } = getBlockText(editorState);

//   // Check if the first character is '#'
//   if (!text.startsWith('#')) return 'not-handled';

//   // Remove the '#' character from the text
//   const newContent = replaceText(content, selection, 0, 1, '');
//   let newEditorState = EditorState.push(editorState, newContent, 'change-block-type');

//   // Set block type to 'header-one'
//   newEditorState = RichUtils.toggleBlockType(newEditorState, 'header-one');

//   // Update the editor state
//   setEditorState(newEditorState);
//   return 'handled';
// };


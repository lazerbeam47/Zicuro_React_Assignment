import { EditorState, RichUtils, DraftHandleValue } from 'draft-js';
import { getBlockText, replaceText } from '../editorUtils';

export const handleBoldFormat = (
  editorState: EditorState,
  setEditorState: (state: EditorState) => void
): DraftHandleValue => {
  const { text, selection, content } = getBlockText(editorState);
  
  if (text.charAt(0) !== '*') return 'not-handled';

  const newContent = replaceText(content, selection, 0, 1, '');
  let newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
  newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'BOLD');
  
  setEditorState(newEditorState);
  return 'handled';
};
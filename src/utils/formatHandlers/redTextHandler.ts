import { EditorState, RichUtils, DraftHandleValue } from 'draft-js';
import { getBlockText, replaceText } from '../editorUtils';

export const handleRedTextFormat = (
  editorState: EditorState,
  setEditorState: (state: EditorState) => void
): DraftHandleValue => {
  const { text, selection, content } = getBlockText(editorState);
  
  if (text.substring(0, 2) !== '**') return 'not-handled';

  const newContent = replaceText(content, selection, 0, 2, '');
  let newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
  newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'RED_TEXT');
  
  setEditorState(newEditorState);
  return 'handled';
};
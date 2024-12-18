import { EditorState, RichUtils, DraftHandleValue } from 'draft-js';
import { getBlockText, replaceText } from '../editorUtils';

export const handleUnderlineFormat = (
  editorState: EditorState,
  setEditorState: (state: EditorState) => void
): DraftHandleValue => {
  const { text, selection, content } = getBlockText(editorState);
  
  if (text.substring(0, 3) !== '***') return 'not-handled';

  const newContent = replaceText(content, selection, 0, 3, '');
  let newEditorState = EditorState.push(editorState, newContent, 'change-inline-style');
  newEditorState = RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE');
  
  setEditorState(newEditorState);
  return 'handled';
};
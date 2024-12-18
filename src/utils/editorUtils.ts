import { EditorState, SelectionState, ContentState, Modifier } from 'draft-js';

interface BlockInfo {
  text: string;
  selection: SelectionState;
  content: ContentState;
}

export const getBlockText = (editorState: EditorState): BlockInfo => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(selection.getStartKey());
  
  return {
    text: block.getText(),
    selection,
    content
  };
};

export const replaceText = (
  content: ContentState,
  selection: SelectionState,
  start: number,
  end: number,
  replaceWith: string
): ContentState => {
  return Modifier.replaceText(
    content,
    selection.merge({
      anchorOffset: start,
      focusOffset: end,
    }),
    replaceWith
  );
};
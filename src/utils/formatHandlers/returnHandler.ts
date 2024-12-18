import { EditorState, RichUtils, Modifier, DraftHandleValue } from 'draft-js';

export const handleLineReturn = (
  editorState: EditorState,
  setEditorState: (state: EditorState) => void
): DraftHandleValue => {
  const selection = editorState.getSelection();
  
  if (!selection.isCollapsed()) {
    return 'not-handled';
  }

  // Create new block with unstyled type
  const contentState = editorState.getCurrentContent();
  const newContentState = Modifier.splitBlock(contentState, selection);
  
  // Reset block type to unstyled
  const resetContent = Modifier.setBlockType(
    newContentState,
    newContentState.getSelectionAfter(),
    'unstyled'
  );

  // Push the new content state and clear all formatting
  let newEditorState = EditorState.push(
    editorState,
    resetContent,
    'split-block'
  );

  // Clear inline styles for the new block
  const currentStyle = editorState.getCurrentInlineStyle();
  currentStyle.forEach(style => {
    newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
  });

  // Ensure we're focusing on the new block
  newEditorState = EditorState.forceSelection(
    newEditorState,
    newEditorState.getSelection()
  );

  setEditorState(newEditorState);
  return 'handled';
};
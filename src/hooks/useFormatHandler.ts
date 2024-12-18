import { useCallback } from 'react';
import { EditorState, DraftHandleValue } from 'draft-js';
import { handleHeadingFormat } from '../utils/formatHandlers/headingHandler';
import { handleBoldFormat } from '../utils/formatHandlers/boldHandler';
import { handleRedTextFormat } from '../utils/formatHandlers/redTextHandler';
import { handleUnderlineFormat } from '../utils/formatHandlers/underlineHandler';
import { handleLineReturn } from '../utils/formatHandlers/returnHandler';
import { getBlockText } from '../utils/editorUtils';

export const useFormatHandler = (setEditorState: (state: EditorState) => void) => {
  const handleBeforeInput = useCallback(
    (chars: string, editorState: EditorState): DraftHandleValue => {
      if (chars !== ' ') return 'not-handled';

      const { text } = getBlockText(editorState);
      
      if (text.startsWith('***')) {
        return handleUnderlineFormat(editorState, setEditorState);
      }
      if (text.startsWith('**')) {
        return handleRedTextFormat(editorState, setEditorState);
      }
      if (text.startsWith('*')) {
        return handleBoldFormat(editorState, setEditorState);
      }
      if (text.startsWith('#')) {
        return handleHeadingFormat(editorState, setEditorState);
      }

      return 'not-handled';
    },
    [setEditorState]
  );

  const handleReturn = useCallback(
    (e: React.KeyboardEvent, editorState: EditorState): DraftHandleValue => {
      return handleLineReturn(editorState, setEditorState);
    },
    [setEditorState]
  );

  return { handleBeforeInput, handleReturn };
};
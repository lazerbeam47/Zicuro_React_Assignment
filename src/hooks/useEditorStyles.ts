import { useMemo } from 'react';

export const useEditorStyles = () => {
  const styleMap = useMemo(() => ({
    'RED_TEXT': {
      color: 'red',
    },
  }), []);

  const blockStyleFn = (contentBlock: any) => {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'text-3xl font-normal';
    }
    return '';
  };

  return { styleMap, blockStyleFn };
};
// import { useMemo } from 'react';
// import { ContentBlock } from 'draft-js';

// export const useEditorStyles = () => {
//   const styleMap = useMemo(() => ({
//     'RED_TEXT': {
//       color: 'red',
//     },
//     'BOLD': {
//       fontWeight: 'bold',
//     },
//     'UNDERLINE': {
//       textDecoration: 'underline',
//     },
//   }), []);

//   const blockStyleFn = (contentBlock: ContentBlock) => {
//     const type = contentBlock.getType();
//     if (type === 'header-one') {
//       return 'text-3xl font-normal my-2'; // Tailwind utility classes for header-one
//     }
//     return '';
//   };

//   return { styleMap, blockStyleFn };
// };

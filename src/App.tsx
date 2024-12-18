import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import EditorContainer from './components/EditorContainer';
import 'draft-js/dist/Draft.css';

function App() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('draftContent');
    if (savedContent) {
      const content = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(content);
    }
    return EditorState.createEmpty();
  });

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    localStorage.setItem('draftContent', JSON.stringify(raw));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Demo editor by Dabbu Mothsera
        </h1>
        
        <EditorContainer 
          editorState={editorState}
          setEditorState={setEditorState}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default App;
// import React, { useState } from 'react';
// import EditorContainer from './EditorContainer'; // Make sure the path is correct

// const DemoEditor = () => {
//   const [editorState, setEditorState] = useState(""); // Initialize editor state
//   const handleSave = () => {
//     // Implement your save logic here
//     console.log("Editor content saved:", editorState);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800 text-center">
//           Demo editor by Dabbu Mothsera
//         </h1>

//         <EditorContainer
//           editorState={editorState}
//           setEditorState={setEditorState}
//           onSave={handleSave}
//         />
//       </div>
//     </div>
//   );
// };

// export default DemoEditor;

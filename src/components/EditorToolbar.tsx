import React from 'react';

interface EditorToolbarProps {
  onSave: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onSave }) => {
  return (
    // <button
    //   onClick={onSave}
    //   className="flex justify-center right-4 gap-2 my-2 top-20 px-7 bg-white text-black border-4 border-black mr-20 text-2xl shadow-[3px_4px_0px_rgba(0,0,0,1)]"
    // >
    //   {/* <Save size={20} text-/> */}
    //   Save
    // </button>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl ml-40">Demo editor by Dabbu Mothsera</h1>
      <button
        onClick={onSave}
        className="px-4 bg-white text-black border-4 border-black mr-10 text-2xl shadow-[3px_4px_0px_rgba(0,0,0,1)]"
      >
        Save
      </button>
    </div>
  );
};


// import { Save } from 'lucid-react'; // Make sure to import your Save icon

// const EditorToolbar: React.FC<EditorToolbarProps> = ({ onSave }) => {
//   return (
//     <div className="min-h-screen flex flex-col justify-between">
//       <div className="flex-grow"></div> {/* This ensures space for other content */}
//       <button
//         onClick={onSave}
//         className="flex items-center justify-end gap-2 px-4 py-2 bg-white border-black text-black font-semibold border-2 fixed bottom-8 right-8"
//       >
//         <Save size={20} />
//         Save
//       </button>
//     </div>
//   );
// };
export default EditorToolbar;

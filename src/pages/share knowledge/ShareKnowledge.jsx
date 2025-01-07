// import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// const ShareKnowledge = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const onEditorStateChange = (newState) => {
//     setEditorState(newState);
//   };

//   return (
//     <div className="w-full bg-gray-100 p-6 rounded-lg shadow-lg">
//       {/* Header Section */}
//       <div className="header flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Enter Title"
//           className="w-full outline-none p-3 border border-blue-400 rounded-lg text-lg"
//         />
//       </div>

//       {/* Body Section with TextEditor */}
//       <div className="body mb-4">
//         <Editor
//           editorState={editorState}
//           onEditorStateChange={onEditorStateChange}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           toolbarClassName="demo-toolbar"
//         />
//       </div>
//     </div>
//   );
// };

// export default ShareKnowledge;

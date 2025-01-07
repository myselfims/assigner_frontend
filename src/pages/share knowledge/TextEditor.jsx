import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css"; // Import Draft.js styles

const TextEditor = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Handle text style changes (e.g., bold, italic)
  const handleStyleChange = (style) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
    onChange(newState);
  };

  // Handle editor content changes
  const handleEditorChange = (state) => {
    setEditorState(state);
    onChange(state);
  };

  return (
    <div className="editor-container border border-blue-400 p-4 rounded-lg">
      <div className="editor-controls flex gap-4 mb-2">
        <button
          onClick={() => handleStyleChange("BOLD")}
          className="border p-2 rounded"
        >
          B
        </button>
        <button
          onClick={() => handleStyleChange("ITALIC")}
          className="border p-2 rounded"
        >
          I
        </button>
        <button
          onClick={() => handleStyleChange("UNDERLINE")}
          className="border p-2 rounded"
        >
          U
        </button>
      </div>
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "link",
            ],
            inline: {
              options: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "monospace",
              ],
            },
            blockType: { inDropdown: true },
          }}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarClassName="demo-toolbar"
        />
      </div>
    </div>
  );
};

export default TextEditor;

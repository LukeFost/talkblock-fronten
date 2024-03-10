import React, { useState, useEffect, useRef } from "react";
import useAutosizeTextArea from "./useAutosizeTextArea";

function DynamicInput(props: {
  newFile: (arg0: string) => void;
  newMessage: (arg0: string) => void;
}): JSX.Element {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Presuming useAutosizeTextArea is a custom hook for auto-resizing the textarea.
  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target?.value);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      props.newMessage(value);
      setValue(""); // Clear the textarea after submitting
    }
  };

  return (
    <div className="flex bg-slate-200 w-max rounded-lg">
      <button
        onClick={() => props.newFile("plus")}
        className="flex-none w-8 rounded-l-lg"
        style={{ height: textAreaRef.current?.clientHeight }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-7 stroke-slate-500 fill-slate-300 hover:fill-slate-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <textarea
        value={value}
        onChange={handleChange}
        ref={textAreaRef}
        rows={1}
        onKeyDown={handleKeyDown}
        placeholder="Message here..."
        className="textarea textarea-ghost h-14 !outline-none focus:outline-none border-none focus:ring-0
 max-w-xs w-64 flex-initial bg-slate-200 overflow-y-scroll no-scrollbar"
      ></textarea>
    </div>
  );
}

export default DynamicInput;

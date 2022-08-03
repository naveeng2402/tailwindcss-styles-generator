import React, { MutableRefObject, useState } from "react";
import "../app.css";

type props = {
  inputRef: MutableRefObject<HTMLInputElement>;
};

const FileInput = ({ inputRef }: props) => {
  const [uploaded, setUploaded] = useState(false);
  return (
    <label className="flex w-full max-w-lg cursor-pointer flex-col items-center rounded-lg border-4 border-teal-400 bg-slate-100 px-4 py-6 uppercase tracking-wide text-teal-400 shadow-lg transition-colors hover:duration-200 duration-300 ease-in-out hover:bg-teal-400 hover:text-white">
      {!uploaded ? (
        <>
          <svg
            className="h-10 w-10"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal font-semibold">
            Select a file
          </span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="mt-2 text-base leading-normal font-semibold">
            File Selected
          </span>
        </>
      )}
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="application/JSON"
        onChange={(e) => {
          setUploaded(Boolean(e.target.files.length));
        }}
      />
    </label>
  );
};

export default FileInput;

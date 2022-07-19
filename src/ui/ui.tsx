import React, { useState } from "react";
import ReactDOM from "react-dom";
import FileInput from "./components/fileInput";
import { PulseLoader } from "react-spinners";
import "./app.css";

declare function require(path: string): any;

function App() {
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  onmessage = (e: MessageEvent<any>) => {
    console.log(e.data.pluginMessage);
    setMessage(e.data.pluginMessage);
  };

  return (
    <main className="flex flex-col w-full gap-5">
      <header className="bg-teal-400 flex py-3 px-5 items-center">
        <img src={require("./logo.svg")} alt="logo" />
        <h2 className="w-full text-center text-4xl text-slate-100 font-medium">
          Tailwind Styles
        </h2>
      </header>
      <section className="flex justify-center items-center gap-3 px-5">
        <FileInput inputRef={fileInput} />
      </section>
      <footer className="flex justify-center gap-9">
        <button
          onClick={() => {
            setGenerating((prevState) => !prevState);
            const fileReader: FileReader = new FileReader();
            fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
              parent.postMessage(
                {
                  pluginMessage: {
                    type: "send-data",
                    data: JSON.parse(fileReader.result as string),
                  },
                },
                "*"
              );
            };
            fileReader.readAsText(fileInput.current.files[0]);
          }}
          className={`${
            generating ? "bg-teal-400" : "bg-white"
          } rounded-lg border-2 border-teal-400 px-10 py-3 text-xl font-semibold text-teal-400 shadow-lg shadow-teal-200/50 transition-all hover:bg-teal-400 hover:text-white hover:shadow-2xl hover:shadow-teal-300`}
        >
          {generating ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <PulseLoader color="#fff" speedMultiplier={0.7} />
              <span className="text-sm font-light text-white">
                {/* Please wait It takes some time.... */}
                {message}
              </span>
            </div>
          ) : (
            "Generate Styles"
          )}
        </button>
      </footer>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));

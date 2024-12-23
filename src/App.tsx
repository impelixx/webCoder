import { useState, useEffect } from "react";
import {
  Clipboard,
  ClipboardCheck,
  Copyright,
  Github,
} from "lucide-react";
import CodeEditor from "./components/CodeEditor";
import TopBar from "./components/TopBar";
import ConsoleOutput from './components/ConsoleOutput';

const App = () => {
  const [code, setCode] = useState("");
  const [fontSize, setFontSize] = useState(26);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "+") {
        setFontSize((prev) => prev + 1);
      } else if (event.ctrlKey && event.key === "-") {
        setFontSize((prev) => Math.max(prev - 1, 12));
      }
      if (event.ctrlKey && event.key === "Enter") {
        runCode();
      }
      if (event.ctrlKey && event.key === "c") {
        navigator.clipboard.writeText(code);
      }
      if (event.ctrlKey && event.key === "v") {
        navigator.clipboard.readText().then((text) => setCode(text));
      }
      if (event.ctrlKey && event.key === "o") {
        setIsConsoleVisible((prev) => !prev);
      }
      if (event.ctrlKey && event.key === "'") {
        setIsConsoleVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const runCode = () => {
    console.log("runCode");
    try {
      const result = "hui"
      setIsConsoleVisible(true);
      setConsoleOutput(result.toString());
    } catch (error) {
      setConsoleOutput("penis");
    }
  };

  return (
    <main style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
      <TopBar runCode={runCode} />
      <CodeEditor 
        initialValue={code} 
        onChange={setCode} 
        fontSize={fontSize} 
      />
      <ConsoleOutput 
        output={consoleOutput} 
        isVisible={isConsoleVisible} 
        setIsVisible={setIsConsoleVisible} 
      />
    </main>
  );
}

export default App;
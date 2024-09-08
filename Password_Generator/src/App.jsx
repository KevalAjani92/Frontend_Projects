import { useCallback, useEffect, useRef, useState } from "react";
import { FiClipboard, FiCheck } from "react-icons/fi";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Weak");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow && charAllow) {
      setStatus("Strong");
    } else if (numAllow || charAllow) {
      setStatus("Good");
    } else {
      setStatus("Weak");
    }

    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*-_+=~[]{}";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  // const copyPasswordToClipboard = useCallback(() => {
  //   passwordRef.current?.select();
  //   passwordRef.current?.setSelectionRange(0, 50);
  //   window.navigator.clipboard.writeText(password);
  // }, [password]);

  const [isCopied, setIsCopied] = useState(false);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      
      navigator.clipboard.writeText(password)
        .then(() => {
          setIsCopied(true);
          passwordRef.current?.select();
        })
        .catch((err) => console.error("Failed to copy!", err));
    }
    passwordRef.current?.setSelectionRange(0, 50);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
    setIsCopied(false);
  }, [length, numAllow, charAllow, passwordGenerator]);

  return (
    <>
      <div className="bg-[#FFFFFF] w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-[#333333]">
        <h1 className="text-center text-4xl text-[#333333] my-5">
          Password Generator
        </h1>
        <div className="flex shadow-md rounded-lg overflow-hidden my-9">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-[#E2E8F0] text-[#1F2937]"
            placeholder="password"
            ref={passwordRef}
            readOnly
          />
          {/* <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-[#3B82F6] text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button> */}
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 flex items-center gap-x-1"
          >
            {isCopied ? <FiCheck /> : <FiClipboard />}
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-6 my-7">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer bg-[#10B981]"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numAllow}
              id="numberInput"
              onChange={() => setNumAllow((prev) => !prev)}
              className="accent-[#3B82F6]"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllow}
              id="characterInput"
              onChange={() => setCharAllow((prev) => !prev)}
              className="accent-[#3B82F6]"
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        <div className="flex justify-center text-center mt-3">
          <h2 className="text-3xl">
            Status :{" "}
            <span
              className={
                status === "Weak"
                  ? "text-[#EF4444]"
                  : status === "Good"
                  ? "text-[#F59E0B]"
                  : "text-[#10B981]"
              }
            >
              {status}
            </span>
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;

import "./styles.scss";
import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const [outputText, setOutputText] = useState(null);

  function handleEncrypt(e) {
    e.preventDefault();
    setOutputText(caesarCipher(inputText, inputKey, "encrypt"));
  }

  function handleDecrypt(e) {
    e.preventDefault();
    setOutputText(caesarCipher(inputText, inputKey, "decrypt"));
  }

  function caesarCipher(str, shift, action) {
    let result = "";

    if (action === "encrypt") {
      shift = shift % 26;
    } else if (action === "decrypt") {
      shift = (26 - shift) % 26; //
    } else {
      throw new Error("Invalid action: " + action);
    }

    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      let charCode = str.charCodeAt(i);

      if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122)
      ) {
        let offset = charCode >= 97 ? 97 : 65;

        charCode = ((charCode - offset + shift) % 26) + offset;
        char = String.fromCharCode(charCode);
      }

      result += char;
    }

    return result;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Caesar's Cipher</h1>
        <div className="monkey"></div>
        <form>
          <div className="form-input">
            <input
              type="text"
              placeholder="Text"
              onChange={(e) => setInputText(e.target.value)}
            />
            <input
              type="number"
              placeholder="Key"
              onChange={(e) => setInputKey(e.target.value)}
            />
          </div>
          <div className="form-btn">
            <button onClick={handleEncrypt}>Encrypt</button>
            <button onClick={handleDecrypt}>Decrypt</button>
          </div>
        </form>
        <p>{outputText}</p>
      </div>
    </div>
  );
}

export default App;

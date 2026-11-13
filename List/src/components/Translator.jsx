
import React, { useState } from "react";
import "./Translator.css";

function Translator() {
  const [englishText, setEnglishText] = useState("");
  const [urduText, setUrduText] = useState("");

  const translations = {
    hello: "ہیلو",
    "hello world": "ہیلو دنیا",
    "how are you": "آپ کیسے ہیں؟",
    "good morning": "صبح بخیر",
    "good night": "شب بخیر",
    thank: "شکریہ",
    thanks: "شکریہ",
    welcome: "خوش آمدید",
    yes: "ہاں",
    no: "نہیں",
    please: "براہ کرم",
    friend: "دوست",
    family: "خاندان",
    love: "محبت",
    home: "گھر",
    water: "پانی",
    food: "کھانا",
    beautiful: "خوبصورت",
    happy: "خوش",
    sad: "اداس",
    "i love you": "میں آپ سے محبت کرتا ہوں",
  };

  function translateText() {
    const text = englishText.toLowerCase().trim();

    if (!text) {
      setUrduText("");
      return;
    }

    if (translations[text]) {
      setUrduText(translations[text]);
      return;
    }

    const words = text.split(" ");

    const translatedWords = words.map((word) => {
      return translations[word] || word;
    });

    setUrduText(translatedWords.join(" "));
  }

  function clearText() {
    setEnglishText("");
    setUrduText("");
  }

  function copyTranslation() {
    if (urduText) {
      navigator.clipboard.writeText(urduText);
    }
  }

  return (
    <section className="translator-section" id="translator">
      <div className="translator-heading">
        <span>TRANSLATOR</span>

        <h2>
          Say it in English.
          <br />
          <strong>Understand it in Urdu.</strong>
        </h2>

        <p>
          Type your English text below and transform it
          into Urdu instantly.
        </p>
      </div>

      <div className="translator-box">
        <div className="language-panel">
          <div className="language-header">
            <div>
              <span>FROM</span>
              <h3>English</h3>
            </div>

            <div className="language-symbol">EN</div>
          </div>

          <textarea
            value={englishText}
            onChange={(e) => setEnglishText(e.target.value)}
            placeholder="Type something in English..."
          ></textarea>

          <div className="panel-footer">
            <span>
              {englishText.length} characters
            </span>

            <button onClick={clearText}>
              Clear
            </button>
          </div>
        </div>

        <div className="translate-middle">
          <button onClick={translateText}>
            <span>→</span>
          </button>
        </div>

        <div className="language-panel urdu-panel">
          <div className="language-header">
            <div>
              <span>TO</span>
              <h3>اردو</h3>
            </div>

            <div className="language-symbol urdu-symbol">
              اردو
            </div>
          </div>

          <div className="urdu-output">
            {urduText || "ترجمہ یہاں ظاہر ہوگا..."}
          </div>

          <div className="panel-footer">
            <span>
              {urduText.length} characters
            </span>

            <button onClick={copyTranslation}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Translator;